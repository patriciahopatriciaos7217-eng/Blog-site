import { getSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  try {
    const session = await getSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const data = await request.json();
    const { name } = data;
    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const client = await clientPromise;
    const db = client.db(
      process.env.MONGODB_DB_NAME
    );
    const users = db.collection("users");

    const result = await users.updateOne(
      { _id: new ObjectId(session.userId) },
      { $set: { name } }
    );

    if (result.matchedCount === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new NextResponse(JSON.stringify({ message: "Name updated successfully." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating name:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to update name." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}