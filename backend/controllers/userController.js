import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Tweet } from "../models/tweetSchema.js";

//register
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "All feilds are required!",
        success: false,
      });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(401).json({
        message: "Username already taken",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Feilds cannot be left empty!",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect Email or Password!",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Incorrect Email or Password!",
        success: false,
      });
    }

    const tokenData = {
      userID: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.name}!`,
        _id: user._id,
        username: user.username,
        name: user.name,
        following: user.following,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

//logout
export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//bookmark
export const bookmark = async (req, res) => {
  try {
    const loggedInUserID = req.body.id;
    const tweetID = req.params.id;

    const user = await User.findById(loggedInUserID);

    if (user.bookmarks.includes(tweetID)) {
      //remove bookmark
      await User.findByIdAndUpdate(loggedInUserID, {
        $pull: { bookmarks: tweetID },
      });
      return res
        .status(201)
        .json({ message: "Bookmark removed!", success: true });
    } else {
      //add bookmark
      await User.findByIdAndUpdate(loggedInUserID, {
        $push: { bookmarks: tweetID },
      });
      return res
        .status(201)
        .json({ message: "Bookmark added!", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const loggedInUserID = req.params.id;

    const user = await User.findById(loggedInUserID);

    const tweets = await Tweet.find({ _id: { $in: user.bookmarks } });

    return res.status(201).json({
      tweets
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    return res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );

    if (otherUsers.length === 0) {
      return res.status(401).json({
        message: "Currently, there are no other users",
      });
    } else {
      return res.status(201).json({
        otherUsers,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const follow = async (req, res) => {
  try {
    const loggedInUserID = req.body.id;
    const toFollowID = req.params.id;

    const loggedInUser = await User.findById(loggedInUserID);
    const toFollow = await User.findById(toFollowID);

    if (!toFollow.followers.includes(loggedInUserID)) {
      //follow
      await toFollow.updateOne({ $push: { followers: loggedInUserID } });
      await loggedInUser.updateOne({ $push: { following: toFollowID } });

      return res.status(201).json({
        message: `Following ${toFollow.name}`,
        success: true,
      });
    } else {
      //unfollow
      await toFollow.updateOne({ $pull: { followers: loggedInUserID } });
      await loggedInUser.updateOne({ $pull: { following: toFollowID } });

      return res.status(201).json({
        message: `Unfollowed ${toFollow.name}`,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
