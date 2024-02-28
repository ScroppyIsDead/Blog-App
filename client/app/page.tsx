"use client";
import { get } from "http";
import React, { useEffect, useState } from "react";

const page = () => {
  const [usersUsername, setusersUsername] = useState("");
  const [articles, setArticles] = useState([]);
  const [getArticles, setGetArticles] = useState(0);
  const [getuserUsername, setGetuserUsername] = useState(0);
  const [logoutStatus, setlogoutStatus] = useState(0);

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

  const userLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.body) {
        setlogoutStatus(1);
        throw new Error("coulnt access logout ig");
      }
      if (!response.ok) {
        setlogoutStatus(1);
        console.log("error logging logged out");
      }
      if (response.ok) {
        setlogoutStatus(2);
      }
    } catch (err) {
      setlogoutStatus(1);
      console.error(err, "hey error logging out");
    }
  };

  const getUsername = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/getinfo", {
        method: "GET",
        credentials: "include",
      });
      if (!response.body) {
        setGetuserUsername(1);
        throw new Error("Error getting user's data");
      }
      if (response.ok) {
        const data = await response.json();
        setGetuserUsername(2);
        setusersUsername(data.message);
        return "hi";
      }
      setGetuserUsername(1);
    } catch (err) {
      console.log(err, "unable to get user information");
      setGetuserUsername(1);
    }
  };

  return (
    <div className="flex flex-col">
      <header>
        <div className="border-2 border-red-500 shadow-xl text-2xl font-bold py-4 px-2 ">
          Welcome to Bloggy, create, share, and view tons of blogs made by
          people just like you.
        </div>
      </header>
      <button
        onClick={userLogout}
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
        onClick={getUsername}
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
        onClick={getUserArticles}
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
                <button onClick={() => deleteArticle(blog.slug, blog.authorid)}>
                  Click to delete
                </button>
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
