import express, { Request, Response } from "express";
import verifyJWT from "../middleware/verifyJWT";
const router = express.Router();
import {
  getAllAttendees,
  createNewAttendee,
  updateAttendee,
  deleteAttendee,
  getAnalytics,
} from "../controllers/attendeesController";
router.route("/").get(getAllAttendees);
router.route("/").post(createNewAttendee);
router.use(verifyJWT);
router.get("/analytics", getAnalytics);

router.route("/:id").patch(updateAttendee).delete(deleteAttendee);

export default router;
