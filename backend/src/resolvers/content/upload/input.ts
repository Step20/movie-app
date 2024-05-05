import { InputType, Field } from "type-graphql";

@InputType()
export class UploadInput {
  @Field()
  userId: string;

  @Field()
  movieTitle: string;

  @Field()
  token: string;
}
