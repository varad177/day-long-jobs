import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext, UserContext } from "../App";
import toast from "react-hot-toast";
import axios from "axios";

const BlogInteraction = ({total_comments , author_username}) => {



    let { userAuth: { username, access_token } } = useContext(UserContext)



 let {commentWrapper , setCommentWrapper} = useContext(BlogContext)
 console.log(commentWrapper);


    return (
        <>
            <hr className="border border-grey my-2 " />
            <div className="flex gap-6 justify-between">
                <div className="flex gap-3 items-center">


                    <button onClick={()=>setCommentWrapper(preval => !preval)} className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
                        <i class="fa-regular fa-comment"></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_comments}</p>
                </div>

                <div className="flex gap-6 items-center">

                    {/* {
                        username == author_username ? <Link className="underline hover:text-purple" to={`/editor/${blog_id}`}>
                            Edit
                        </Link> : ""
                    } */}

                  
                </div>
            </div>

            <hr className="border border-grey my-2" />
        </>
    );
};

export default BlogInteraction;
