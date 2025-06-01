export interface Project {
    id: string;
    name: string;
    description?: string;
    tech: string;
}

export interface GetProjectsData {
    projects: {
        items: Project[];
    };
}
export interface GetProjectsVars {
    orgId?: string;
}
