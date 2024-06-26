import { InputType, Field } from "type-graphql";

@InputType()
export class GetMovieInput {
  @Field()
  movieId: string;
}
