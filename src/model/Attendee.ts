import mongoose, { Schema, Document } from "mongoose";
import { IAttendee } from "../types";
import AutoIncrement from "mongoose-sequence";

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
  },
  {
    timestamps: true,
  },
);

attendeeSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 1,
});

export default mongoose.model<IAttendeeDocument>("Attendee", attendeeSchema);
