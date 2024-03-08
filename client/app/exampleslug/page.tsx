"use client";
import React, { useEffect, useState } from "react";
import { getArticleFromSlug } from "../components/functions";

const page = () => {
  const [pageArticle, setpageArticle] = useState({});
  const slug = "username-and-password-to-my-account";

  useEffect(() => {
    getArticleFromSlug(setpageArticle, slug);
  }, []);

  return (
    <div className="text-black bg-white">
      {pageArticle.title}hi
      <div>{pageArticle.content}</div>
    </div>
  );
};

export default page;
