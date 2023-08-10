const { gql } = require('apollo-server-express');

const typeDefs = gql`

  scalar Date

  type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(username: String, email: String, password: String!): Auth
    saveBook(book: Book): User
    removeBook(bookId: String!): User
  }
`;

// saveBook(authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User

module.exports = typeDefs;
