import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { type PropsWithChildren, useMemo } from "react";
import { createErrorLink } from "./createErrorLink.ts";

const GRAPHQL_URL = "https://dab-tab-net-dxhvhphngvaaauf2.canadacentral-01.azurewebsites.net/graphql";

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
    const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();

    const client = useMemo(() => {
        const httpLink = createHttpLink({ uri: GRAPHQL_URL });

        const authLink = setContext(async (_, { headers }) => {
            const token = isAuthenticated ? await getAccessTokenSilently().catch(() => null) : null;

            return {
                headers: {
                    ...headers,
                    Authorization: token ? `Bearer ${token}` : "",
                },
            };
        });

        const errorLink = createErrorLink(() =>
            loginWithRedirect({
                appState: { returnTo: window.location.pathname },
            })
        );

        return new ApolloClient({
            link: from([errorLink, authLink, httpLink]),
            cache: new InMemoryCache(),
        });
    }, [getAccessTokenSilently, isAuthenticated, loginWithRedirect]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
