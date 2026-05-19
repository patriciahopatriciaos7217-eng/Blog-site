import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import fs from "fs/promises";

import clientPromise from "@/lib/mongodb";
import path from "path";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    const {id} = await params;
    console.log("Deleting blog with id:", id);
    const client = await clientPromise;

    const db = client.db(
      process.env.MONGODB_DB_NAME
    );

    const blogs = db.collection("blogs");

    await blogs.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Blog deleted",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    const { id } = await params;
    console.log("Updating blog with id:", id);
    const data = await request.formData();

    const client = await clientPromise;

    const db = client.db(
      process.env.MONGODB_DB_NAME
    );

    const blogs = db.collection("blogs");

    const blog = await blogs.findOne({
      _id: new ObjectId(id),
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    const file = data.get("image") as File | null;

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
      title: data.get("title") as string,
      content: data.get("content") as string,
      category: data.get("category") as string,
      author: data.get("author") as string,
      imageUrl,
      updatedAt: new Date(),
    };

    await blogs.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...Object.fromEntries(Object.entries(blogInfo).filter(([k, v]) => !!v)),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Blog updated",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  try {

    const data = await params;

    console.log("Fetching blog detail for id:", data.id);
    const { id } = data;

    const client = await clientPromise;

    const db = client.db(
      process.env.MONGODB_DB_NAME
    );

    const blogs = db.collection("blogs");

    const blog = await blogs.findOne({
      _id: new ObjectId(id),
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, {
      status: 200,
    });

  } catch (err: unknown) {

    console.error(
      "Get blog detail error:",
      err
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch blog detail",
      },
      { status: 500 }
    );
  }
}