import { Await, Outlet } from "@tanstack/react-router";
import { Route } from "../routes/_layout/(protected)/_auth/projects.tsx";

const ProjectsPage = () => {
    const { deferredSlowProjects } = Route.useLoaderData();
    return (
        <div>
            <Await promise={deferredSlowProjects} fallback={<div>Loading data from simulated database...</div>}>
                {(projects) => {
                    return (
                        <div>
                            {projects.map((project) => (
                                <li key={project}>{project}</li>
                            ))}
                        </div>
                    );
                }}
            </Await>
            <Outlet />
        </div>
    );
};

export default ProjectsPage;
