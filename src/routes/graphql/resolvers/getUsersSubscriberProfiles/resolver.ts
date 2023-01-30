import { FastifyInstance } from "fastify/types/instance";

export const getUsersSubscriberProfilesResolver = {
  Query: {
    usersSubscriberProfiles: async (
      root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany(),
  },
};
