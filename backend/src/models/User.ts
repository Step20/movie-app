import { Schema, model } from "mongoose";
import validator from "validator";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${month}/${day}/${year}`;

export interface UserType extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  userLocation: string;
  userBio: string;
  profilePictureUrl: string;
  dateCreated: string;
  bookmarkList: string[];
  userType: string;
}

const userSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [8, "Password is shorter than the minimum length(8)"],
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required!"],
    },
    userLocation: {
      type: String,
      required: [true, "location is required!"],
    },
    userBio: {
      type: String,
      default: "Upcoming Film Director",
      required: true,
    },
    profilePictureUrl: {
      type: String,
      default: "/assets/profilePic.png",
      required: true,
    },
    dateCreated: {
      type: String,
      default: formattedDate,
      required: true,
    },
    bookmarkList: {
      type: [String],
      required: true,
    },
    userType: {
      type: String,
      default: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model<UserType>("User", userSchema);
