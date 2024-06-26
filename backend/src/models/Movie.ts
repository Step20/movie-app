import mongoose, { Document, Schema, Types } from "mongoose";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${month}/${day}/${year}`;

export interface MovieType extends Document {
  id: string;
  userId: string;
  cast: string[];
  director: string;
  writers: string[];
  authorizedUsers: string[];
  thumbnailUrl: string;
  movieTitle: string;
  movieTrailerUrl: string;
  movieUrl: string;
  movieDescription: string;
  yearMade: string;
  likes: number;
  dateUploaded: string;
  genre: string;
  shortFilm: boolean;
  tags: string[];
  runTime: string;
  maturityRating: string;
  contentStatus: string;
  isActive: boolean;
}

const MovieSchema = new mongoose.Schema<MovieType>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: "User",
      required: true,
    },
    authorizedUsers: [
      {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    cast: {
      type: [String],
      //required: true,
    },
    director: {
      type: String,
      // required: true,
    },
    writers: {
      type: [String],
      //required: true,
    },
    movieTitle: {
      type: String,
      required: true,
      unique: true,
    },
    movieDescription: {
      type: String,
      //required: true,
    },
    movieUrl: {
      type: String,
      default: "/assets/movie.mp4",
    },
    movieTrailerUrl: {
      type: String,
      default: "/assets/trailer.mp4",
    },
    thumbnailUrl: {
      type: String,
      default: "/assets/thumbnail.png",
    },
    yearMade: {
      type: String,
      default: formattedDate,
      required: true,
    },
    likes: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
    dateUploaded: {
      type: String,
      default: formattedDate,
      required: true,
    },
    genre: {
      type: String,
      //required: true,
    },
    shortFilm: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      //required: true,
    },
    runTime: {
      type: String,
      //required: true,
    },
    maturityRating: {
      type: String,
      //required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    contentStatus: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

// Create a virtual `id` field and use it to get the `_id` value as a string.
MovieSchema.virtual("id").get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serializable.
MovieSchema.set("toJSON", {
  virtuals: true,
});

export const MovieModel = mongoose.model<MovieType>("Movie", MovieSchema);
