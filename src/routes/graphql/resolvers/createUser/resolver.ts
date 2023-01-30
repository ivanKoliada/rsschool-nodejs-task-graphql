import { FastifyInstance } from "fastify/types/instance";
import { UserEntity } from "../../../../utils/DB/entities/DBUsers";

export const createUserResolver = {
  Mutation: {
    createUser: async (
      root: unknown,
      { input }: { input: Omit<UserEntity, "id" | "subscribedToUserIds"> },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.create(input);

      if (user) {
        return user;
      }

      throw fastify.httpErrors.badRequest();
    },
  },
};
