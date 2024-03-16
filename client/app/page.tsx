"use client";
import React, { useEffect, useState } from "react";
import { cutoffText, getRandomBlog, getUsername } from "./components/functions";

const page = () => {
  const [username, setusersUsername] = useState("");
  const [getusernameStatus, setGetuserUsername] = useState(0);
  const [blog, setRandomblog] = useState({});
  const [randomblogStatus, setRandomStatus] = useState(0);

  const aaasdwa = (content, maxLength) => {
    if (content && content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    } else {
      return content;
    }
  };

  useEffect(() => {
    getUsername(setGetuserUsername, setusersUsername);
    getRandomBlog(setRandomblog, setRandomStatus);
  }, []);
  return (
    <div className="h-screen flex flex-col bg-gray-100 p-4">
      <div className="flex flex-col items-center m-2">
        <div className="w-full flex flex-col m-2">
          {getusernameStatus === 2 ? (
            <p className="text-lg text-center font-semibold">
              Welcome {username}
            </p>
          ) : getusernameStatus === 1 ? (
            <a
              href="/login"
              className="text-lg self-center text-center font-semibold"
            >
              Click here to login
            </a>
          ) : null}
        </div>

        <div className="w-3/4 p-4 my-4 mx-16 border-2 rounded shadow-lg bg-white flex flex-col text-center">
          <a
            className="font-semibold text-lg text-blue-500"
            href={"/browse/blogs/" + blog.slug}
          >
            {cutoffText(blog.title, 65)}
          </a>
          <p className="italic text-gray-600 text-sm">By {blog.author}</p>
          <p className="text-gray-700">{cutoffText(blog.content, 300)}</p>
          <p className="text-gray-500 text-sm">
            Date Posted: {blog.date_posted}
          </p>
          <div className="flex flex-col mt-2">
            <a
              className="text-blue-500 hover:text-blue-700 text-sm"
              href={"/browse/blogs/" + blog.slug}
            >
              Click to fully open Blog
            </a>
            <a
              href="/browse/blogs/"
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Browse more blogs like this
            </a>
          </div>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
            onClick={() => getRandomBlog(setRandomblog, setRandomStatus)}
          >
            Refresh post
          </button>
        </div>
      </div>
      <div className="text-center">
        Sign up today
        <a className="text-blue-500 hover:text-blue-700" href="register">
          HERE
        </a>
      </div>
    </div>
  );
};

export default page;
