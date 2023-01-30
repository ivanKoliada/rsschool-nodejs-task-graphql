export const getUserWithEntitiesTypeDefs = `
    type Query {
      userWithEntities(id: ID!): UserWithEntities
    } 
    type UserWithEntities {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
      posts: [PostEntity]
      profile: ProfileEntity
      memberType: MemberTypeEntity
    }    
`;
