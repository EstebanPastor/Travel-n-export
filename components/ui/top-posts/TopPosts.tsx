"use client";

import Image from "next/image";
import Link from "next/link";
import Tag from "../tag/Tag";
import Overlay from "../overlay/Overlay";
import React, { useState } from "react";
import { PostTypes } from "@/types/postTypes";
import { formatDate } from "@/utils/formatDate";

const TopPosts: React.FC<{ posts: PostTypes[] }> = ({ posts }) => {
  const [visiblePosts, setVisiblePosts] = useState(5);

  const topPost = posts.filter((posts) => posts.topPost === true);
  return (
    <section aria-labelledby="top-post">
      <div className="w-full text-center">
        <h2
          id="top-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px-2 mb-10"
        >
          Top Posts:
        </h2>
      </div>
      <div className="flex h-full flex-col gap-12 items-center">
        {topPost.slice(0, visiblePosts).map((post, index) => (
          <Link
            href={`/blog/${post.id}`}
          >
            <article key={index}>
              <div className="relative cursor-pointer">
                <Image
                  src={post.image}
                  width={800}
                  height={800}
                  alt="Image for top posts"
                />

                <Overlay />
              </div>

              <div className="w-full flex justify-center">
                <Tag text={post.category} />
              </div>
              <h3 className="font-extrabold uppercase text-tertiary text-center">
                {post.title}
              </h3>
              <div className="flex gap-3 justify-center mt-2">
                <span className="font-light">By: {post.user.name}</span>
                <span className="italic font-light">{formatDate(post.createdAt)}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopPosts;
