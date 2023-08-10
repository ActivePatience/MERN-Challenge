const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { dateScalar } = require('./scalar');

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      const data = await User.findById(context.user._id);
      return data;
    },
  },
  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      try {


        const md = await Mood.findOne({numericV: 2});
        const usr = await User.create({firstName: firstName, lastName: lastName, email: email, password: password, days: [], currentMood: md});
        const dy = await Day.create({user: usr, mood: usr.currentMood});
        await User.updateOne(usr,{$push: {days: dy}});
        const token = signToken(usr);
        return { token, usr };
      } catch (err) {
        console.log(err);
        throw new UserInputError('Incomplete Fields')
      }
    },

    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, argObj, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError('Not logged in');
        }
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: argObj } },
          { new: true, runValidators: true }
        );
        if (!updatedUser) {
          return res.status(404).json({ message: "Couldn't find user with this id!" });
        }
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new UserInputError('Incomplete Fields')
      }
    },
  
    removeBook: async (parent, argObj, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError('Not logged in');
        }
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: argObj } },
          { new: true }
        );
        if (!updatedUser) {
          return res.status(404).json({ message: "Couldn't find user with this id!" });
        }
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new UserInputError('Incomplete Fields')
      }
    },
  }
};

module.exports = resolvers;