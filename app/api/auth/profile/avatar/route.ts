import { getSession, setSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const PUT = async (request: NextRequest) => {
  try {
    const session = await getSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("avatar") as File | null;

    let imageUrl: string | null = null;

    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type. Please upload a PNG, JPEG, JPG, or WebP image." }, { status: 400 });
      }

      // create uploads folder if missing
      await fs.mkdir(
        path.join(process.cwd(), "public/uploads"),
        { recursive: true }
      );

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;

      const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        fileName
      );

      await fs.writeFile(uploadPath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    const client = await clientPromise;
    const db = client.db(
      process.env.MONGODB_DB_NAME
    );
    const users = db.collection("users");
    const result = await users.updateOne(
      { _id: new ObjectId(session.userId) },
      { $set: { avatar: imageUrl } }
    );
    await setSession({
      ...session,
      avatar: imageUrl || session.avatar
    });
    // Here you would typically process the uploaded file (e.g., save it to storage)
    // For demonstration, we'll just return a success response with the file name
    return NextResponse.json({ message: "Avatar updated successfully.", data: result }, { status: 200 });
  } catch (error) {
    console.error("Error updating avatar:", error);
    return NextResponse.json({ error: "Failed to update avatar." }, { status: 500 });
  }
}