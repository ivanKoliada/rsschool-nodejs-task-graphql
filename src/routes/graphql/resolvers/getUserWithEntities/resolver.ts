import { FastifyInstance } from "fastify/types/instance";

export const getUserWithEntitiesResolver = {
  Query: {
    userWithEntities: async (
      root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({ key: "id", equals: id });

      if (user) {
        return user;
      }

      throw fastify.httpErrors.notFound("user not found");
    },
  },
  // User: {
  //   profile: async (
  //     queries: ProfileEntity,
  //     _: any,
  //     fastify: FastifyInstance
  //   ) => {
  //     const profile = await fastify.db.profiles.findOne({
  //       key: "userId",
  //       equals: queries.id,
  //     });

  //     console.log("profile",profile);

  //     if (profile) {
  //       const { userId, ...rest } = profile;
  //       console.log("rest",rest);
  //       return rest;
  //     }
  //   },
  // },
};
