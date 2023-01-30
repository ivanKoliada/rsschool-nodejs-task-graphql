import { FastifyInstance } from "fastify/types/instance";

export const getUsersWithEntitiesResolver = {
  Query: {
    usersWithEntities: async (
      root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany(),
  },
};
