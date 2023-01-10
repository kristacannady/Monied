/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

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
        donations {
          _id
          donationAmount
          isAnonymous
          commentBody
          createdBy
        }
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
      donations {
        _id
        donationAmount
        isAnonymous
        commentBody
        createdBy
      }
    }
  }
`;

// export const QUERY_PROJECTS = gql`
//   query projects($username: String) {
//     getProjects(username: $username) {
//       _id
//       projectTitle
//       organizationName
//       projectCategory
//       projectDescription
//       projectGoal
//     }
//   }
// `;
