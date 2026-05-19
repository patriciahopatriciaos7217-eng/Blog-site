import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

import { createBlog, getBlogs } from "@/services/blog.service";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid image type" },
        { status: 400 }
      );
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

    const imageUrl = `/uploads/${fileName}`;

    const blogInfo = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      imageUrl,
      createdAt: new Date(),
    };

    return await createBlog(blogInfo);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return await getBlogs();

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}