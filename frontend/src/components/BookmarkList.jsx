import React from "react";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { MdDeleteOutline } from "react-icons/md";

const BookmarkList = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLike = async (tweet_id) => {
    try {
      const res = await fetch(`${TWEET_API_END_POINT}/like/${tweet_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: user?._id,
        }),
      });
      const data = await res?.json();
      if (data?.success === true) {
        toast.success(data?.message);
        dispatch(getRefresh());
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (tweet_id) => {
    try {
      const res = await fetch(`${TWEET_API_END_POINT}/delete/${tweet_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res?.json();
      if (data?.success === true) {
        toast.success(data?.message);
        dispatch(getRefresh());
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async (tweet_id) => {
    try {
      const res = await fetch(`${USER_API_END_POINT}/bookmark/${tweet_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: user?._id,
        }),
      });
      const data = await res?.json();
      if (data.success === true) {
        toast.success(data?.message);
        dispatch(getRefresh());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-b border-b-gray-200">
      <div className="flex p-4">
        <img
          src="https://avatar.iran.liara.run/public/18"
          alt="avatar"
          className="w-[45px] h-[45px]"
        />
        <div className="ml-2 w-full">
          <div className="flex items-center">
            <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
            <p className="text-gray-500 text-sm ml-1">
              {`@${tweet?.userDetails[0]?.username}`} .1m
            </p>
          </div>
          <div>
            <p>{tweet?.description}</p>
          </div>
          <div className="flex justify-between my-3">
            <div className="flex items-center">
              <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                <FaRegComment size={20} />
              </div>
              <p>0</p>
            </div>
            <div className="flex items-center">
              <div
                onClick={() => handleLike(tweet?._id)}
                className="p-2 hover:bg-pink-200 rounded-full cursor-pointer"
              >
                <CiHeart size={24} />
              </div>
              <p>{tweet?.like?.length}</p>
            </div>
            <div className="flex items-center">
              <div
                onClick={() => handleBookmark(tweet?._id)}
                className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer"
              >
                <CiBookmark size={24} />
              </div>
            </div>
            {user?._id === tweet?.userID && (
              <div className="flex items-center">
                <div
                  onClick={() => handleDelete(tweet?._id)}
                  className="p-2 hover:bg-red-400 rounded-full cursor-pointer"
                >
                  <MdDeleteOutline size={24} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkList;
