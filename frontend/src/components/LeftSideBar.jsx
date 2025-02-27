import React from "react";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

const LeftSideBar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const res = await fetch(`${USER_API_END_POINT}/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res?.json();
      if (data?.success === true) {
        toast?.success(data?.message);
        navigate("/login");
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getMyProfile(null));
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-[20%]">
        <div>
          <img
            src="./x-twitter-brands-solid.svg"
            alt="logo"
            className="h-[35px] ml-5"
          />
        </div>

        <div className="my-5">
          <Link
            to="/"
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <CiHome size="24px" />
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <CiHashtag size="24px" />
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <IoIosNotificationsOutline size="24px" />
            <h1 className="font-bold text-lg ml-2">Notification</h1>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <CiUser size="24px" />
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>
          <Link to='/bookmarks' className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <CiBookmark size="24px" />
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </Link>

          {/* Buttons */}
          <div
            onClick={handleLogOut}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <IoIosLogOut size="24px" />
            <h1 className="font-bold text-lg ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none text-base bg-[#1D98F0] w-full rounded-full text-white font-bold hover:cursor-pointer">
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
