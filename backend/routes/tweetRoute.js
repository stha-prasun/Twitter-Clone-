import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { CreateTweet, deleteTweet, getAllTweets, getFollowingTweets, Like_or_Dislike } from "../controllers/tweetController.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, CreateTweet);

router.route("/delete/:id").delete(isAuthenticated, deleteTweet); //delete method deletes 

router.route("/like/:id").put(isAuthenticated, Like_or_Dislike); //put methods is used to update

router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);

router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);

export default router;
