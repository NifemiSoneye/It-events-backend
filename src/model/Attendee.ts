import mongoose, { Schema, Document } from "mongoose";
import { IAttendee } from "../types";

interface IAttendeeDocument extends IAttendee, Document {}

const attendeeSchema = new Schema<IAttendeeDocument>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    ticket: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IAttendeeDocument>("Attendee", attendeeSchema);
