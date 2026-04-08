import express from "express";
import {
  handleLogin,
  handleRefresh,
  handleLogout,
} from "../controllers/authController";
const router = express.Router();

router.route("/").post(handleLogin);
router.route("/refresh").get(handleRefresh);
router.route("/logout").post(handleLogout);
