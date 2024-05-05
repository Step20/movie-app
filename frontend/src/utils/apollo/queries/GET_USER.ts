import { gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      _id
      name
      email
      userLocation
      userBio
      profilePictureUrl
      dateCreated
      bookmarkList
      userType
    }
  }
`;

export default GET_USER;
