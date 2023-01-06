const { AuthenticationError } = require("apollo-server-express");
const omit = require("lodash.omit");

const { User, Project, Donation } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getCurrentUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .select("-__v -password")
          .populate("projects")
          .populate("donations")
          .populate("favorites");

        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    //getProjectById
    getProjectById: async (parent, { _id }) => {
      const project = await Project.findOne({ _id });

      if (!project) {
        throw new AuthenticationError("Project not found.");
      }
      return project;
    },
    //getDonations byUserId $or byProjectId
    getDonationById: async (parent, args) => {
      const donation = await Donation.findOne({
        $or: [{ userId: args._id }, { projectId: args._id }],
      });
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
    createProject: async (parent, args, context) => {
      if (context.user) {
        const project = await Project.create(args);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { projects: project._id } },
          { new: true }
        );

        return project;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //updateProject
    updateProject: async (parent, args, context) => {
      if (context.user) {
        const updatedProject = await Project.findOneAndUpdate(
          { _id: args._id },
          args
        );

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: args._id } },
          { new: true }
        );

        return updatedProject;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //favoriteProject
    favoriteProject: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: args.projectId } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!")
    },

    //createDonation
    createDonation: async (parent, args, context) => {
      if (context.user) {
        const donationToCreate = {
          donationAmount: args.donationAmount,
          isAnonymous: args.isAnonymous,
          commentBody: args.commentBody,
          project: args.projectId,
          createdBy: context.user.firstName + " " + context.user.lastName,
        };
        const donation = await Donation.create(donationToCreate);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { donations: donation._id } },
          { new: true }
        );

        await Project.findByIdAndUpdate(
          { _id: args.projectId },
          { $addToSet: { donations: donation._id } },
          { new: true }
        );
        return donation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
