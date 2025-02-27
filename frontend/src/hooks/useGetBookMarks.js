import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { USER_API_END_POINT } from "../utils/constants";
import { getBookmark_List } from "../redux/userSlice";

const useGetBookmarks = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch(
          `${USER_API_END_POINT}/getbookmarks/${user._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        dispatch(getBookmark_List(data.tweets));
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);
};

export default useGetBookmarks;
