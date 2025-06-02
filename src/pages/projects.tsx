import { useQuery } from "@apollo/client";
import EmptyProjects from "../components/emptyProjects.tsx";
import PageTitle from "../components/pageTitle.tsx";
import ProjectItem from "../components/projectItem.tsx";
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
        <>
            <div className="py-5">
                <PageTitle
                    title="Projects page"
                    subtitle="This is a protected page, you see it only because you're logged in"
                />
            </div>
            {!loading && !data?.projects.items?.length && !error && <EmptyProjects />}
            {!error && (
                <section className="dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 rounded-xl p-10 mt-5 dark:text-slate-300 text-slate-950 shadow-sm">
                    {loading && <p>Loading projects...</p>}
                    {!loading &&
                        data &&
                        data.projects.items.map((item, index) => (
                            <ProjectItem
                                key={item.id}
                                isFirst={index === 0}
                                isLast={index === data.projects.items.length - 1}
                                {...item}
                            />
                        ))}
                </section>
            )}
        </>
    );
};

export default ProjectsPage;
