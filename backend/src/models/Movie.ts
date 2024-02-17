import mongoose, { Document, Schema, Types } from "mongoose";

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
}

const fieldSchema = new mongoose.Schema<Field>({
  key: String,
  value: String,
});

const MovieSchema = new mongoose.Schema<MovieType>({
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
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  writers: {
    type: [String],
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
    unique: true,
  },
  movieDescription: {
    type: String,
    required: true,
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
    required: true,
  },
  likes: {
    type: Number,
    min: 0,
    required: true,
  },
  dateUploaded: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  shortFilm: {
    type: Boolean,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  runTime: {
    type: String,
    required: true,
  },
  maturityRating: {
    type: String,
    required: true,
  },
});

// Create a virtual `id` field and use it to get the `_id` value as a string.
MovieSchema.virtual("id").get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serializable.
MovieSchema.set("toJSON", {
  virtuals: true,
});

const Movie = mongoose.model<MovieType>("Movie", MovieSchema);

export default Movie;
