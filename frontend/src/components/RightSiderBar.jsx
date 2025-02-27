import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const RightSiderBar = ({ otherUsers }) => {
  return (
    <>
      <div className="w-[25%]">
        <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none border-none w-full">
          <CiSearch size={20} />
          <input
            className="bg-transparent outline-none px-2"
            placeholder="Search"
            type="text"
          />
        </div>

        <div className="p-4 my-4 bg-gray-100 rounded-2xl">
          <h1 className="font-bold text-lg">Who to follow</h1>
          {otherUsers?.map((user) => {
            return (
              <div key={user._id} className="flex items-center justify-between my-3">
                <div className="flex">
                  <img
                    className="h-[45px] w-[45px]"
                    src="https://avatar.iran.liara.run/public/18"
                    alt="avatar"
                  />
                  <div className="ml-2">
                    <h1 className="font-bold">{user?.name}</h1>
                    <p className="text-sm">{`@${user?.username}`}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className="px-4 py-1 bg-black text-white rounded-full hover:cursor-pointer">
                      Profile
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RightSiderBar;
