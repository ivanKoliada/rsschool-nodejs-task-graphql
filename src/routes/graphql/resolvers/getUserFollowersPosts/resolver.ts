import { FastifyInstance } from "fastify/types/instance";

export const getUserFollowersPostsResolver = {
  Query: {
    userFollowersPosts: async (
      root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({ key: "id", equals: id });

      if (user) {
        return user;
      }

      throw fastify.httpErrors.notFound();
    },
  },
};
