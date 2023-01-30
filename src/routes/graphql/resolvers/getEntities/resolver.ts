import { FastifyInstance } from "fastify/types/instance";

export const getEntitiesResolver = {
  Query: {
    users: async (root: unknown, _: unknown, fastify: FastifyInstance) =>
      fastify.db.users.findMany(),

    posts: async (root: unknown, _: unknown, fastify: FastifyInstance) =>
      fastify.db.posts.findMany(),

    profiles: async (root: unknown, _: unknown, fastify: FastifyInstance) =>
      fastify.db.profiles.findMany(),

    memberTypes: async (root: unknown, _: unknown, fastify: FastifyInstance) =>
      fastify.db.memberTypes.findMany(),
  },
};
