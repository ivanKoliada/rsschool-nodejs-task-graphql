export const updateProfileTypeDefs = `
  input UpdateProfileInput {
    avatar: String
    sex: String
    birthday: String
    country: String
    street: String
    city: String
    memberTypeId: String
  }
  type Mutation {
    updateProfile(id: ID!, input: UpdateProfileInput!): ProfileEntity
  }
`;
