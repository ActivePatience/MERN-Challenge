import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUserMutation($email: String!, $password: String!, $username: String!) {
    addUser(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        username
        email
        password
        savedBooks
      }
    }
  }
`;

// export const SAVE_BOOK = gql`
//   mutation saveBook($authors: [String], $description: String!, $bookId: String!, $image: String, $link: String, $title: String!) {
//     saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
//       _id
//       username
//       email
//       password
//       savedBooks
//     }
//   }
// `;

export const SAVE_BOOK = gql`
  mutation saveBook($book: Book) {
    saveBook(book: $book) {
      _id
      username
      email
      password
      savedBooks
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      savedBooks
    }
  }
`;