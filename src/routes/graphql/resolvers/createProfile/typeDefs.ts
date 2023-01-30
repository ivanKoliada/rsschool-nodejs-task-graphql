export const createProfileTypeDefs = `
  input CreateProfileInput {
    avatar: String!
    sex: String!
    birthday: Int!
    country: String!
    street: String!
    city: String!
    memberTypeId: String!
    userId: String!
  }
  type Mutation {
    createProfile(input: CreateProfileInput!): ProfileEntity
  }
`;
