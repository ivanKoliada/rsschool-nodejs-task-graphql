import { FastifyInstance } from "fastify/types/instance";
import { PostEntity } from "../../../../utils/DB/entities/DBPosts";

export const createPostResolver = {
  Mutation: {
    createPost: async (
      root: unknown,
      { input }: { input: Omit<PostEntity, "id"> },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({
        key: "id",
        equals: input.userId,
      });

      const post = await fastify.db.posts.create(input);

      if (user && post) {
        return post;
      }

      throw fastify.httpErrors.badRequest("user does not exist");
    },
  },
};
