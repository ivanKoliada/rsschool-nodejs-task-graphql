export const createUserTypeDefs = `
  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
  }
  type Mutation {
    createUser(input: CreateUserInput!): UserEntity
  }
`;
