import { Resolver, Query, Arg } from "type-graphql";
import { MovieModel } from "../../../models/Movie";
import { Movie } from "../../../types/graphQLTypes/movieType";

@Resolver()
export class GetMovieResolver {
  @Query(() => Movie, { nullable: true })
  async getMovie(@Arg("movieId") movieId: string): Promise<Movie | null> {
    try {
      const movie = await MovieModel.findById(movieId);
      return movie;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
}
