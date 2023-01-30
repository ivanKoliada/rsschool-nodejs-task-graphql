export const subscribeToUserTypeDefs = `
  input SubscribeToUserInput {
    userId: ID!
  }
  type Mutation {
    subscribeToUser(id: ID!, input: SubscribeToUserInput!): UserEntity
  }
`;
