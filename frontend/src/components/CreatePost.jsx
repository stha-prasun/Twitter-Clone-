import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const dispatch = useDispatch();

  const [description, setdescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${TWEET_API_END_POINT}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          description,
          id: user?._id,
        }),
      });
      const data = await res.json();
      if (data.success === true) {
        toast.success(data?.message);
        setdescription("");
        dispatch(getRefresh());
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForYou = () => {
    dispatch(getIsActive(true));
  };

  const handleFollowing = () => {
    dispatch(getIsActive(false));
  };
  return (
    <div className="w-[100%]">
      <div className="m-0">
        <div className="flex items-center justify-evenly w-full border-b border-b-gray-200">
          <div
            onClick={handleForYou}
            className={`${
              isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"
            } hover:bg-gray-200 h-full w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg hover:cursor-pointer">
              For You
            </h1>
          </div>
          <div
            onClick={handleFollowing}
            className={`${
              isActive ? "border-b-4 border-transparent" : "border-b-4 border-blue-600"
            } hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg hover:cursor-pointer">
              Following
            </h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <img
                src="https://avatar.iran.liara.run/public/18"
                alt="avatar"
                className="w-[45px] h-[45px]"
              />
            </div>
            <input
              className="w-full outline-none border-none text-xl ml-2"
              type="text"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-b-gray-300">
            <div>
              <CiImageOn className="hover:cursor-pointer" size={30} />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#1D98F0] text-lg text-white px-4 py-1 border-none rounded-full hover:cursor-pointer"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
