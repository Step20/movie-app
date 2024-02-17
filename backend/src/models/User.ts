import { Schema, model } from "mongoose";
//import validator from "validator";

export interface UserType extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  userLocation: string;
}

const userSchema = new Schema<UserType>({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    lowercase: true,
    //validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    //minLength: [8, "Password is shorter than the minimum length(8)"],
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
});

export const UserModel = model<UserType>("User", userSchema);
