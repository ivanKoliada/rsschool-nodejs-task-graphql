export const updatePostTypeDefs = `
  input UpdatePostInput {
    title: String
    content: String
  }
  type Mutation {
    updatePost(id: ID!, input: UpdatePostInput!): PostEntity
  }
`;
