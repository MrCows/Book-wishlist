const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # User type for returning user data
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  # Book type for the savedBooks array
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  # Auth type to return token and user after login/signup
  type Auth {
    token: ID!
    user: User
  }

  # Query type to fetch the current logged-in user
  type Query {
    me: User
  }

  # Mutation type to handle user actions like login, signup, saving/removing books
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }

  # Input type for handling book data input when saving a book
  input BookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
`;

module.exports = typeDefs;
