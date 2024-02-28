"use client";
import { create } from "domain";
import React, { use, useEffect, useRef, useState } from "react";

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogMade, setBlogMade] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [articles, setArticles] = useState([]);
  const [createBlogGUI, setCreateBlogGUI] = useState(false);
  const [getArticles, setGetArticles] = useState(0);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const deleteArticle = async (slug, author) => {
    try {
      const data = {
        slug: slug,
        author_id: author,
      };
      const response = await fetch("http://localhost:8000/article/delete", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("deleted correctly");
      }
      const responseData = await response.json();
      getUserArticles();
      console.log("register sucess", responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserArticles = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/article/getownarticles",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.body) {
        setGetArticles(1);
        throw new Error("coulnt access to bloggg ig");
      }
      const result = await response.json();
      setGetArticles(2);
      setArticles(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setGetArticles(1);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    getUserArticles();
    if (textarea) {
      const resize = () => {
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      textarea.addEventListener("input", resize);
      return () => textarea.removeEventListener("input", resize);
    }
  }, []);

  const handleCreateBlog = async () => {
    try {
      const data = {
        title: title,
        content: content,
      };
      const response = await fetch("http://localhost:8000/article/create", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
        method: "POST",
      });
      if (!response.ok) {
        console.error("Error logging increating blog");
        setBlogMade(1);
      }
      if (response.ok) {
        console.log("blog made successfully");
        setBlogMade(2);
        getUserArticles();
        setCreateBlogGUI(false);
      }
    } catch (err) {
      console.error("problem creating blog", err);
      setBlogMade(1);
    }
  };

  return (
    <div className="h-fit w-full flex justify-center">
      <div className="">
        <h1>Your Blogs:</h1>
        <button
          className="text-yellow-500"
          onClick={() => setCreateBlogGUI(!createBlogGUI)}
        >
          Create new Blog
        </button>
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
                  <button
                    className="text-red-500"
                    onClick={() => deleteArticle(blog.slug, blog.authorid)}
                  >
                    Click to delete
                  </button>
                </div>
              </li>
            ))}
            {getArticles === 1 ? (
              <p>
                Error Getting Articles, please ensure you are logged it.{" "}
                <a className="text-blue-500" href="/login">
                  Click here to login
                </a>
              </p>
            ) : null}
          </ul>
        </div>
      </div>
      {createBlogGUI ? (
        <div className="absolute flex flex-col z-2 bg-white p-4 rounded-xl shadow-xl w-3/4 h-fit justify-between gap-4 m-auto left-0 right-0 top-0 bottom-0 border-gray border-2">
          <div className="flex flex-row justify-between">
            <h1 className="">Create A Blog</h1>
            <button
              onClick={() => {
                setCreateBlogGUI(!createBlogGUI);
              }}
              className="text-red-500"
            >
              X
            </button>
          </div>
          <input
            onChange={handleTitle}
            className="border-2 rounded"
            type="text"
            placeholder="Enter Title here"
          />
          <textarea
            ref={textareaRef}
            className="border-2 rounded resize-none max-h-[60vh] min-h-[10vh]"
            placeholder="Enter Blog here"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setContent(e.target.value);
              const textarea = textareaRef.current;
              if (textarea) {
                textarea.style.height = `${textarea.scrollHeight}px`;
              }
            }}
          />
          <button onClick={handleCreateBlog} className="">
            Create Blog
          </button>
          {blogMade === 2 ? (
            <p className="">Made blog yay</p>
          ) : blogMade === 1 ? (
            <p className="">blog failed to make</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default page;
