import { createApolloProvider } from "@vue/apollo-option";
import { apolloClient } from "./client";

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
});
