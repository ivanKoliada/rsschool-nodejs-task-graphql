import { FastifyInstance } from "fastify/types/instance";

export const getEntitiesByIdResolver = {
  Query: {
    user: async (
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
    post: async (
      root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const post = await fastify.db.posts.findOne({ key: "id", equals: id });

      if (post) {
        return post;
      }

      throw fastify.httpErrors.notFound("post not found");
    },
    profile: async (
      root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const profile = await fastify.db.profiles.findOne({
        key: "id",
        equals: id,
      });

      if (profile) {
        return profile;
      }

      throw fastify.httpErrors.notFound("profile not found");
    },
    memberType: async (
      root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const memberType = await fastify.db.memberTypes.findOne({
        key: "id",
        equals: id,
      });

      if (memberType) {
        return memberType;
      }

      throw fastify.httpErrors.notFound("member type not found");
    },
  },
};
