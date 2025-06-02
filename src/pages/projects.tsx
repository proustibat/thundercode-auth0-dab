import { useQuery } from "@apollo/client";
import EmptyProjects from "../components/emptyProjects.tsx";
import PageTitle from "../components/pageTitle.tsx";
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
                            <div
                                key={item.id}
                                className={`${index !== 0 ? "pt-5" : ""} pb-5 w-full ${index !== data.projects.items.length - 1 ? "border-b border-gray-300" : ""}`}
                            >
                                <h3 className="text-base font-semibold ">{item.name}</h3>
                                <p className="mt-2 max-w-4xl text-sm">{item.description}</p>
                                <p className="mt-2 max-w-4xl text-sm">
                                    {JSON.parse(item.tech).length &&
                                        JSON.parse(item.tech).map((t: string) => (
                                            <span
                                                key={t}
                                                className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-slate-600 ring-inset m-0.5"
                                            >
                                                <svg
                                                    viewBox="0 0 6 6"
                                                    aria-hidden="true"
                                                    className="size-1.5 dark:fill-slate-300 fill-sky-900"
                                                >
                                                    <circle r={3} cx={3} cy={3} />
                                                </svg>
                                                {t}
                                            </span>
                                        ))}
                                </p>
                            </div>
                        ))}
                </section>
            )}
        </>
    );
};

export default ProjectsPage;
