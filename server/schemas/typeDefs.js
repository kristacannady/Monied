const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
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
  }

  type Donation {
    amount: Int
    comment: String
    users: [Donation]
    projects: [Project]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getCurrentUser: User
    getProjectById(_id: ID): Project
    getDonationsByUserId(_id: ID): [Donation]
    getDonationsByProjectId(_id: ID): [Donation]
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
  }
`;

module.exports = typeDefs;
