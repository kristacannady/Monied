/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email) {
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      firstName
      lastName
      email
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation createProject(
    $projectTitle: String!
    $organizationName: String!
    $projectCategory: String!
    $projectDescription: String!
    $projectGoal: Int!
  ) {
    createProject(
      projectTitle: $projectTitle
      organizationName: $organizationName
      projectCategory: $projectCategory
      projectDescription: $projectDescription
      projectGoal: $projectGoal
    ) {
      projectTitle
      organizationName
      projectCategory
      projectDescription
      projectGoal
    }
  }
`;

//TODO: Add mutation for Update Project, include Donations to it
export const ADD_DONATION = gql`
  mutation createDonation(
    $donationAmount: Int!
    $isAnonymous: Boolean!
    $commentBody: String
    $projectId: ID!
    $createdBy: String
  ) {
    createDonation(
      donationAmount: $donationAmount
      isAnonymous: $isAnonymous
      commentBody: $commentBody
      projectId: $projectId
      createdBy: $createdBy
    ) {
      donationAmount
      isAnonymous
      commentBody
      projectId
      createdBy
    }
  }
`;


