import { useQuery } from "@apollo/client";
import { Outlet } from "@tanstack/react-router";
import { GET_PROJECTS } from "../graphql/projects.ts";
import type { GetProjectsData, GetProjectsVars } from "../graphql/types.ts";
import { useAuthClaims } from "../hooks/useAuthClaims.ts";

const ProjectsPage = () => {
    const { claims } = useAuthClaims();

    const { data, loading, error } = useQuery<GetProjectsData, GetProjectsVars>(GET_PROJECTS, {
        variables: { orgId: claims?.org_id },
        skip: !claims?.org_id,
    });

    return (
        <div>
            <h1>Projects</h1>
            {loading && <p>Loading projects...</p>}
            {error && <p>Error while requesting projects: {error.message}</p>}
            {!loading && data && (
                <div>
                    {data.projects.items.map((item) => (
                        <div key={item.id}>
                            <h2>{item.name}</h2>
                            <h3>{item.description}</h3>
                            {JSON.parse(item.tech).length && (
                                <>
                                    <p>Stack:</p>
                                    <ul>
                                        {JSON.parse(item.tech).map((t: string) => (
                                            <li key={t}>{t}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <hr />
                        </div>
                    ))}
                </div>
            )}
            <Outlet />
        </div>
    );
};

export default ProjectsPage;
