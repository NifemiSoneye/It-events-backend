import express from "express";
import loginLimiter from "../middleware/loginLimiter";
import { validateLogin } from "../middleware/validateLogin";
import {
  handleLogin,
  handleRefresh,
  handleLogout,
} from "../controllers/authController";
const router = express.Router();

router.route("/").post(loginLimiter, validateLogin, handleLogin);
router.route("/refresh").get(handleRefresh);
router.route("/logout").post(handleLogout);

export default router;
