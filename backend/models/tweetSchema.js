import mongoose from "mongoose";

const tweetModel = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    like: {
      type: Array,
      default: [],
    },
    userDetails: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetModel);
