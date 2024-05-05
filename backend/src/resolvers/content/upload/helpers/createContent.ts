import Movie from "../../../../models/Movie";

type Args = {
  userId: string;
  movieTitle: string;
};

const createContent = async ({ userId, movieTitle }: Args) => {
  const variables = {
    userId,
    authorizedUsers: [userId],
    movieTitle,
    contentStatus: "pending",
    isActive: false,
    shortFilm: false,
    cast: [],
    writers: [],
    tags: [],
  };

  const newContent = await Movie.create({ ...variables });

  await newContent.save();
  return newContent;
};

export default createContent;
