import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createUserBodySchema, changeUserBodySchema, subscribeBodySchema } from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    const users = await this.db.users.findMany();

    return users;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await this.db.users.findOne({ key: 'id', equals: request.params.id });

      if (user) {
        return user;
      }

      throw this.httpErrors.notFound();
    },
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await this.db.users.create(request.body);

      if (user) {
        return user;
      }

      throw this.httpErrors.badRequest();
    },
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await this.db.users.findOne({ key: 'id', equals: request.params.id });

      if (user) {
        const profile = await this.db.profiles.findOne({ key: 'userId', equals: user.id });
        const post = await this.db.posts.findOne({ key: 'userId', equals: user.id });

        if (profile) await this.db.profiles.delete(profile.id);

        if (post) await this.db.posts.delete(post.id);

        const users = await this.db.users.findMany({ key: 'subscribedToUserIds', inArray: request.params.id });

        for (let i = 0; i < users.length; i++) {
          await this.db.users.change(users[i].id, {
            subscribedToUserIds: users[i].subscribedToUserIds.filter((id) => id !== request.params.id),
          });
        }

        return await this.db.users.delete(request.params.id);
      }

      throw this.httpErrors.badRequest();
    },
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await this.db.users.findOne({ key: 'id', equals: request.body.userId });

      if (user) {
        const isSubscriberExists = await this.db.users.findOne({ key: 'id', equals: request.params.id });
        const isUserSubscribed = user.subscribedToUserIds.includes(request.params.id);

        if (isUserSubscribed) {
          return user;
        }

        if (isSubscriberExists) {
          const updatedUser = await this.db.users.change(request.body.userId, {
            subscribedToUserIds: [...user.subscribedToUserIds, request.params.id],
          });

          return updatedUser;
        }
      }

      throw this.httpErrors.badRequest();
    },
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await this.db.users.findOne({ key: 'id', equals: request.body.userId });

      if (user) {
        const isUserSubscribed = user.subscribedToUserIds.includes(request.params.id);

        if (isUserSubscribed) {
          const updatedUser = await this.db.users.change(request.body.userId, {
            subscribedToUserIds: user.subscribedToUserIds.filter((id) => id !== request.params.id),
          });

          return updatedUser;
        }

        throw this.httpErrors.badRequest();
      }

      throw this.httpErrors.badRequest();
    },
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      try {
        const user = await this.db.users.change(request.params.id, request.body);

        return user;
      } catch (error) {
        throw this.httpErrors.badRequest();
      }
    },
  );
};

export default plugin;
