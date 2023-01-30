export const getUserFollowersPostsTypeDefs = `
    type Query {
      userFollowersPosts(id: ID!): UserFollowersPosts    
    }   

    type UserFollowersPosts {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
      subscriberPosts: [PostEntity]
    }
`;
