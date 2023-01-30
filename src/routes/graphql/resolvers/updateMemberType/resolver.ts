import { FastifyInstance } from "fastify/types/instance";
import { MemberTypeEntity } from "../../../../utils/DB/entities/DBMemberTypes";

export const updateMemberTypeResolver = {
  Mutation: {
    updateMemberType: async (
      root: unknown,
      {
        id,
        input,
      }: { id: string; input: Partial<Omit<MemberTypeEntity, "id">> },
      fastify: FastifyInstance
    ) => {
      try {
        const memberType = await fastify.db.memberTypes.change(id, input);

        return memberType;
      } catch (error) {
        throw fastify.httpErrors.badRequest("member type not found");
      }
    },
  },
};
