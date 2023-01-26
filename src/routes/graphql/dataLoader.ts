import { MercuriusLoaders } from "mercurius";
import { UserEntity } from "../../utils/DB/entities/DBUsers";

export const loaders: MercuriusLoaders = {
  UserWithEntities: {
    async profile(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(({ obj, params }) => {
        return db.profiles.findOne({
          key: "userId",
          equals: obj.id,
        });
      });
    },
    async posts(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(async ({ obj, params }) => {
        const posts = await db.posts.findMany({
          key: "userId",
          equals: obj.id,
        });

        return posts.map((post) =>
          db.posts.findOne({
            key: "id",
            equals: post.id,
          })
        );
      });
    },
    async memberType(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(async ({ obj, params }) => {
        const profile = await db.profiles.findOne({
          key: "userId",
          equals: obj.id,
        });

        if (profile)
          return db.memberTypes.findOne({
            key: "id",
            equals: profile.memberTypeId,
          });
      });
    },
  },
  UsersWithSubscribedUsersProfile: {
    async subscribedProfile(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(async ({ obj, params }) => {
        const { subscribedToUserIds } = obj;

        return subscribedToUserIds.map(
          async (id: string) =>
            await db.profiles.findOne({ key: "userId", equals: id })
        );
      });
    },
  },
  UserWithUsersSubscribedPosts: {
    async subscriberPosts(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(async ({ obj, params }) => {
        const users: UserEntity[] = await db.users.findMany({
          key: "subscribedToUserIds",
          inArray: obj.id,
        });

        return users.map(
          async (user) =>
            await db.posts.findOne({ key: "userId", equals: user.id })
        );
      });
    },
  },
  UserSubscriptions: {
    async subscribedToUser(queries, ctx) {
      const { db } = ctx.app;

      return queries.map(async ({ obj, params }) => {
        const user = await db.users.findOne({ key: "id", equals: obj.id });

        if (user) {
          const followers: UserEntity[] = await db.users.findMany({
            key: "subscribedToUserIds",
            inArray: user.id,
          });

          return Promise.all(
            followers.map(async (user) => {
              const nestedUser = await db.users.findOne({
                key: "id",
                equals: user.id,
              });

              if (nestedUser) {
                const nestedUserSubscriptions = await Promise.all(
                  nestedUser.subscribedToUserIds.map(async (_id) => {
                    return await db.users.findOne({ key: "id", equals: _id });
                  })
                );

                return {
                  ...nestedUser,
                  subscribedToUser: nestedUserSubscriptions,
                };
              }
            })
          );
        }
      });
      //   const user = await db.users.findOne({ key: "id", equals: obj.id });
      //   console.log(1111);
      //   console.log(user);

      //   if (user) {
      //     const userSubscriptions = user.subscribedToUserIds;
      //     console.log(2222);
      //     console.log(userSubscriptions);

      //     return Promise.all(
      //       userSubscriptions.map(async (id) => {
      //         const nestedUser = await db.users.findOne({
      //           key: "id",
      //           equals: obj.id,
      //         });

      //         if (nestedUser) {
      //           const nestedUserSubscriptions = await Promise.all(
      //             nestedUser.subscribedToUserIds.map(async (_id) => {
      //               return await db.users.findOne({ key: "id", equals: _id });
      //             })
      //           );
      //           console.log(333333);
      //           console.log(nestedUserSubscriptions);
      //           const asd = {
      //             ...nestedUser,
      //             userSubscribedTo: nestedUserSubscriptions,
      //           };
      //           console.log(44444);
      //           console.log(asd);
      //           return asd;
      //         }
      //       })
      //     );
      //   }
      // });
    },
    // async subscribedToUser(queries, ctx) {
    //   const { db } = ctx.app;

    //   return queries.map(async ({ obj, params }) => {
    //     // const users: UserEntity[] = await db.users.findMany({
    //     //   key: "subscribedToUserIds",
    //     //   inArray: obj.id,
    //     // });
    //     // return users.map(
    //     //   async (user) =>
    //     //     await db.posts.findOne({ key: "userId", equals: user.id })
    //     // );
    //   });
    // },
  },
};
