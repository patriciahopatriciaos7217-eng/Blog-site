"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog/blogCard";
import useBlog from "@/hooks/blog";
import { Blog } from "@/lib/types";

// const blogs = [
//   {
//     title: "Exploring the Hidden Gems of the Himalayas",
//     content:
//       "A journey through the unexplored beauty of the Himalayas.",
//     category: "Travel",
//     author: "John Doe",
//     created_at: "May 20, 2024",
//     image:
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//   },
//   {
//     title: "10 Productivity Tips for Working from Home",
//     content:
//       "Simple tips to boost your productivity and stay focused.",
//     category: "Productivity",
//     author: "Jane Smith",
//     created_at: "May 18, 2024",
//     image:
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
//   },
//   {
//     title: "Getting Started with Next.js 14",
//     content:
//       "A complete guide to build modern web apps with Next.js.",
//     category: "Technology",
//     author: "Alex Johnson",
//     created_at: "May 15, 2024",
//     image:
//       "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
//   },
//   {
//     title: "Minimalism in Daily Life",
//     content:
//       "Why less can actually give you more freedom and clarity.",
//     category: "Lifestyle",
//     author: "Emma Watson",
//     created_at: "May 10, 2024",
//     image:
//       "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
//   },
//   {
//     title: "Mastering TailwindCSS",
//     content:
//       "Learn how to build modern UIs faster with TailwindCSS.",
//     category: "Technology",
//     author: "David Lee",
//     created_at: "May 08, 2024",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
//   },
//   {
//     title: "Healthy Morning Habits",
//     content:
//       "Small morning habits that can transform your productivity.",
//     category: "Health",
//     author: "Sophia Kim",
//     created_at: "May 05, 2024",
//     image:
//       "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
//   },
// ];

const BLOGS_PER_PAGE = 3;

export default function AllBlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const { createNewBlog, getBlogs } = useBlog();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs() as [];
        setBlogs(data ? data : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the new blog data to your backend API

    const newBlog = new FormData();
    newBlog.append("title", title);
    newBlog.append("content", content);
    newBlog.append("category", category);
    newBlog.append("author", author);
    if (image) {
      newBlog.append("image", image);
    }

    createNewBlog(newBlog);

    setIsModalOpen(false)
  }
  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const currentBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    const end = start + BLOGS_PER_PAGE;
    console.log(blogs, "All blogs");
    return blogs?.slice(start, end);
  }, [currentPage, blogs]);

  return (
    <main className="min-h-screen bg-[#fafafa]">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

          <div>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              ✨ Blog Collection
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-[#1f1f1f] leading-tight">
              Explore All Articles
            </h1>

            <p className="mt-4 text-gray-500 text-lg max-w-2xl leading-8">
              Discover stories, tutorials, ideas and inspiration
              from creators around the world.
            </p>

          </div>

        </div>

      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {currentBlogs.map((blog, index) => (
            <BlogCard {...blog as Blog} key={index} />
          ))}

        </div>
        <Button
          variant="outline"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Plus icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Button>
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
                <form className="space-y-5" onSubmit={handleSubmit}>

                  {/* Title */}
                  <div>

                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Blog Title
                    </label>

                    <input
                      type="text"
                      onChange={e => setTitle(e.target.value)}
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

                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="
        appearance-none                
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
                      >
                        <option value="">Select category</option>
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Health">Health</option>
                      </select>

                    </div>

                    {/* Author */}
                    <div>

                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Author Name
                      </label>

                      <input
                        type="text"
                        onChange={e => setAuthor(e.target.value)}
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
                            setImage(file);
                            setImageUrl(imageUrl);
                          }
                        }}
                      />

                      {/* Preview */}
                      {imageUrl ? (
                        <img
                          src={imageUrl}
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
                      onChange={e => setContent(e.target.value)}
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
        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-3">

          {/* Prev */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="
              w-11
              h-11
              rounded-xl
              border
              border-gray-200
              bg-white
              flex
              items-center
              justify-center
              hover:bg-gray-50
              transition
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <ChevronLeft size={18} />
          </button>

          {/* Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-11
                  h-11
                  rounded-xl
                  text-sm
                  font-semibold
                  transition
                  ${currentPage === page
                    ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg"
                    : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="
              w-11
              h-11
              rounded-xl
              border
              border-gray-200
              bg-white
              flex
              items-center
              justify-center
              hover:bg-gray-50
              transition
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </section>

    </main>
  );
}