"use client";

import useBlog from "@/hooks/blog";
import { Blog } from "@/lib/types";
import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BlogCard = ({
  _id,
  title,
  content,
  author,
  imageUrl,
  category,
  created_at
}: Blog) => {
  const { goDetail } = useBlog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl1, setImageUrl1] = useState(imageUrl);
  const [image1, setImage1] = useState<File | null>(null);
  const [title1, setTitle1] = useState(title);
  const [content1, setContent1] = useState(content);
  const [category1, setCategory1] = useState(category);
  const [author1, setAuthor1] = useState(author);

  const { updateBlog, deleteBlog } = useBlog();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the new blog data to your backend API

    const newBlog = new FormData();
    newBlog.append("title", title1);
    newBlog.append("content", content1);
    newBlog.append("category", category1);
    newBlog.append("author", author1);
    if (image1) {
      newBlog.append("image", image1);
    }

    updateBlog(_id as string, newBlog);

    setIsModalOpen(false)
  }

  const handleClick = () => {
    goDetail(_id as string);
  };

  const handleUpdate = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setIsModalOpen(true);
    console.log("update", _id);

    // router.push(`/blog/update/${_id}`)
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    deleteBlog(_id as string);
    console.log("delete", _id);

    // delete logic here
  };

  return (
    <div
      className="
        group
        h-[480px]
        sm:h-[500px]
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-100
        bg-white
        shadow-sm
        hover:shadow-lg
        transition
        duration-300
        cursor-pointer
      "
    >
      {/* Image */}
      <div className="relative flex-shrink-0">

        <img
          src={imageUrl}
          alt="Blog"
          className="
            w-full
            h-44
            sm:h-48
            object-cover
          "
        />

        {/* Floating Action Buttons */}
        <div
          className="
            absolute
            top-4
            left-4
            flex
            items-center
            gap-2
            opacity-0
            group-hover:opacity-100
            transition
          "
        >

          {/* Update */}
          <button
            onClick={handleUpdate}
            className="
              w-10
              h-10
              rounded-xl
              bg-[#23233b]
              text-white
              flex
              items-center
              justify-center
              shadow-md
              hover:bg-indigo-600
              transition
              cursor-pointer
            "
          >
            <Pencil size={18} />
          </button>

          {/* Delete with Confirm */}
          <AlertDialog>

            <AlertDialogTrigger asChild>

              <button
                onClick={(e) => e.stopPropagation()}
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-red-500
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-md
                  hover:bg-red-600
                  transition
                "
              >
                <Trash2 size={18} />
              </button>

            </AlertDialogTrigger>

            <AlertDialogContent
              onClick={(e) => e.stopPropagation()}
            >

              <AlertDialogHeader>

                <AlertDialogTitle>
                  Delete Blog?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                  This will permanently delete this blog post.
                </AlertDialogDescription>

              </AlertDialogHeader>

              <AlertDialogFooter>

                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDelete}
                  className="
                    bg-red-500
                    hover:bg-red-600
                  "
                >
                  Delete
                </AlertDialogAction>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>

        </div>

      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">


        <div onClick={handleClick}>

          <div className="flex items-center justify-between mb-4">

            <span
              className="
                px-3
                py-1
                rounded-full
                bg-purple-100
                text-purple-700
                text-xs
                font-medium
              "
            >
              {category1}
            </span>

            <span className="text-xs text-gray-400">
              6 min read
            </span>

          </div>

          <h2
            className="
              text-2xl
              font-bold
              leading-snug
              text-[#1f1f1f]
              line-clamp-2
            "
          >
            {title1}
          </h2>

          <p
            className="
              mt-3
              text-sm
              text-gray-500
              leading-7
              line-clamp-4
            "
          >
            {content1}
          </p>

        </div>

        <div className="mt-auto pt-6 flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-gradient-to-r
              from-purple-500
              to-indigo-500
              flex-shrink-0
            "
          />

          <div>

            <p className="text-sm font-semibold text-[#1f1f1f]">
              {author1}
            </p>

            <p className="text-xs text-gray-400">
              {created_at}
            </p>

          </div>

        </div>

      </div>
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
                    onChange={e => setTitle1(e.target.value)}
                    value={title1}
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
                      value={category1}
                      onChange={(e) => setCategory1(e.target.value)}
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
                      onChange={e => setAuthor1(e.target.value)}
                      value={author1}
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
                          setImage1(file);
                          setImageUrl1(imageUrl);
                        }
                      }}
                    />

                    {/* Preview */}
                    {imageUrl1 ? (
                      <img
                        src={imageUrl1}
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
                    value={content1}
                    onChange={e => setContent1(e.target.value)}
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
                    Update Blog
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default BlogCard;