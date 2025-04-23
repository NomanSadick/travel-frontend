import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string; // Optional for Google users
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
