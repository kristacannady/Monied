const { AuthenticationError } = require("apollo-server-express");
const omit = require("lodash.omit");

const { User } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getCurrentUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select(
          "-__v -password"
            .populate("projects")
            .populate("donations")
            .populate("favorites")
        );
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    //getProjectById
    getProjectById: async (parent, { _id }) => {
      const project = await Project.findOne({ _id })

      if(!project) {
        throw new AuthenticationError ("Project not found.");
      }
      return project;
    },
    //getDonations byUserId $or byProjectId
    getDonationsById: async (parent, args) => {
      const donation = await Donation.findOne ({
        $or: [{ userId: args._id}, {projectId: args._id}]
      })
      if (!donation) {
        throw new AuthenticationError("Donation not found");
      }
      return donation;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      user.isAuthenticated = true;
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndDelete(context.user._id);
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) throw new AuthenticationError("Incorrect credentials");

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) throw new AuthenticationError("Incorrect credentials");

      omit(user._doc, "password");

      const token = signToken(user);

      return { token, user };
    },
    //createProject
    //updateProject
    //deleteProject
    //favoriteProject

    //createDonation
  },
};

module.exports = resolvers;
