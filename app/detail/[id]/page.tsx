"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Copy,
  Edit,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import useBlog from "@/hooks/blog";
import { Blog } from "@/lib/types";

export default function BlogDetailPage() {
    const {getBlogDetail} = useBlog();
    const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            const id = window.location.pathname.split('/').pop();
            if (id) {
                const blog = await getBlogDetail(id);
                setCurrentBlog(blog);
                console.log("Fetched blog detail:", blog);
            }
        };

        fetchBlogDetail();
    }, []);

    return (
        <main className="min-h-screen bg-[#fafafa] py-6 sm:py-10">

      <section className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Back */}
        <Link
          href="/blogList"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-gray-500
            hover:text-black
            transition
          "
        >
          <ArrowLeft size={16} />
          Back to all blogs
        </Link>

        {/* Category */}
        <Badge
          className="
            mt-6
            rounded-full
            bg-purple-100
            text-purple-700
            hover:bg-purple-100
          "
        >
          {currentBlog ? currentBlog.category : "Loading..."}
        </Badge>

        {/* Title */}
        <h1
          className="
            mt-5
            text-3xl
            leading-tight
            font-bold
            tracking-tight
            text-[#1f1f1f]

            sm:text-4xl
            lg:text-5xl
          "
        >
          {currentBlog ? currentBlog.title : "Loading..."}
        </h1>

        {/* Author + Actions */}
        <div
          className="
            mt-8
            flex
            flex-col
            gap-6

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* Author */}
          <div className="flex items-center gap-4">

            <Avatar className="w-11 h-11 sm:w-12 sm:h-12">
              <AvatarImage src="https://i.pravatar.cc/150?img=12" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>

            <div>

              <h4 className="font-semibold text-sm sm:text-base">
                {currentBlog ? currentBlog.author : "Loading..."}
              </h4>

              <p className="text-xs sm:text-sm text-gray-500">
                {currentBlog ? new Date(currentBlog.created_at).toLocaleDateString() : "Loading..."}
              </p>

            </div>

          </div>

          {/* Actions */}
          <div
            className="
              flex
              items-center
              flex-wrap
              gap-3
            "
          >

            <Button
              variant="outline"
              className="
                rounded-xl
                h-10
                sm:h-11
                px-4
                sm:px-5
              "
            >
              <Edit size={16} className="mr-2" />
              Edit
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-xl h-10 w-10 sm:h-11 sm:w-11"
            >
              <Copy size={16} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-xl h-10 w-10 sm:h-11 sm:w-11"
            >
              <Bookmark size={16} />
            </Button>

          </div>

        </div>

        {/* Cover Image */}
        <div
          className="
            relative
            mt-8
            sm:mt-10
            overflow-hidden
            rounded-2xl
            sm:rounded-3xl
            border
            border-gray-200
            shadow-sm
          "
        >

          <Image
            src={currentBlog?.imageUrl as string || "/back1.png"}
            alt="Blog Image"
            width={1400}
            height={800}
            priority
            className="
              w-full
              h-[220px]
              sm:h-[320px]
              lg:h-[420px]
              object-cover
            "
          />

        </div>

        {/* Content */}
        <article
          className="
            mt-10
            sm:mt-14

            prose
            prose-sm
            sm:prose-base
            lg:prose-lg

            prose-gray
            max-w-none

            prose-headings:font-bold
            prose-headings:text-[#1f1f1f]

            prose-p:text-gray-600
            prose-p:leading-7
            sm:prose-p:leading-8

            prose-pre:bg-[#f5f5f5]
            prose-pre:border
            prose-pre:border-gray-200
            prose-pre:rounded-2xl
            prose-pre:p-5
            prose-pre:text-sm
          "
        >

          <p>
            {currentBlog ? currentBlog.content : "Loading..."}
          </p>

        </article>

      </section>

    </main>
  );
}