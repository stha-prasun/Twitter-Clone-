import React, { useEffect } from "react";
import LeftSideBar from "./LeftSideBar";
import RightSiderBar from "./RightSiderBar";
import { Outlet, useNavigate } from "react-router-dom";
import useGetOtherUsers from "../hooks/useGetOtherUser";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

const Home = () => {
  const navigate = useNavigate();
  const { user, otherUsers } = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  //custom hook
  useGetOtherUsers(user?._id);
  useGetMyTweets(user?._id);

  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto mt-4">
        <LeftSideBar />
        <Outlet />
        <RightSiderBar otherUsers={otherUsers} />
      </div>
    </>
  );
};

export default Home;
