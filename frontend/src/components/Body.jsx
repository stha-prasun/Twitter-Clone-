import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Feed from "./Feed";
import Profile from "./Profile";
import Bookmarks from "./Bookmarks";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Home/>,
      children:[
        {
        path:"/",
        element:<Feed/>
      },
      {
        path:"/profile/:id",
        element:<Profile/>
      }
    ],
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/bookmarks",
      element:<Bookmarks/>
    },
  ])
  return (
    <>
      <div>
        <RouterProvider router={appRouter}/>
      </div>
    </>
  );
};

export default Body;
