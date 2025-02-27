import { TWEET_API_END_POINT } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);
  const { isActive } = useSelector((store) => store.tweet);

  const fetchMyTweets = async () => {
    try {
      const res = await fetch(`${TWEET_API_END_POINT}/alltweets/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      dispatch(getAllTweets(data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  const displayFollowing = async () => {
    try {
      const res = await fetch(`${TWEET_API_END_POINT}/followingtweets/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      dispatch(getAllTweets(data?.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchMyTweets();
    } else {
      displayFollowing();
    }
  }, [id, refresh, isActive]);
};

export default useGetMyTweets;
