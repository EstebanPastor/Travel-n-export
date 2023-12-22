"use client";

import React, { useState } from "react";
import BlogCard from "../blog-card/BlogCard";
import Button from "../button/Button";
import { PostTypes } from "@/types/postTypes";
import clsx from "clsx";

const Posts: React.FC<{ posts: PostTypes[] }> =  ({ posts }) => {
  const [visibleBlogs, setVisibleBlogs] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
  };

  const filterPostsByCategory = () => {
    if (selectedCategory === "all") {
      return posts.slice(0, visibleBlogs);
    } else {
      return posts
        .filter((post) => post.category === selectedCategory)
        .slice(0, visibleBlogs);
    }
  };

  const categories = [
    "Adventure",
    "Wanderlust",
    "Culture",
    "Discovery",
    "Journeys",
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleBlogs(5);
  };

  return (
    <section className="col-span-2" aria-labelledby="latest-posts">
      <div className="w-full text-center">
        <h2
          id="latest-posts"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px-2 mb-10"
        >
          All posts
        </h2>
      </div>
      <div className="flex justify-center space-x-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={clsx(
              selectedCategory === category
                ? "bg-tertiary/60 text-white"
                : "bg-tertiary text-white", "px-4 py-2 rounded hover:bg-tertiary/50 mb-10"
            )}
          >{category === "all" ? "All" : category}</button>
        ))}
      </div>
      <div className="flex flex-col gap-10 h-full">
        {filterPostsByCategory().slice(0, visibleBlogs).map((post, id) => (
          <BlogCard post={post} key={id} />
        ))}
        {visibleBlogs < filterPostsByCategory.length && (
          <div className="flex justify-center">
            <Button
              onClick={showMoreBlogs}
              text="Show more"
              aria="Show more blog posts"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Posts;
