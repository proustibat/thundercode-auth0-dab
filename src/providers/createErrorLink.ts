import { onError } from "@apollo/client/link/error";

export const createErrorLink = (displayToast: (message: string) => void) =>
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

                displayToast(`[GraphQL error]: ${message} (code: ${code})`);
            }
        }

        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
            displayToast(`[Network error]: ${networkError}`);
        }
    });
