import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Movie {
  @Field()
  id: string;

  @Field(() => [String])
  cast: string[];

  @Field()
  director: string;

  @Field(() => [String])
  writers: string[];

  @Field(() => [String])
  authorizedUsers: string[];

  @Field()
  thumbnailUrl: string;

  @Field()
  movieTitle: string;

  @Field()
  movieTrailerUrl: string;

  @Field()
  movieUrl: string;

  @Field()
  movieDescription: string;

  @Field()
  yearMade: string;

  @Field()
  likes: number;

  @Field()
  dateUploaded: string;

  @Field()
  genre: string;

  @Field()
  shortFilm: boolean;

  @Field(() => [String])
  tags: string[];

  @Field()
  runTime: string;

  @Field()
  maturityRating: string;

  @Field()
  contentStatus: string;

  @Field()
  isActive: boolean;
}
