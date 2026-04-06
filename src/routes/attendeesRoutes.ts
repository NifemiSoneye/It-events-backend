import express, { Request, Response } from "express";
const router = express.Router();
import {
  getAllAttendees,
  createNewAttendee,
  updateAttendee,
  deleteAttendee,
  getAnalytics,
} from "../controllers/attendeesController";

router.get("/analytics", getAnalytics);
router.route("/").get(getAllAttendees).post(createNewAttendee);

router.route("/:id").patch(updateAttendee).delete(deleteAttendee);

export default router;
