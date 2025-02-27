import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
    bookmark_list: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    getBookmark_List: (state, action) => {
      state.bookmark_list = action.payload;
    },
    followingUpdate: (state, action) => {
      //unfollow
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter((itemID) => {
          return itemID !== action.payload;
        });
      } else {
        //follow
        state.user.following.push(action.payload);
      }
    },
  },
});

export default userSlice.reducer;
export const { getUser, getOtherUsers, getMyProfile, followingUpdate, getBookmark_List } =
  userSlice.actions;
