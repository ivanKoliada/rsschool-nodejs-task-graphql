export const updateMemberTypeTypeDefs = `
  input UpdateMemberTypeInput {
    discount: Int
    monthPostsLimit: Int
  }
  type Mutation {
    updateMemberType(id: ID!, input: UpdateMemberTypeInput!): MemberTypeEntity
  }
`;
