// @todo have a look at https://developer.auth0.com/resources/guides/spa/react/basic-authentication#add-route-guards-to-react
// to do it in a different way?

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/(protected)/_auth")({
    beforeLoad: ({ context, location }) => {
        if (!context.auth?.isLoading && !context.auth?.isAuthenticated) {
            throw redirect({
                to: "/",
                search: {
                    redirect: location.href,
                },
            });
        }
    },
});
