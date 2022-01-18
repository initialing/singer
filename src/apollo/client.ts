import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
    cache,
    uri: "http://localhost:3000/singer",
});
