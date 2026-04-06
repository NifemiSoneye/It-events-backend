import mongoose, { Schema, Document } from "mongoose";

import { IAdmin } from "../types";

interface IAdminDocument extends IAdmin, Document {}

const adminSchema = new Schema<IAdminDocument>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: [String],
    default: [],
  },
});

export default mongoose.model<IAdminDocument>("Admin", adminSchema);
