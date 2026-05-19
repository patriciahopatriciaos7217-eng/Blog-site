import { setSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { Session, User } from "@/lib/types";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const register = async (user: User) => {
    try {
        console.log("success")
        const client = await clientPromise;
        const dbName = process.env.MONGODB_DB_NAME as string;
        const db = client.db(dbName);
        const users = db.collection('users');
        const existingUser = await users.findOne({
            $or: [{ email: user.email.trim() }],
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email or username already exists' },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await users.insertOne({
            username: user.username,
            email: user.email.trim(),
            password: hashedPassword.trim(),
            avatar: "/uploads/default-avatar.png",
        });
        console.log("success", result)
        return NextResponse.json({ success: "registered" }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            {
                error: "Internal server error.",
            },
            {
                status: 500,
            }
        );
    }
}

export const login = async (user: any) => {
    try {
        const client = await clientPromise;
        const dbName = process.env.MONGODB_DB_NAME as string;
        const db = client.db(dbName);
        const users = db.collection("users");

        // Find user by email
        const result = await users.findOne({ email: user.email });
        if (!result) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(user.password, result.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Set session after successful login
        await setSession({
            userId: result._id.toString(),
            email: result.email,
            username: result.username,
            avatar: result.avatar,
        });

        return NextResponse.json({ success: "Logged in" }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
};

export const changePassword = async (userId: string, newPassword: string) => {
    try {
        const client = await clientPromise;
        const dbName = process.env.MONGODB_DB_NAME as string;
        const db = client.db(dbName);
        const users = db.collection("users");

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await users.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: hashedPassword } }
        );

        return NextResponse.json({ success: "Password changed successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error changing password:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
};
