import { type AppState, Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { useState } from "react";
import { appRouter } from "./router";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

const App = () => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    audience,
                }}
                onRedirectCallback={(appState: AppState | undefined) => {
                    appRouter.history.push(appState?.returnTo || window.location.pathname);
                }}
            >
                <RouterProvider router={appRouter} />
            </Auth0Provider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
