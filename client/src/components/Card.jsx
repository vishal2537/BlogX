import Markdown from "markdown-to-jsx";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Card = ({ post, index }) => {
  return (
    <div
      key={post?._id}
      className={`w-full flex flex-col gap-8 items-center rounded
     md:flex-row  bg-gray-100 p-5 dark:bg-gradient-to-r from-[#020b19] via-[#071b3e] to-[#020b19] hover:scale-105 transition duration-500 cursor-pointer
      shadow-xl  `}
      //  ${index / 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
    >
      <Link
        to={`/${post?.slug}/${post._id}`}
        className="w-full h-auto md:h-64 md:w-2/4 "
      >
        <img
          src={post?.img}
          alt={post?.title}
          className="object-cover w-full h-full rounded hover:scale-95 transition duration-500 cursor-pointer"
        />
      </Link>

      <div className="w-full md:w-2/4 flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            {new Date(post?.createdAt).toDateString()}
          </span>
          <span className="text-sm text-rose-600 font-semibold">
            {post?.cat}
          </span>
        </div>

        <h6 className="text-xl 2xl:text-3xl font-semibold text-black dark:text-white">
          {post?.title}
        </h6>

        <div className="flex-1 overflow-hidden text-gray-600 dark:text-slate-500 text-sm text-justify">
          <Markdown options={{ wrapper: "article" }}>
            {post?.desc?.slice(0, 250) + "..."}
          </Markdown>
        </div>

        <Link
          to={`/${post?.slug}/${post._id}`}
          className="flex items-center gap-2 text-black dark:text-white"
        >
          <span className="hover:underline text-rose-800">Read More... </span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
