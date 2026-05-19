"use client";

import { X } from "lucide-react";

type CreateBlogModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateBlogModal = ({
  isOpen,
  onClose,
}: CreateBlogModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-3xl font-bold text-[#1f1f1f]">
              Create Blog
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Share your thoughts with the world
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Blog Title
            </label>

            <input
              type="text"
              placeholder="Enter blog title"
              className="
                w-full
                h-12
                rounded-xl
                border
                border-gray-200
                px-4
                outline-none
                transition
                focus:border-purple-500
                focus:ring-4
                focus:ring-purple-100
              "
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>

            <input
              type="text"
              placeholder="Technology"
              className="
                w-full
                h-12
                rounded-xl
                border
                border-gray-200
                px-4
                outline-none
                transition
                focus:border-purple-500
                focus:ring-4
                focus:ring-purple-100
              "
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Image URL
            </label>

            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="
                w-full
                h-12
                rounded-xl
                border
                border-gray-200
                px-4
                outline-none
                transition
                focus:border-purple-500
                focus:ring-4
                focus:ring-purple-100
              "
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Author Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="
                w-full
                h-12
                rounded-xl
                border
                border-gray-200
                px-4
                outline-none
                transition
                focus:border-purple-500
                focus:ring-4
                focus:ring-purple-100
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows={6}
              placeholder="Write your story..."
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                outline-none
                resize-none
                transition
                focus:border-purple-500
                focus:ring-4
                focus:ring-purple-100
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              h-12
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-indigo-500
              text-white
              font-medium
              hover:opacity-95
              transition
            "
          >
            Publish Blog
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateBlogModal;