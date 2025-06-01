import { onError } from "@apollo/client/link/error";

export const createErrorLink = (loginWithRedirect: () => void) =>
    onError(({ graphQLErrors, networkError }) => {
        console.group("🔥 Apollo Error Link");
        console.log("GraphQL errors:", graphQLErrors);
        console.log("Network error:", networkError);
        console.groupEnd();
        if (graphQLErrors) {
            for (const err of graphQLErrors) {
                const code = err.extensions?.code;
                const message = err.message;

                console.warn(`[GraphQL error]: ${message} (code: ${code})`);

                if (code === "FORBIDDEN" || code === "AUTH_NOT_AUTHENTICATED") {
                    loginWithRedirect();
                }
            }
        }

        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
        }
    });
