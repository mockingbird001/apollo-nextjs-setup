import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphiclink() {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("./schema");
    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require("@apollo/client/link/http");
    return new HttpLink({ uri: "/api/graphql" });
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphiclink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClirnt = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClirnt.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClirnt;
  apolloClient = apolloClient ?? _apolloClirnt;

  return apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
