"use client";
import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogMade, setBlogMade] = useState(0);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const [textareaHeight, setTextareaHeight] = useState("auto");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const resize = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };
    textarea.addEventListener("input", resize);
    return () => textarea.removeEventListener("input", resize);
  }, []);

  const handleClick = async () => {
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
      }
    } catch (err) {
      console.error("problem creating blog", err);
      setBlogMade(1);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center">
      <div className="flex flex-col self-center -translate-y-7 h-1/2 justify-around lg:w-3/5">
        <h1 className="text-black text-xl self-center">Create A Blog</h1>
        <input
          onChange={handleTitle}
          className="w-1/4"
          type="text"
          placeholder="Enter Title here"
        />
        <textarea
          ref={textareaRef}
          className="border-2 resize-none"
          placeholder="Enter Blog here"
          style={{ height: textareaHeight }}
          onChange={(e) => {
            setContent(e.target.value);
            setTextareaHeight("auto");
          }}
        />
        <button onClick={handleClick} className="text-center">
          Create Blog
        </button>
        {blogMade === 2 ? (
          <p className="text-green-500">Made blog yay</p>
        ) : blogMade === 1 ? (
          <p className="text-red-500">blog failed to make</p>
        ) : null}
      </div>
    </div>
  );
};

export default page;
