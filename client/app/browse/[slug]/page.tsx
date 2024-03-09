"use client";
import React, { useEffect, useState } from "react";
import { getArticleFromSlug } from "../../components/functions";

const page = ({ params }: { params: { slug: any } }) => {
  const [pageArticle, setpageArticle] = useState({});
  const [getPageArticleStatus, setArticleStatus] = useState(0);
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      getArticleFromSlug(setpageArticle, slug, setArticleStatus);
    }
  }, []);

  return (
    <div className="text-black bg-white p-4 md:p-8">
      {getPageArticleStatus === 2 ? (
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl text-center font-semibold md:text-4xl">
            {pageArticle.title}
          </h1>
          <h2 className="text-xs text-center italic md:text-base">
            By {pageArticle.author}
          </h2>
          <p className="text-center my-4 md:text-lg">{pageArticle.content}</p>
          <p className="italic text-center text-sm md:text-base">
            Time Posted: {pageArticle.date_posted}
          </p>
        </div>
      ) : getPageArticleStatus === 1 ? (
        <p className="text-center md:text-lg">
          This blog doesnt exist, please make sure the url is correct
        </p>
      ) : (
        <p className="text-center md:text-lg">loading</p>
      )}
    </div>
  );
};

export default page;
