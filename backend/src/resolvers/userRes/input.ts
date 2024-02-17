import { InputType, Field } from "type-graphql";

@InputType()
export class GetUserInput {
  @Field()
  userId: string;
}
