import { FastifyInstance } from "fastify/types/instance";
import { UserEntity } from "../../../../utils/DB/entities/DBUsers";

export const updateUserResolver = {
  Mutation: {
    updateUser: async (
      root: unknown,
      { id, input }: { id: string; input: Partial<Omit<UserEntity, "id">> },
      fastify: FastifyInstance
    ) => {
      try {
        const user = await fastify.db.users.change(id, input);

        return user;
      } catch (error) {
        throw fastify.httpErrors.badRequest("user not found");
      }
    },
  },
};
