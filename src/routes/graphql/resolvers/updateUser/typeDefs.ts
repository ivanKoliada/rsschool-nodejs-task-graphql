export const updateUserTypeDefs = `
  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
  }
  type Mutation {
    updateUser(id: ID!, input: UpdateUserInput!): UserEntity
  }
`;
