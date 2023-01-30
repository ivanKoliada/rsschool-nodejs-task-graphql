export const unsubscribeFromUserTypeDefs = `
  input UnsubscribeFromUserInput {
    userId: ID!
  }
  type Mutation {
    unsubscribeFromUser(id: ID!, input: UnsubscribeFromUserInput!): UserEntity
  }
`;
