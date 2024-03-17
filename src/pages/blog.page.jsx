import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
// import BlogPost from "../components/blog-post.component";
// import BlogContent from "../components/blog-content.component";
import CommentContainer, {
  fetchComments,
} from "../components/comments.component";
import { BlogContext } from "../App";
import Map from "../components/Map";

export const postStructure = {
  title: "",
  email: "",
  mobileNumber: "",
  city: "",
  numberOfDays: "",
  locationLink: "",
  banner: "",
  jobType: "",
  des: "",
};



const BlogPage = () => {
  let { blog_id } = useParams();
  const navigate = useNavigate();

  const [commentWrapper, setCommentWrapper] = useState(false);

  const [totalParentCommentLoaded, setTotalParentCommentLoaded] = useState(1);
  console.log(totalParentCommentLoaded);

  const [post, setPost] = useState(postStructure);
  const [similarBlog, SetSimilarBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  let [isLikedByUser, SetisLikedByUser] = useState(false);

  let {setPosts} = useContext(BlogContext)

  useEffect(() => {
    resetState();

    getpost({ blog_id });
    
  }, [blog_id]);

  const resetState = () => {
    setPost(postStructure);
    SetSimilarBlog(null);
    setLoading(true);
    SetisLikedByUser(false);
    setCommentWrapper(false);
    setTotalParentCommentLoaded(0);
  };

  const getpost = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-post", { blog_id })
      .then(async ({ data: { blog } }) => {
        console.log("before --> ", blog.comments);

        blog.comments = await fetchComments({
          blog_id: blog._id,
          setParentCommentCountFun: setTotalParentCommentLoaded,
        });

        setPost(blog);
        setPosts(blog)
        console.log("after --> ", blog.comments);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    // <AnimationWrapper>

    //     {
    //         loading ? <Loader /> :
    //             <BlogContext.Provider value={{ blog, setBlog, SetisLikedByUser, isLikedByUser , setTotalParentCommentLoaded , totalParentCommentLoaded , commentWrapper , setCommentWrapper }}>

    //                 <CommentContainer/>
    //                 <div className='max-w-[900px] center py-10 max-lg:px-[5vw]'>

    //                     <img src={banner} className='aspect-video ' />

    //                     <div className="mt-12 ">

    //                         <h2>
    //                             {title}
    //                         </h2>

    //                         <div className='flex max-sm:flex-col justify-between my-8 '>
    //                             <div className='flex gap-5 items-start '>
    //                                 <img onClick={() => {
    //                                     navigate(`/user/${author_username}`)
    //                                 }} className='w-12 h-12 rounded-full' src={profile_img} />
    //                                 <p className='capitalize'>{fullname}
    //                                     <br />
    //                                     @
    //                                     <Link className='underline' to={`/user/${author_username}`}>{author_username}</Link>
    //                                 </p>
    //                             </div>

    //                             <p className='text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5'>Publish on {getDay(publishedAt)}</p>
    //                         </div>

    //                     </div>

    //                     <BlogInteraction />

    //                     <div className='my-12 font-gelasio blog-page-content'>
    //                         {

    //                             content[0].blocks.map((block, i) => {
    //                                 return <div key={i} className='my-4 md:my-8 '>
    //                                     <BlogContent block={block} />

    //                                 </div>
    //                             })
    //                         }

    //                     </div>

    //                     <BlogInteraction />
    //                     {
    //                         similarBlog != null && similarBlog.length ? <>
    //                             <h1 className='text-2xl mt-14 mb-10 font-medium' >
    //                                 Similar Blog</h1>

    //                             {
    //                                 similarBlog && similarBlog.map((blog, i) => {
    //                                     let { author: { personal_info } } = blog

    //                                     return <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.08 }}>
    //                                         <BlogPost content={blog} author={personal_info} />

    //                                     </AnimationWrapper>
    //                                 })
    //                             }
    //                         </>
    //                             : ""
    //                     }

    //                 </div>
    //             </BlogContext.Provider>
    //     }
    // </AnimationWrapper>

    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <CommentContainer />
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={post.banner}
              alt="Banner"
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-dark-gray">
                {post.title}
              </h2>
              <p className="text-base text-dark-gray">
                Description: {post.des}
              </p>
              <p className="text-base text-dark-gray">Email: {post.email}</p>
              <p className="text-base text-dark-gray">
                Location:{" "}
                <a href={post.locationLink} className="underline">
                  {post.city}
                </a>
              </p>
              <p className="text-base text-dark-gray">
                Mobile Number: {post.mobileNumber}
              </p>
              <p className="text-base text-dark-gray">
                Number of Days: {post.numberOfDays}
              </p>
              <p className="text-base text-dark-gray">
                Job Type: {post.jobType}
              </p>
              <button className="btn-dark px-8 m-4">
            Apply
          </button>
              <BlogInteraction
                total_comments={post.activity.total_comments}
                author_username={post.author.personal_info.username}
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-dark-gray">
                  Author Information
                </h3>
                <div className="flex items-center mt-2">
                  <img
                    src={post.author.personal_info.profile_img}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-base text-dark-gray">
                      {post.author.personal_info.fullname}
                    </p>
                    <p className="text-sm text-dark-gray">
                      {post.author.personal_info.username}
                    </p>
                  </div>
                </div>
              </div>

              <Map latitude={post.lat} longitude={post.long}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;
