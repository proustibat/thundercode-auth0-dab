import { createRouter } from "@tanstack/react-router";
import notFoundPage from "./pages/notFoundPage.tsx";
import { routeTree } from "./routeTree.gen";

export const appRouter = createRouter({
    routeTree,
    defaultNotFoundComponent: notFoundPage,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof appRouter;
    }
}
