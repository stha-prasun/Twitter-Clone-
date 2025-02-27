import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const { profile } = useSelector((store) => store.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bgImage, setBgImage] = useState("/sea-waves-layer-background-illustration-sea-beach-illustration-vector.jpg");

  // Custom hooks
  useGetProfile(id);

  const handleFollow = async () => {
    try {
      const res = await fetch(`${USER_API_END_POINT}/follow/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: user?._id,
        }),
      });
      const data = await res.json();
      if (data.success === true) {
        toast.success(data.message);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL
      setBgImage(imageUrl);
    }
  };

  return (
    <div className="w-[60%] ml-[50px] mr-[50px] border-t border-l border-r border-gray-200 relative">
      <div>
        <div className="flex items-center py-2">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdArrowBack size={24} />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 posts</p>
          </div>
        </div>
        <div className="relative">
          <img className="w-full h-60 object-cover" src={bgImage} alt="banner" />
          {user?._id === profile?._id && (
            <div className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-gray-700">
              <label>
                <FaCamera size={20} className="hover:cursor-pointer"/>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          )}
        </div>
        <div className="absolute top-55 ml-2 border-6 border-white rounded-full">
          <img className="h-[140px] w-[140px]" src="https://avatar.iran.liara.run/public/18" alt="profile" />
        </div>
        <div className="text-right m-4">
          {user?._id === profile?._id ? (
            <button className="px-4 py-1 rounded-full border border-gray-400 hover:cursor-pointer hover:bg-gray-200">
              Edit Profile
            </button>
          ) : (
            <button onClick={handleFollow} className="bg-black text-white px-4 py-1 rounded-full hover:cursor-pointer">
              {user?.following?.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p className="text-sm text-gray-500">@{profile?.username}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium facere nemo possimus nostrum eveniet neque soluta quaerat dolores minus accusamus!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
