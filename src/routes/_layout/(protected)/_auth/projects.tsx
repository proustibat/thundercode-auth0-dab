import { createFileRoute } from "@tanstack/react-router";
import ProjectsPage from "../../../../pages/projects.tsx";

export const Route = createFileRoute("/_layout/(protected)/_auth/projects")({
    loader: async () => {
        // here fetching data is possible
        const fetchSlowData: () => Promise<string[]> = () =>
            new Promise((resolve) =>
                setTimeout(() => {
                    resolve([
                        "project 1",
                        "project 2",
                        "project 3",
                        "project 4",
                        "project 5",
                        "project 6",
                        "project 7",
                    ]);
                }, 5000)
            );

        return {
            deferredSlowProjects: fetchSlowData(),
        };
    },
    component: ProjectsPage,
});
