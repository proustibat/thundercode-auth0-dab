import { type AppState, Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { useState } from "react";
import { ApolloWrapper } from "./providers/ApolloWrapper.tsx";
import { appRouter } from "./router";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const organization = import.meta.env.VITE_AUTH0_ORGANIZATION_ID;

function InnerApp() {
    const auth = useAuth0();
    return (
        <ApolloWrapper>
            <RouterProvider router={appRouter} context={{ auth }} />
        </ApolloWrapper>
    );
}

const App = () => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                authorizationParams={{
                    audience,
                    organization,
                }}
                onRedirectCallback={(appState: AppState | undefined) => {
                    appRouter.history.push(appState?.returnTo || window.location.pathname);
                }}
            >
                <InnerApp />
            </Auth0Provider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
