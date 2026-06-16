// app/(components)/content-layout/apps/jobs/blog/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  createdAt: string;
};

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.err || "Failed to fetch blogs");
      }
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  if (blogs.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No blogs found</p>
      </div>
    );

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-10">Our Blogs</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/home/jobs/blog/${blog.id}`}
            className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{blog.description}</p>
              <p className="mt-3 text-gray-400 text-xs">
                Created at: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
