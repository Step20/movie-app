import { ObjectType, Field } from "type-graphql";
import { Movie } from "./movieType";

@ObjectType()
export class GetMovieResponse {
  @Field(() => Movie, { nullable: true })
  movie?: Movie;

  @Field({ nullable: true })
  errorMessage?: string;
}
