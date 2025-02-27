import React, { useState } from "react";
import { USER_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setisLoggedIn] = useState(true);

  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleClick = () => {
    setisLoggedIn(!isLoggedIn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      try {
        //login
        const res = await fetch(`${USER_API_END_POINT}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await res.json();
        if (data.success === true) {
          dispatch(getUser(data));
          toast.success(data.message);
          setemail("");
          setpassword("");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //signup
      try {
        const res = await fetch(`${USER_API_END_POINT}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            username,
            password,
          }),
        });
        const data = await res.json();
        if (data.success === true) {
          toast.success(data.message);
          setname("");
          setusername("");
          setemail("");
          setpassword("");
          setisLoggedIn(true);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="w-[300px] h-[300px]"
            src="/x-twitter-brands-solid.svg"
            alt="img"
          />
        </div>
        <div className="my-5">
          <div>
            <h1 className="font-bold text-6xl">Happening now</h1>
          </div>
          <h1 className="mt-4 mb-4 text-2xl font-bold">
            {isLoggedIn ? "Login Now" : "Join Today."}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[80%] gap-y-3"
          >
            {!isLoggedIn && (
              <>
                <input
                  className="font-semibold outline outline-gray-500 border-gray-500 px-3 py-1 rounded-full"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Name"
                />
                <input
                  className="font-semibold outline outline-gray-500 border-gray-500 px-3 py-1 rounded-full"
                  type="text"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="Userame"
                />
              </>
            )}
            <input
              className="font-semibold outline outline-gray-500 border-gray-500 px-3 py-1 rounded-full"
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="font-semibold outline outline-gray-500 border-gray-500 px-3 py-1 rounded-full"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
            />
            <button className="bg-[#1D98F0] border-none rounded-full py-2 text-white font-bold my-4 hover:cursor-pointer">
              {isLoggedIn ? "Login" : "Create Account"}
            </button>

            <h1 className="hover:cursor-default">
              {isLoggedIn
                ? "Do not have an account? "
                : "Already have an account? "}
              <span
                className="font-bold text-blue-600 hover:cursor-pointer"
                onClick={handleClick}
              >
                {isLoggedIn ? "Register Now" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
