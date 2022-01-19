import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
    from,
} from "@apollo/client/core";

// import {  } from "@apollo/client/link/context"

const storage: Storage = localStorage;

const httpLink = new HttpLink({ uri: "http://localhost:3000/singer" });

const cache = new InMemoryCache({
    typePolicies: {
        AccountModel: {
            keyFields: ["_id"],
        },
    },
});

const authHeader = new ApolloLink((operation, forward) => {
    const auth: Record<string, string> = {};
    if (storage.getItem("singer-token")) {
        auth.Authorization = "Bearer " + storage.getItem("singer-token");
    }
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            ...auth,
        },
    }));

    return forward(operation).map((response) => {
        const {
            response: { headers },
        } = operation.getContext();
        if (headers.get("access-token")) {
            storage.setItem("singer-token", headers.get("access-token"));
        }
        return response;
    });
});

export const apolloClient = new ApolloClient({
    cache,
    link: from([authHeader, httpLink]),
});
