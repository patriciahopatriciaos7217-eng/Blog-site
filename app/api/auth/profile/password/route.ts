import { getSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }

        const data = await request.json();
        const { currentPassword, newPassword } = data;
        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Current password and new password are required." }, { status: 400 });
        }
        if (newPassword.length < 6) {
            return NextResponse.json({ error: "New password must be at least 6 characters long." }, { status: 400 });
        }
        if (currentPassword === newPassword) {
            return NextResponse.json({ error: "New password must be different from current password." }, { status: 400 });
        }
        const client = await clientPromise;
        const db = client.db(
            process.env.MONGODB_DB_NAME
        );
        const users = db.collection("users");
        await users.updateOne(
            { _id: new ObjectId(session.userId) },
            { $set: { password: newPassword } }
        );

        // Here you would typically update the user's password in your database
        // with the new password if the current password is correct

        return NextResponse.json({ message: "Password updated successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: "Failed to update password." }, { status: 500 });
    }
};