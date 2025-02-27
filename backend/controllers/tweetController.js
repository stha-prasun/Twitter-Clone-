import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

//create tweet
export const CreateTweet = async (req, res) => {
  try {
    const { description, id } = req.body;

    if (!description || !id) {
      return res.status(401).json({
        message: "Feilds are required!",
        success: false,
      });
    }

    const user = await User.findById(id).select("-password");

    await Tweet.create({
      description,
      userID: id,
      userDetails: user,
    });

    return res.status(201).json({
      message: "Tweet created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//delete tweet
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;

    await Tweet.findByIdAndDelete(id);

    return res.status(201).json({
      message: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//like or dislike
export const Like_or_Dislike = async (req, res) => {
  try {
    const loggedInUserID = req.body.id;
    const tweetID = req.params.id;

    const tweet = await Tweet.findById(tweetID);

    if (tweet.like.includes(loggedInUserID)) {
      //dislike
      await Tweet.findByIdAndUpdate(tweetID, {
        $pull: { like: loggedInUserID },
      });
      return res
        .status(201)
        .json({ message: "Tweet Disliked", success: true });
    } else {
      //like
      await Tweet.findByIdAndUpdate(tweetID, {
        $push: { like: loggedInUserID },
      });
      return res
        .status(201)
        .json({ message: "Tweet Liked", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const loggedInUserTweets = await Tweet.find({ userID: id });

    const followingUsersTweet = await Promise.all(
      loggedInUser.following.map(async (otherUsersID) => {
        return await Tweet.find({ userID: otherUsersID });
      })
    );
    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUsersTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);

    const followingUsersTweet = await Promise.all(
      loggedInUser.following.map(async (otherUsersID) => {
        return await Tweet.find({ userID: otherUsersID });
      })
    );
    return res.status(200).json({
      tweets: [].concat(...followingUsersTweet),
    });
  } catch (error) {
    console.log(error);
  }
};
