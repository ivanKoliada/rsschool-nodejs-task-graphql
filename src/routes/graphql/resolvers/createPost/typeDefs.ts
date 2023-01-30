export const createPostTypeDefs = `
  input CreatePostInput {
    title: String!
    content: String!
    userId: ID!
  }
  type Mutation {
    createPost(input: CreatePostInput!): PostEntity
  }
`;
