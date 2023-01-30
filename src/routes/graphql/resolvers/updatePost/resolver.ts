import { FastifyInstance } from "fastify/types/instance";
import { PostEntity } from "../../../../utils/DB/entities/DBPosts";

export const updatePostResolver = {
  Mutation: {
    updatePost: async (
      root: unknown,
      {
        id,
        input,
      }: { id: string; input: Partial<Omit<PostEntity, "id" | "userId">> },
      fastify: FastifyInstance
    ) => {
      try {
        const post = await fastify.db.posts.change(id, input);

        return post;
      } catch (error) {
        throw fastify.httpErrors.badRequest("post not found");
      }
    },
  },
};
