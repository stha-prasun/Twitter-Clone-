import React, { useEffect } from "react";
import LeftSideBar from "./LeftSideBar";
import RightSiderBar from "./RightSiderBar";
import BookmarkList from "./BookmarkList";
import { useSelector } from "react-redux";
import useGetBookMarks from "../hooks/useGetBookMarks";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const navigate = useNavigate();
  const { user, otherUsers, bookmark_list } = useSelector((store) => store.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  //custom hook
  useGetBookMarks();
  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto mt-4">
        <LeftSideBar />
        <div className="w-[60%] ml-[50px] mr-[50px] border border-gray-200 p-0">
          {Array.isArray(bookmark_list) && bookmark_list.length > 0 ? (
            bookmark_list.map((tweet) => (
              <BookmarkList key={tweet._id} tweet={tweet} />
            ))
          ) : (
            <p>No bookmarks found.</p>
          )}
        </div>
        <RightSiderBar otherUsers={otherUsers} />
      </div>
    </>
  );
};

export default Bookmarks;
