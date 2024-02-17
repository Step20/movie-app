import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

function createApolloClient() {
  const uri =
    process.env.ENVIRONMENT === "PRODUCTION"
      ? "https://movie-app/graphql"
      : "http://10.0.2.2:4000/graphql";
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
