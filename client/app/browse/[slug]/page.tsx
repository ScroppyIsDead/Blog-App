"use client";
import React, { useEffect, useState } from "react";
import { getArticleFromSlug } from "../../components/functions";

const page = ({ params }: { params: { slug: any } }) => {
  const [pageArticle, setpageArticle] = useState({});
  const slug = params.slug;

  useEffect(() => {
    console.log("the slug is: " + slug);
    if (slug) {
      getArticleFromSlug(setpageArticle, slug);
    }
  }, []);

  return (
    <div className="text-black bg-white p-4">
      <h1 className="text-2xl text-center">{pageArticle.title}</h1>
      <h2 className="text-xs text-center italic">By {pageArticle.author}</h2>
      <p className="text-center my-4">{pageArticle.content}</p>
      <p className="italic text-center text-sm">
        Time Posted: {pageArticle.date_posted}
      </p>
    </div>
  );
};

export default page;
