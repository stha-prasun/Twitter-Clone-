import { USER_API_END_POINT } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await fetch(`${USER_API_END_POINT}/profile/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        dispatch(getMyProfile(data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProfile();
  }, [id]);
};

export default useGetProfile;
