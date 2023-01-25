export const getUserByIdWithEntitiesTypeDefs = `
    type Query {
      getUserByIdWithEntities(id: ID!): User
    } 
    type User {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
      post: [Post]
      profile: Profile
      memberType: MemberType
    }

    type Post {
      id: ID!
      title: String!
      content: String!
      userId: String!
    }

    type Profile {
      id: ID!
      avatar: String!
      sex: String!
      birthday: Int!
      country: String!
      street: String!
      city: String!
      memberTypeId: String!
      userId: String!
    }

    type MemberType {
      id: ID!
      discount: Int!
      monthPostsLimit: Int!
    }
`;
