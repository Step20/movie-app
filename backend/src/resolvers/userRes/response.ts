import { ObjectType, Field } from "type-graphql";
import { User } from "./userType";

@ObjectType()
export class GetUserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  errorMessage?: string;
}
