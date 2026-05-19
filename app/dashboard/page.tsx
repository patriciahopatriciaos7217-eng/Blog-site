"use client";

import { useState } from "react";
import {
    Search,
    Moon,
    ArrowRight,
    X,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState("");
    const blogs = [
        {
            title: "Exploring the Hidden Gems of the Himalayas",
            description:
                "A journey through the unexplored beauty of the Himalayas.",
            category: "Travel",
            time: "10 min read",
            author: "John Doe",
            date: "May 20, 2024",
            image:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        },
        {
            title: "10 Productivity Tips for Working from Home",
            description:
                "Simple tips to boost your productivity and stay focused.",
            category: "Productivity",
            time: "6 min read",
            author: "Jane Smith",
            date: "May 18, 2024",
            image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        },
        {
            title: "Getting Started with Next.js 14",
            description:
                "A complete guide to build modern web apps with Next.js.",
            category: "Technology",
            time: "8 min read",
            author: "Alex Johnson",
            date: "May 15, 2024",
            image:
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        },
    ];

    return (
        <main className="min-h-screen bg-[#fafafa]">

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

                <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

                    <div className="grid lg:grid-cols-2 gap-10 items-center px-6 sm:px-10 py-14">

                        {/* Left */}
                        <div>

                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                                ✨ Welcome to Blogy
                            </span>

                            <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight text-[#1f1f1f]">
                                Discover stories
                                <br />
                                that inspire
                            </h1>

                            <p className="mt-5 text-gray-500 text-lg leading-8 max-w-lg">
                                Explore thousands of articles on technology,
                                lifestyle, business and more.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">

                                <button className="h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-medium shadow-md hover:opacity-95 transition">
                                    Start Reading
                                </button>

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="h-12 px-6 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 transition"
                                >
                                    + Add Blog
                                </button>

                            </div>

                        </div>

                        {/* Right Illustration */}
                        <div className="hidden lg:flex justify-center">
                            <img
                                src="/back1.jpg"
                                alt="Hero"
                                className="w-full max-w-md object-contain"
                            />
                        </div>

                    </div>

                </div>

            </section>

            {/* Articles */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">

                    <h2 className="text-2xl font-bold text-[#1f1f1f]">
                        Latest Articles
                    </h2>

                    <Link href={"/blogList"}>
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition">
                            View all
                            <ArrowRight size={16} />
                        </button>
                    </Link>

                </div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
                        >

                            {/* Image */}
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-52 object-cover"
                            />

                            {/* Content */}
                            <div className="p-5">

                                <div className="flex items-center justify-between mb-4">

                                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                                        {blog.category}
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        {blog.time}
                                    </span>

                                </div>

                                <h3 className="text-xl font-bold text-[#1f1f1f] leading-7">
                                    {blog.title}
                                </h3>

                                <p className="mt-3 text-gray-500 text-sm leading-6">
                                    {blog.description}
                                </p>

                                {/* Footer */}
                                <div className="mt-6 flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />

                                    <div>
                                        <p className="text-sm font-semibold text-[#1f1f1f]">
                                            {blog.author}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {blog.date}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

                    <div
                        className="
        relative
        w-full
        max-w-2xl
        overflow-hidden
        rounded-[32px]
        bg-white
        border
        border-gray-100
        shadow-[0_20px_80px_rgba(0,0,0,0.15)]
      "
                    >

                        {/* Background Decorations */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-purple-100/50" />

                        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-100/40" />

                        {/* Content */}
                        <div className="relative z-10 p-6 sm:p-10">

                            {/* Header */}
                            <div className="flex items-start justify-between mb-8">

                                <div>

                                    <span
                                        className="
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                bg-purple-100
                text-purple-700
                text-xs
                font-semibold
              "
                                    >
                                        ✨ New Blog
                                    </span>

                                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#1f1f1f]">
                                        Create Blog
                                    </h2>

                                    <p className="mt-2 text-gray-500">
                                        Share your ideas, stories and experiences.
                                    </p>

                                </div>

                                {/* Close */}
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="
              w-11
              h-11
              rounded-2xl
              border
              border-gray-200
              flex
              items-center
              justify-center
              hover:bg-gray-50
              transition
            "
                                >
                                    <X size={18} />
                                </button>

                            </div>

                            {/* Form */}
                            <form className="space-y-5">

                                {/* Title */}
                                <div>

                                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                                        Blog Title
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your blog title"
                                        className="
                w-full
                h-14
                rounded-2xl
                border
                border-gray-200
                bg-[#fafafa]
                px-5
                text-sm
                outline-none
                transition
                focus:border-purple-500
                focus:bg-white
                focus:ring-4
                focus:ring-purple-100
              "
                                    />

                                </div>

                                {/* Category + Author */}
                                <div className="grid sm:grid-cols-2 gap-5">

                                    {/* Category */}
                                    <div>

                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Technology"
                                            className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  bg-[#fafafa]
                  px-5
                  text-sm
                  outline-none
                  transition
                  focus:border-purple-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-purple-100
                "
                                        />

                                    </div>

                                    {/* Author */}
                                    <div>

                                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                                            Author Name
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  bg-[#fafafa]
                  px-5
                  text-sm
                  outline-none
                  transition
                  focus:border-purple-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-purple-100
                "
                                        />

                                    </div>

                                </div>

                                {/* Image URL */}
                                {/* Image Upload */}
                                <div>

                                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                                        Upload Image
                                    </label>

                                    <label
                                        className="
      flex
      flex-col
      items-center
      justify-center
      w-full
      h-52
      rounded-2xl
      border-2
      border-dashed
      border-gray-300
      bg-[#fafafa]
      cursor-pointer
      hover:border-purple-400
      hover:bg-purple-50/30
      transition
      overflow-hidden
      relative
    "
                                    >

                                        {/* Hidden Input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (file) {
                                                    const imageUrl = URL.createObjectURL(file);
                                                    setImage(imageUrl);
                                                }
                                            }}
                                        />

                                        {/* Preview */}
                                        {image ? (
                                            <img
                                                src={image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center px-4">

                                                <div
                                                    className="
            mx-auto
            mb-4
            w-14
            h-14
            rounded-2xl
            bg-purple-100
            flex
            items-center
            justify-center
            text-2xl
          "
                                                >
                                                    🖼️
                                                </div>

                                                <p className="text-sm font-semibold text-gray-700">
                                                    Click to upload image
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    PNG, JPG, JPEG
                                                </p>

                                            </div>
                                        )}

                                    </label>

                                </div>

                                {/* Description */}
                                <div>

                                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                                        Description
                                    </label>

                                    <textarea
                                        rows={6}
                                        placeholder="Write your story..."
                                        className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-[#fafafa]
                px-5
                py-4
                text-sm
                outline-none
                resize-none
                transition
                focus:border-purple-500
                focus:bg-white
                focus:ring-4
                focus:ring-purple-100
              "
                                    />

                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">

                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="
                flex-1
                h-14
                rounded-2xl
                border
                border-gray-200
                bg-white
                text-gray-700
                font-medium
                hover:bg-gray-50
                transition
              "
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="
                flex-1
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-purple-600
                to-indigo-500
                text-white
                font-semibold
                shadow-lg
                hover:opacity-95
                transition
              "
                                    >
                                        Publish Blog
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}