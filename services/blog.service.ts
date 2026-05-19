import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const createBlog = async (blogInfo: any) => {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME as string;
  const db = client.db(dbName);
  const blogs = db.collection("blogs");

  try {
    const result = await blogs.insertOne({ ...blogInfo, created_at: new Date() });
    console.log("Blog created with ID:", result);
    return NextResponse.json(
      { message: "Blog created successfully", blog: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { message: "Error creating blog" },
      { status: 500 }
    );
  }
}

export const getBlogs = async () => {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME as string;
  const db = client.db(dbName);
  const blogs = db.collection("blogs");

  try {
    const result = await blogs.find({}).toArray();
    console.log("Blogs retrieved:", result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    return NextResponse.json(
      { message: "Error retrieving blogs" },
      { status: 500 }
    );
  }
}