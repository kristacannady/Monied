const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    isAuthenticated: Boolean
    projects: [Project]
    donations: [Donation]
    favorites: [Project]
  }

  type Project {
    _id: ID
    projectTitle: String
    organizationName: String
    projectCategory: String
    projectDescription: String
    projectGoal: Int
    donations: [Donation]
  }

  type Donation {
    _id: ID
    donationAmount: Int
    isAnonymous: Boolean
    commentBody: String
    createdBy: String
    project: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getCurrentUser: User
    getProjectById(_id: ID): Project
    getDonationById(userId: ID, projectId: ID): [Donation]
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    updateUser(firstName: String!, lastName: String!, email: String!): User

    deleteUser: User

    login(email: String!, password: String!): Auth

    createProject(
      projectTitle: String
      organizationName: String
      projectCategory: String
      projectDescription: String
      projectGoal: Int
    ): Project

    createDonation(
      donationAmount: Int
      isAnonymous: Boolean
      commentBody: String
      projectId: ID
    ): Donation

    updateProject(
      _id: ID
      projectTitle: String
      projectCategory: String
      projectDescription: String
    ): Project

    favoriteProject(projectId: ID): User
  }
`;

module.exports = typeDefs;
