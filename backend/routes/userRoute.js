import express from "express";
import { bookmark, follow, getBookmarks, getMyProfile, getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(isAuthenticated, logout);

router.route("/bookmark/:id").put(isAuthenticated, bookmark); //put methods is used to update

router.route("/getbookmarks/:id").get(isAuthenticated, getBookmarks);

router.route("/profile/:id").get(isAuthenticated, getMyProfile);

router.route("/getOtherUsers/:id").get(isAuthenticated, getOtherUsers);

router.route("/follow/:id").put(isAuthenticated, follow);

export default router;
