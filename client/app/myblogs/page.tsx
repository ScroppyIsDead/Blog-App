"use client";
import React, { useEffect, useRef, useState } from "react";
import { DELETE_ARTICLE } from "../components/urls";
import {
  getUserArticles,
  getUsername,
  handleCreateBlog,
} from "../components/functions";

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogMade, setBlogMade] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [articles, setArticles] = useState([]);
  const [createBlogGUI, setCreateBlogGUI] = useState(false);
  const [getArticles, setGetArticles] = useState(0);
  const [deleteGUI, setdeleteGUI] = useState(false);
  const [deletedBlog, setDeletedBlog] = useState({});
  const [getusernameStatus, setGetuserUsername] = useState(0);
  const [usersUsername, setusersUsername] = useState("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const deleteArticle = async () => {
    try {
      const data = {
        slug: deletedBlog.slug,
        author_id: deletedBlog.author,
      };
      const response = await fetch(DELETE_ARTICLE, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("deleted correctly");
      }
      const responseData = await response.json();
      getUserArticles(setGetArticles, setArticles);
      setdeleteGUI(!deleteGUI);
      console.log("register sucess", responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDeleteGUI = async (
    slug: string,
    author: string,
    title: string
  ) => {
    setdeleteGUI(!deleteGUI);
    setDeletedBlog({ slug, author, title });
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    getUsername(setGetuserUsername, setusersUsername);
    getUserArticles(setGetArticles, setArticles);
    if (textarea) {
      const resize = () => {
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      textarea.addEventListener("input", resize);
      return () => textarea.removeEventListener("input", resize);
    }
  }, []);

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <p className="text-3xl font-bold text-center mb-4">
        Welcome {usersUsername}
      </p>

      <div className="w-full max-w-md">
        <button
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded mb-4 w-full"
          onClick={() => setCreateBlogGUI(!createBlogGUI)}
        >
          Create New Blog
        </button>

        <ul>
          {articles.map((blog, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow mb-4">
              <a
                href={"browse/" + blog.slug}
                className="text-2xl font-bold block text-center mb-2"
              >
                {blog.title}
              </a>

              <p className="text-gray-600 text-sm text-center mb-4">
                By {blog.author}
              </p>

              <p className="text-gray-700 text-base">{blog.content}</p>

              <p className="text-gray-500 text-xs text-center mt-4">
                Date Posted: {blog.date_posted}
              </p>

              <div className="flex justify-between mt-4">
                <a
                  className="text-blue-500 text-sm"
                  href={"browse/" + blog.slug}
                >
                  Click to fully open Blog
                </a>

                <button
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    toggleDeleteGUI(blog.slug, blog.authorid, blog.title)
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          ))}

          {getArticles === 1 ? (
            <p className="text-center text-red-500">
              Error Getting Articles, please ensure you are logged in.
              <a className="text-blue-500" href="/login">
                Click here to login
              </a>
            </p>
          ) : null}
        </ul>
      </div>

      {deleteGUI ? (
        <div className="fixed flex flex-col z-2 bg-white p-4 rounded-xl shadow-xl w-3/4 h-fit justify-between gap-4 m-auto left-0 right-0 top-0 bottom-0 border-gray border-2">
          <div className="flex flex-col justify-between">
            <p className="text-3xl text-red-500 font-bold text-center">
              Warning
            </p>
            <p className="p-2 text-lg text-center">
              By clicking delete you will permanently delete your blog. There is
              no way to undo this action and it will be gone forever. Click
              Delete to confirm deletion of blog
              <p className="text-red-500 font-semibold">
                "{deletedBlog.title}"
              </p>
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setdeleteGUI(!deleteGUI);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
              >
                Cancel
              </button>

              <button
                onClick={deleteArticle}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {createBlogGUI ? (
        <div className="absolute flex flex-col z-2 bg-white p-4 rounded-xl shadow-xl w-3/4 h-fit justify-between gap-4 m-auto left-0 right-0 top-0 bottom-0 border-gray border-2">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold">Create A Blog</h1>
            <button
              onClick={() => {
                setCreateBlogGUI(!createBlogGUI);
              }}
              className="text-red-500 text-lg font-medium"
            >
              X
            </button>
          </div>
          <input
            onChange={handleTitle}
            className="border-2 rounded p-2"
            type="text"
            placeholder="Enter Title here"
          />
          <textarea
            ref={textareaRef}
            className="border-2 rounded resize-none max-h-[60vh] min-h-[10vh] p-2"
            placeholder="Enter Blog here"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setContent(e.target.value);
              const textarea = textareaRef.current;
              if (textarea) {
                textarea.style.height = `${textarea.scrollHeight}px`;
              }
            }}
          />
          <button
            onClick={() =>
              handleCreateBlog(
                title,
                content,
                setBlogMade,
                setGetArticles,
                setArticles,
                setCreateBlogGUI
              )
            }
            className="bg-yellow-500 rounded-3xl p-2 m-2 text-lg font-medium"
          >
            Create Blog
          </button>
          {blogMade === 2 ? (
            <p className="text-green-500 font-medium">Made blog yay</p>
          ) : blogMade === 1 ? (
            <p className="text-red-500 font-medium">blog failed to make</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default page;
