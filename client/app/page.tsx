"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [usersUsername, setusersUsername] = useState("");
  const [articles, setArticles] = useState([]);

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
        throw new Error("coulnt access to bloggg ig");
      }
      const result = await response.json();
      console.log(result);
      setArticles(result);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        throw new Error("coulnt access logout ig");
      }
      console.log("successfully logged out");
    } catch (err) {
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
        throw new Error("Error getting user's data");
      }

      if (response.ok) {
        const data = await response.json();

        setusersUsername(data.message);
      }
    } catch (err) {
      console.log(err, "unable to get user information");
    }
  };

  return (
    <div className="flex flex-col">
      <p className=" m-2 p-2 self-center">HomePAge</p>
      <button
        onClick={userLogout}
        className="text-blue-500 m-2 p-2 self-center underline"
      >
        logout
      </button>
      <button
        className="border-2 self-center border-black m-2 p-2 w-fit"
        onClick={getUsername}
      >
        Click to expose Username
      </button>
      {usersUsername ? <p>{usersUsername}</p> : null}
      <button
        className="border-2 self-center border-black m-2 p-2 w-fit"
        onClick={getUserArticles}
      >
        Get Your Articles
      </button>
      {articles ? (
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
      ) : null}
    </div>
  );
};
export default page;
