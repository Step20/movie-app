import { ObjectType, Field } from "type-graphql";
import { Movie } from "../../../types/graphQLTypes/movieType";

@ObjectType()
export class UploadResponse {
  @Field()
  success: boolean;

  @Field(() => String, { nullable: true })
  errorMessage?: string;

  @Field(() => Movie, { nullable: true })
  content?: Movie;
}
