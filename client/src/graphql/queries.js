/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const QUERY_CURRENT_USER = gql`
  query currentUser {
    getCurrentUser {
      _id
      email
      firstName
      lastName
      projects {
        _id
        projectTitle
        organizationName
        projectCategory
        projectDescription
        projectGoal
      }
    }
  }
`;

export const QUERY_PROJECT = gql`
  query project($id: ID!) {
    getProjectById(_id: $id) {
      _id
      projectTitle
      organizationName
      projectCategory
      projectDescription
      projectGoal
    }
  }
`;

export const QUERY_PROJECT_CATEGORY = gql`
  query getProjectByCategory($projectCategory: String!) {
    getProjectByCategory(projectCategory: $projectCategory) {
      _id
      projectTitle
      organizationName
      projectCategory
      projectDescription
      projectGoal
    }
  }
`;
