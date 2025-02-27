import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

const Feed = () => {
  const { tweets } = useSelector((store) => store.tweet);
  return (
    <>
      <div className="w-[60%] ml-[50px] mr-[50px] border border-gray-200 p-0">
        <div>
          <CreatePost />
          {tweets?.map((tweet) => (
            <Tweet key={tweet?._id} tweet={tweet} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
