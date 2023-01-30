export const getUsersSubscriptionsTypeDefs = `
    type Query {
      usersSubscriptions: [UserSubscriptions]!     
    }   

    type UserSubscriptions {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
      subscribedToUser: [UserSubscriptions]
      userSubscribedTo: [UserSubscriptions]
    }
`;
