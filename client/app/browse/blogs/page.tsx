"use client";
import React, { useEffect, useState } from "react";
import { ALL_ARTICLES } from "../../components/urls";
import { getAllArticles } from "../../components/functions";

const page = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles(setArticles);
  }, []);

  return (
    <div className="w-full h-fit">
      <div className="flex flex-col items-center">
        <ul className="w-full">
          {articles.map((blog: any, index: number) => (
            <li key={index} className="p-4 border-b border-gray-200">
              <div className="flex flex-col items-center">
                <h1 className="text-lg font-bold text-center">
                  <a href={"/browse/blogs/" + blog.slug}>{blog.title}</a>
                </h1>
                <h2 className="text-sm text-gray-500 pb-2">By {blog.author}</h2>
                {blog.content.split("\n").map((paragraph: any, index: any) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <p className="text-xs pt-2 text-gray-400">
                  Date Posted: {blog.date_posted}
                </p>
                <a
                  href={"/browse/blogs/" + blog.slug}
                  className="text-blue-500 text-sm mt-2"
                >
                  Click to fully open Blog
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
