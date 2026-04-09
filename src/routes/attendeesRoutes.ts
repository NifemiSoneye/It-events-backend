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
router.use(verifyJWT);
router.get("/analytics", getAnalytics);
router.route("/").get(getAllAttendees).post(createNewAttendee);

router.route("/:id").patch(updateAttendee).delete(deleteAttendee);

export default router;
