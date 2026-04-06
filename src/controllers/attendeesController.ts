import Attendee from "../model/Attendee";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

const getAllAttendees = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const attendees = await Attendee.find().lean();
    if (!attendees?.length) {
      res.status(404).json({
        message: "No attendee found",
      });
      return;
    }
    res.json(attendees);
  },
);

const createNewAttendee = asyncHandler(
  async (req: Request, res: Response) => {},
);
const UpdateAttendee = asyncHandler(async (req: Request, res: Response) => {});
const deleteAttendee = asyncHandler(async (req: Request, res: Response) => {});
