import { gql } from "@apollo/client";

const UPLOAD_CONTENT_MUTATION = gql`
  mutation Upload($data: UploadInput!) {
    upload(data: $data) {
      content {
        id
        userId
        authorizedUsers
        movieTitle
        dateUploaded
        isActive
        contentStatus
        shortFilm
        likes
      }
      jwt
      success
      errorMessage
    }
  }
`;

export default REGISTER_MUTATION;
