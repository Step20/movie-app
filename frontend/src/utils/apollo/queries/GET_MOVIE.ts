import { gql } from "@apollo/client";

const GET_MOVIE = gql`
  query GetMovie($movieId: String!) {
    getMovie(movieId: $movieId) {
      id
      cast
      director
      writers
      authorizedUsers
      thumbnailUrl
      movieTitle
      movieTrailerUrl
      movieUrl
      movieDescription
      yearMade
      likes
      dateUploaded
      genre
      shortFilm
      tags
      runTime
      maturityRating
      contentStatus
      isActive
    }
  }
`;

export default GET_MOVIE;
