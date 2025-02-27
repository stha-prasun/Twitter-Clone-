import { USER_API_END_POINT } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";


const useGetOtherUsers = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await fetch(`${USER_API_END_POINT}/getOtherUsers/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        dispatch(getOtherUsers(data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProfile();
  }, []);
};

export default useGetOtherUsers;
