import { GET_PROJECTS } from "../graphql/projects.ts";
import { organization_id } from "./claims.ts";

const resultQuerySecretsWithRightOrg = {
    data: {
        secrets: {
            items: [
                {
                    id: 1,
                    name: "Mocked secret 1",
                    description: "bla bli blou",
                    organization_id,
                    tech: "['youpi', 'yep]",
                },
                {
                    id: 2,
                    name: "Mocked secret 2",
                    description: "bla bli blou",
                    organization_id,
                    tech: "['hello', 'world]",
                },
            ],
        },
    },
};

export const apolloMocks = [
    {
        request: {
            query: GET_PROJECTS,
            variables: { orgId: organization_id },
        },
        result: resultQuerySecretsWithRightOrg,
    },
];

export const apolloMocksWithError = [
    {
        request: {
            query: GET_PROJECTS,
            variables: { orgId: organization_id },
        },
        error: new Error("Oopsie it's a mock error"),
    },
];
