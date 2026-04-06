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

const createNewAttendee = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, phoneNumber } = req.body;
  if (!username || !email || !phoneNumber) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  const duplicate = await Attendee.findOne({ email }).lean().exec();

  if (duplicate) {
    res.status(409).json({
      message: "Duplicate email",
    });
  }

  const attendeeObject = { username, email, phoneNumber };

  const attendee = await Attendee.create(attendeeObject);

  if (attendee) {
    res.status(201).json({ message: `New attendee ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid attendee data recieved" });
  }
});
const UpdateAttendee = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, phoneNumber } = req.body;

  if (!id || !username || !email || !phoneNumber) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  const attendee = await Attendee.findById(id).exec();

  if (!attendee) {
    res.status(404).json({
      message: "Attendee not found",
    });
    return;
  }

  const duplicate = await Attendee.findOne({ email }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    res.status(409).json({
      message: "Duplicate email",
    });
  }

  attendee.username = username;
  attendee.email = email;
  attendee.phoneNumber = phoneNumber;

  const updatedAttendee = await attendee.save();

  res.json({ message: `${updatedAttendee.username} updated` });
});
const deleteAttendee = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Attendee ID required",
    });
  }

  const attendee = await Attendee.findById(id).exec();

  if (!attendee) {
    res.status(404).json({
      message: "Attendee not found",
    });
  }

  const result = await attendee?.deleteOne();

  res.json(`Attendee ${attendee?.username} with ID ${id} deleted`);
});

const getAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const totalCount = await Attendee.countDocuments();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const todayCount = await Attendee.countDocuments({
    createdAt: { $gte: startOfToday },
  });

  const latestAttendee = await Attendee.findOne()
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    totalCount,
    todayCount,
    latestAttendee,
  });
});
export { getAllAttendees, createNewAttendee, UpdateAttendee, deleteAttendee };
