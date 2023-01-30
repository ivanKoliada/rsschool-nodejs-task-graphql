import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const createProfileResolver = {
  Mutation: {
    createProfile: async (
      root: unknown,
      { input }: { input: Omit<ProfileEntity, "id"> },
      fastify: FastifyInstance
    ) => {
      const isUserProfileExist = await fastify.db.profiles.findOne({
        key: "userId",
        equals: input.userId,
      });

      const isMemberTypeExist = await fastify.db.memberTypes.findOne({
        key: "id",
        equals: input.memberTypeId,
      });

      const profile = await fastify.db.profiles.create(input);

      if (isUserProfileExist) {
        throw fastify.httpErrors.badRequest("user profile already exists");
      }

      if (!isMemberTypeExist) {
        const memberTypeIds = (await fastify.db.memberTypes.findMany()).map(
          (type) => type.id
        );

        return fastify.httpErrors.badRequest(
          `memberTypeId must be one of ${[...memberTypeIds]}`
        );
      }

      return profile;
    },
  },
};
