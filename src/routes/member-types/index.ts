import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<MemberTypeEntity[]> {
    const memberTypes = await this.db.memberTypes.findMany();

    return memberTypes;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      const memberType = await this.db.memberTypes.findOne({ key: 'id', equals: request.params.id });

      if (memberType) {
        return memberType;
      }

      throw this.httpErrors.notFound();
    },
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      try {
        const memberType = await this.db.memberTypes.change(request.params.id, request.body);

        return memberType;
      } catch (error) {
        throw this.httpErrors.badRequest();
      }
    },
  );
};

export default plugin;
