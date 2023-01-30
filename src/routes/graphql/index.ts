import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { getEntitiesTypeDefs } from "./resolvers/getEntities/typeDefs";
import { getEntitiesByIdTypeDefs } from "./resolvers/getEntitiesById/typeDefs";
import { getEntitiesResolver } from "./resolvers/getEntities/resolver";
import { getEntitiesByIdResolver } from "./resolvers/getEntitiesById/resolver";
import { createUserTypeDefs } from "./resolvers/createUser/typeDefs";
import { createUserResolver } from "./resolvers/createUser/resolver";
import { createProfileTypeDefs } from "./resolvers/createProfile/typeDefs";
import { createProfileResolver } from "./resolvers/createProfile/resolver";
import { createPostResolver } from "./resolvers/createPost/resolver";
import { createPostTypeDefs } from "./resolvers/createPost/typeDefs";
import { updatePostTypeDefs } from "./resolvers/updatePost/typeDefs";
import { updatePostResolver } from "./resolvers/updatePost/resolver";
import { updateMemberTypeResolver } from "./resolvers/updateMemberType/resolver";
import { updateUserResolver } from "./resolvers/updateUser/resolver";
import { updateProfileResolver } from "./resolvers/updateProfile/resolver";
import { updateProfileTypeDefs } from "./resolvers/updateProfile/typeDefs";
import { updateUserTypeDefs } from "./resolvers/updateUser/typeDefs";
import { updateMemberTypeTypeDefs } from "./resolvers/updateMemberType/typeDefs";
import { subscribeToUserTypeDefs } from "./resolvers/subscribeToUser/typeDefs";
import { subscribeToUserResolver } from "./resolvers/subscribeToUser/resolver";
import { unsubscribeFromUserTypeDefs } from "./resolvers/unsubscribeFromUser/typeDefs";
import { unsubscribeFromUserResolver } from "./resolvers/unsubscribeFromUser/resolver";
import { getUserWithEntitiesResolver } from "./resolvers/getUserWithEntities/resolver";
import { getUserWithEntitiesTypeDefs } from "./resolvers/getUserWithEntities/typeDefs";
import { getUsersWithEntitiesResolver } from "./resolvers/getUsersWithEntities/resolver";
import { getUsersWithEntitiesTypeDefs } from "./resolvers/getUsersWithEntities/typeDefs";
import { getUsersSubscriberProfilesResolver } from "./resolvers/getUsersSubscriberProfiles/resolver";
import { getUsersSubscriberProfilesTypeDefs } from "./resolvers/getUsersSubscriberProfiles/typeDefs";
import { getUserFollowersPostsResolver } from "./resolvers/getUserFollowersPosts/resolver";
import { getUserFollowersPostsTypeDefs } from "./resolvers/getUserFollowersPosts/typeDefs";
import { getUsersSubscriptionsResolver } from "./resolvers/getUserSubscriptions/resolver";
import { getUsersSubscriptionsTypeDefs } from "./resolvers/getUserSubscriptions/typeDefs";

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    getEntitiesTypeDefs,
    getEntitiesByIdTypeDefs,
    createUserTypeDefs,
    createProfileTypeDefs,
    createPostTypeDefs,
    updatePostTypeDefs,
    updateUserTypeDefs,
    updateProfileTypeDefs,
    updatePostTypeDefs,
    updateMemberTypeTypeDefs,
    subscribeToUserTypeDefs,
    unsubscribeFromUserTypeDefs,
    getUserWithEntitiesTypeDefs,
    getUsersWithEntitiesTypeDefs,
    getUsersSubscriberProfilesTypeDefs,
    getUserFollowersPostsTypeDefs,
    getUsersSubscriptionsTypeDefs,
  ]),
  resolvers: mergeResolvers([
    getEntitiesResolver,
    getEntitiesByIdResolver,
    createUserResolver,
    createProfileResolver,
    createPostResolver,
    updatePostResolver,
    updateMemberTypeResolver,
    updateUserResolver,
    updateProfileResolver,
    subscribeToUserResolver,
    unsubscribeFromUserResolver,
    getUserWithEntitiesResolver,
    getUsersWithEntitiesResolver,
    getUsersSubscriberProfilesResolver,
    getUserFollowersPostsResolver,
    getUsersSubscriptionsResolver,
  ]),
});
