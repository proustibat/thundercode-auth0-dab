import { createRouter } from "@tanstack/react-router";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { routeTree } from "./routeTree.gen";

export const appRouter = createRouter({
    routeTree,
    defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof appRouter;
    }
}
