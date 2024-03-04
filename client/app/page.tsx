"use client";
import { get } from "http";
import React, { useEffect, useState } from "react";
import {
  getUserArticles,
  getUsername,
  userLogout,
} from "./components/functions";

const page = () => {
  const [usersUsername, setusersUsername] = useState("");
  const [articles, setArticles] = useState([]);
  const [getArticles, setGetArticles] = useState(0);
  const [getuserUsername, setGetuserUsername] = useState(0);
  const [logoutStatus, setlogoutStatus] = useState(0);

  //functions and other things are in components/functions

  return (
    <div className="flex flex-col">
      <header>
        <div className="border-2 border-red-500 shadow-xl text-2xl font-bold py-4 px-2 ">
          Welcome to Bloggy, create, share, and view tons of blogs made by
          people just like you.
        </div>
      </header>
      <button
        onClick={() => userLogout(setlogoutStatus)}
        className="text-blue-500 m-2 p-2 self-center underline"
      >
        logout
      </button>
      {logoutStatus === 1 ? (
        <p className="text-red-500">couldnt logout correctly/ not logged in</p>
      ) : logoutStatus === 2 ? (
        <p className="text-green-500">Loggout out correctly</p>
      ) : null}
      <button
        className="border-2 self-center border-black m-2 p-2 w-fit"
        onClick={() => getUsername(setGetuserUsername, setusersUsername)}
      >
        Click to expose Username
      </button>
      {getuserUsername === 2 ? (
        <p>{usersUsername}</p>
      ) : getuserUsername === 1 ? (
        <p className="text-red-500">error getting username, did you login?</p>
      ) : null}
      <button
        className="border-2 self-center border-black m-2 p-2 w-fit"
        onClick={() => getUserArticles(setGetArticles, setArticles)}
      >
        Get Your Articles
      </button>
      {getArticles === 2 ? (
        <div className="flex w-[100vw] h-fit justify-center">
          <ul className="flex flex-col h-fit w-[60vw] self-center">
            {articles.map((blog, index) => (
              <li className="m-2 p-2 border-2 border-black" key={index}>
                <h1>Title: {blog.title}</h1>
                <h2>Author: {blog.author}</h2>
                <p>Content: {blog.content}</p>
                <a className="link text-blue-500 underline" href={blog.slug}>
                  Click here to fully open blog
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : getArticles === 1 ? (
        <p className="text-red-500">error getting articles, did you login?</p>
      ) : null}
    </div>
  );
};
export default page;
