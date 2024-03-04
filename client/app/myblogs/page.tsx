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
    <div className="h-fit w-full flex justify-center">
      <div className="flex flex-col">
        <p className="text-2xl text-center m-4">Welcome {usersUsername}</p>
        <button
          className="text-white rounded mb-2 bg-yellow-500 p-2 m-2 "
          onClick={() => setCreateBlogGUI(!createBlogGUI)}
        >
          Create New Blog
        </button>
        <div>
          <ul>
            {articles.map((blog, index) => (
              <li className="p-2 border-2 flex flex-col" key={index}>
                <h1 className=" text-center font-bold">{blog.title}</h1>
                <h2 className="text-xs pb-4 text-center">By {blog.author}</h2>

                <p className="px-8">{blog.content}</p>
                <p className="text-xs pt-2 text-black text-center">
                  Date Posted: {blog.date_posted}
                </p>
                <div className="flex flex-row justify-around items-center">
                  <a className="text-center text-blue-500" href={blog.slug}>
                    Click to fully open Blog
                  </a>
                  <button
                    className="text-black m-2 bg-red-500 p-2 rounded"
                    onClick={() =>
                      toggleDeleteGUI(blog.slug, blog.authorid, blog.title)
                    }
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
      {deleteGUI ? (
        <div className="fixed flex flex-col z-2 bg-white p-4 rounded-xl shadow-xl w-3/4 h-fit justify-between gap-4 m-auto left-0 right-0 top-0 bottom-0 border-gray border-2">
          <div className="flex flex-col justify-between">
            <p className="text-3xl text-red-500 self-center">Warning</p>
            <p className="p-2 text-center">
              By clicking delete you will permanetly delete your blog. There is
              no way to undo this action and it will be gone forever. Click
              Delete to confirm the deletion of blog
              <p className="text-red-500">"{deletedBlog.title}"</p>
            </p>
            <button
              onClick={() => {
                setdeleteGUI(!deleteGUI);
              }}
              className="border-2 border-black rounded-3xl p-2 m-2 text-xl"
            >
              Nevermind
            </button>
            <button
              onClick={deleteArticle}
              className="bg-red-500 rounded-3xl p-2 m-2 text-xl"
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
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
            className=" bg-yellow-500 rounded-3xl p-2 m-2"
          >
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
