"use client";

import { Blog } from "@/lib/types";
import { useRouter } from "next/navigation";

const useBlog = () => {
  const router = useRouter();
  const createNewBlog = async (blogInfo: FormData) => {
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: blogInfo,
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.error || "Failed to create blog.");
        return;
      }
      router.refresh();

      console.log("Blog created:", data);
    } catch (err: unknown) {
      console.error("Create blog error:", err);
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  }

  const getBlogs = async (): Promise<Blog[]> => {
    try {
      const response = await fetch("/api/blog");
      const data = await response.json();
      return data;
    } catch (err: unknown) {
      console.error("Get blogs error:", err);
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Something went wrong.");
      }
      router.push("/signin");
      router.refresh();
      return [];
    }
  }

  const goDetail = (id: string) => {
    router.push(`/detail/${id}`);
  };

  const getBlogDetail = async (id: string): Promise<Blog | null> => {
    try {
      const response = await fetch(`/api/blog/${id}`,{method: "GET"});
      const data = await response.json();
      console.log("Blog detail:", data);
      return data;
    } catch (err: unknown) {
      console.error("Get blog detail error:", err);
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Something went wrong.");
      }
      return null;
    }
  };

  const updateBlog = async (id: string, blogInfo: FormData) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: blogInfo,
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.error || "Failed to update blog.");
        return;
      }

      console.log("Blog updated:", data);
      router.refresh();
    } catch (err: unknown) {
      console.error("Update blog error:", err);
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.error || "Failed to delete blog.");
        return;
      }

      console.log("Blog deleted:", data);
      router.refresh();
    } catch (err: unknown) {
      console.error("Delete blog error:", err);
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Something went wrong.");
      }
    }
  };

  return {
    createNewBlog,
    getBlogs,
    goDetail,
    getBlogDetail,
    updateBlog,
    deleteBlog,
  }
}

export default useBlog;