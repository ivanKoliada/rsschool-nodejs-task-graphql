import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const subscribeToUserResolver = {
  Mutation: {
    subscribeToUser: async (
      root: unknown,
      { id, input }: { id: string; input: Pick<ProfileEntity, "userId"> },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({
        key: "id",
        equals: input.userId,
      });

      if (user) {
        const isSubscriberExists = await fastify.db.users.findOne({
          key: "id",
          equals: id,
        });

        const isUserSubscribed = user.subscribedToUserIds.includes(id);

        if (isUserSubscribed) {
          return fastify.httpErrors.badRequest("user is already subscribed");
        }

        if (isSubscriberExists) {
          const updatedUser = await fastify.db.users.change(input.userId, {
            subscribedToUserIds: [...user.subscribedToUserIds, id],
          });

          return updatedUser;
        }
      }

      throw fastify.httpErrors.badRequest("user not found");
    },
  },
};
