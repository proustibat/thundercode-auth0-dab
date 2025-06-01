import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects($orgId: String!) {
    projects(filter: { organization_id: { eq: $orgId } }) {
      items {
        id
        name
        organization_id
        description
        tech
      }
    }
  }
`;
