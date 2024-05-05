import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field()
  userLocation: string;

  @Field()
  userBio: string;

  @Field()
  profilePictureUrl: string;

  @Field()
  dateCreated: string;

  @Field(() => [String])
  bookmarkList: string[];

  @Field()
  userType: string;
}
