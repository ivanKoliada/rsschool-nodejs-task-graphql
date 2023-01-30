import { FastifyInstance } from "fastify/types/instance";

export const getUsersSubscriptionsResolver = {
  Query: {
    usersSubscriptions: async (
      root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany(),
  },
};
