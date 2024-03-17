import React from "react";
import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPost = ({ blog, author }) => {
console.log("varda", blog);

  let { fullname, profile_img, username } = author;

  return (
    <Link to={`/post/${blog.blog_id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4 ">
      {/* <div className="w-full">
        <div className="flex gap-2 items-center mb-7  ">
          <img src={profile_img} alt="" className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1 ">
            {fullname} @ {username}
          </p>
          <p className="min-width-fit ">{getDay(publishedAt)}</p>
        </div>

        <h1 className="blog-title ">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2 ">
          {des}
        </p>
        <div className="flex gap-4 mt-7 ">
          <span className="btn-light py-1 px-4">{tags[0]}</span>
          <span className="ml-2 flex items-center gap-2 text-dark-grey">
            <i className="fa-regular fa-heart text-xl"></i>
            {total_likes}
          </span>
        </div>
      </div>
      <div className="h-28 aspect-square bg-grey ">
        <img src={banner} className="w-full h-full object-cover  aspect-square" alt="" />

      </div> */}


      <div key={blog.blog_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img className="w-full h-48 object-cover object-center" src={blog.banner} alt={blog.title} />
        <div className="p-4">
          <h2 className="text-dark-gray text-lg font-semibold">{blog.title}</h2>
          <p className="text-dark-gray text-sm">{blog.city}</p>
          <p className="text-dark-gray text-sm">{blog.numberOfDays} days</p>
          <p className="text-dark-gray text-sm">{blog.jobType}</p>
          <div className="flex items-center mt-4">
            <img className="w-10 h-10 rounded-full mr-4" src={blog.author.personal_info.profile_img} alt={blog.author.personal_info.fullname} />
            <div>
              <p className="text-gray-800 font-semibold">{blog.author.personal_info.fullname}</p>
              <p className="text-gray-600 text-sm">{blog.publishedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
