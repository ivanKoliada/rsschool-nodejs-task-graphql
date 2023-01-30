export const getEntitiesTypeDefs = `
    type Query {
      users: [UserEntity]!
      posts: [PostEntity]!
      profiles: [ProfileEntity]!
      memberTypes: [MemberTypeEntity]!
    }    

    type UserEntity {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
    }

    type PostEntity {
      id: ID!
      title: String!
      content: String!
      userId: String!
    }

    type ProfileEntity {
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

    type MemberTypeEntity {
      id: ID!
      discount: Int!
      monthPostsLimit: Int!
    }
  `;
