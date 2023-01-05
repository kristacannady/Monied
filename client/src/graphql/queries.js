/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const QUERY_CURRENT_USER = gql`
query currentUser {
  getCurrentUser {
    _id,
    email,
    firstName,
    lastName
  }
}
`;

export const QUERY_PROJECT = gql`
query project($id : ID!){
  project(_id:$id){
    _id
    projectTitle
    organizationName
    projectCategory
    projectDescription
    projectGoal
  }
}
`;

export const QUERY_PROJECTS = gql`
query projects($username:String){
  projects(username:$username){
    _id
    projectTitle
    organizationName
    projectCategory
    projectDescription
    projectGoal
  }
}
`;


