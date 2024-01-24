import React, { useEffect, useState } from "react";
import useStore from "../store";
// import { comments } from "../utils/dummyData";
import Button from "./Button";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import { toast, Toaster } from "sonner";
import {
  deletePostComments,
  getPostComments,
  postComments,
} from "../utils/apiCalls";

const PostComments = ({ postId }) => {
  const { user } = useStore();
  const [comment, setComments] = useState("");
  const [desc, setDesc] = useState("");

  const fetchComments = async () => {
    const res = await getPostComments(postId);
    setComments(res);
  };

  const handleDeleteComment = async (id) => {
    const res = await deletePostComments(id, user?.token, postId);
    if (res?.success) {
      fetchComments();
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    console.log(desc);
    const res = await postComments(postId, user?.token, desc);

    if (res?.success === true) {
      setDesc("");
      fetchComments();
      toast.success("Published Successfully");
    } else {
      toast.error("Something went wrong, Please try again...");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="w-full py-10">
      <p className="text-lg text-slate-700 dark:text-slate-500 mb-6">
        Post Comments
      </p>

      {user?.token ? (
        <form className="flex flex-col mb-6" onSubmit={handlePostComment}>
          <textarea
            name="desc"
            label="desc"
            onChange={(e) => setDesc(e.target.value) }
            value={desc}
            required={true}
            placeholder="Add a comment..."
            className="bg-transparent w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-600  focus:ring-blue-600 rounded"
          />

          <div className="w-full flex justify-end mt-2">
            <Button
              type={"submit"}
              onClick={() => {}}
              label="Submit"
              styles="bg-blue-600 text-white py-2 px-5 rounded"
            />
          </div>
        </form>
      ) : (
        <Link to="/sign-in" className="flex flex-col py-10">
          <Button
            label="Sign in to comment"
            styles="flex items-center justify-center bg-white dark:bg-transparent text-black dark:text-gray-500 px-4 py-1.5 rounded-full border"
          />
        </Link>
      )}

      <div className="w-full h-full flex flex-col gap-10 2xl:gap-y-14 px-2">
        {comment?.length === 0 ? (
          <span className="text-base text-slate-600">
            No Comment, be the first to comment
          </span>
        ) : (
          comment?.map((el) => (
            <div key={el?._id} className="w-full flex gap-4 items-start">
              <img
                src={el?.user?.image || Profile}
                alt={el?.user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="w-full -mt-2">
                <div className="w-full flex items-center gap-2">
                  <p className="text-slate-700 dark:text-gray-400 font-medium">
                    {el?.user?.name}
                  </p>
                  <span className="text-slate-700 text-xs italic">
                    {new Date(el?.createdAt).toDateString()}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm">
                    {el?.desc}
                  </span>

                  {user?.user?._id === el?.user?._id && (
                    <span
                      className="text-base text-red-600 cursor-pointer"
                      onClick={() => handleDeleteComment(el?._id)}
                    >
                      Delete
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Toaster richColors />
    </div>
  );
};

export default PostComments;
