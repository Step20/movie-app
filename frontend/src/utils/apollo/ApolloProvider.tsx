import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "./useApollo";
import { ReactNode } from "react";

interface MyApolloProviderProps {
  children: ReactNode;
}

const MyApolloProvider: React.FC<MyApolloProviderProps> = ({ children }) => {
  const client = useApollo();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default MyApolloProvider;
