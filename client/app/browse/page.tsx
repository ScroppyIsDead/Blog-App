"use client";
import React, { useEffect, useState } from "react";
import { ALL_ARTICLES } from "../components/urls";
import { getAllArticles } from "../components/functions";

const page = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles(setArticles);
  }, []);

  return (
    <div className="w-full h-fit">
      <div>
        <ul>
          {articles.map((blog: any, index: number) => (
            <li className="p-2 border-2 flex flex-col" key={index}>
              <h1 className=" text-center font-bold">
                <a href={blog.slug}>{blog.title}</a>
              </h1>
              <h2 className="text-xs pb-4 text-center">By {blog.author}</h2>
              <p className="px-8 ">{blog.content}</p>
              <p className="text-xs pt-2 text-black text-center">
                Date Posted: {blog.date_posted}
              </p>
              <p className="text-center text-blue-500">
                <a href={blog.slug}>Click to fully open Blog</a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
