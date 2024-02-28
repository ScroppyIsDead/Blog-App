"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [articles, setArticles] = useState([]);

  const getAllArticles = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/article/allarticles",
        { method: "GET" }
      );
      if (!response.body) {
        throw new Error("couldnt get blogs");
      }
      const result = await response.json();
      setArticles(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <div className="w-full h-fit">
      <div>
        <ul>
          {articles.map((blog, index) => (
            <li key={index}>
              <h1>Title: {blog.title}</h1>
              <h2>Author: {blog.author}</h2>
              <p>Content: {blog.content}</p>
              <div className="flex flex-row justify-between">
                <a className="text-blue-500" href={blog.slug}>
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
