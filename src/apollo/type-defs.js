import { gql } from '@apollo/client';

export const typeDefs = gql`

type Post {
  id: ID!
  body: String!
  createdAt: String!
}

type User {
    id: ID!
    username: String
    email: String!
    createdAt: String
}

type Query {
    getUsers: [User]
    getPosts: [Post]
    createCheckoutSession: String
}

type Mutation {
    post(body: String!): Post!
}
`;