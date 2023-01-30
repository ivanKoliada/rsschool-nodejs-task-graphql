import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const updateProfileResolver = {
  Mutation: {
    updateProfile: async (
      root: unknown,
      {
        id,
        input,
      }: { id: string; input: Partial<Omit<ProfileEntity, "id" | "userId">> },
      fastify: FastifyInstance
    ) => {
      const profile = await fastify.db.profiles.findOne({
        key: "id",
        equals: id,
      });

      if (profile) {
        const memberType =
          input.memberTypeId &&
          !(await fastify.db.memberTypes.findOne({
            key: "id",
            equals: input.memberTypeId,
          }));

        if (memberType) {
          const memberTypeIds = (await fastify.db.memberTypes.findMany()).map(
            (type) => type.id
          );

          return fastify.httpErrors.badRequest(
            `memberTypeId must be one of ${[...memberTypeIds]}`
          );
        }

        return await fastify.db.profiles.change(id, input);
      }

      throw fastify.httpErrors.badRequest("user not found");
    },
  },
};
