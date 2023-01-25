export const entitiesByIdTypeDefs = `
    type Query {
      user(id: ID!): UserEntity
      post(id: ID!): PostEntity
      profile(id: ID!): ProfileEntity
      memberType: MemberTypeEntity
    } 
`;