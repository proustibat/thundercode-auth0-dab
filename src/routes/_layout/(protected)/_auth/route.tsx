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
