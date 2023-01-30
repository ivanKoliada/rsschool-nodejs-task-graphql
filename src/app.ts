import { join } from "path";
import AutoLoad from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { schema } from "./routes/graphql";
import { loaders } from "./routes/graphql/dataLoader";
const depthLimit = require("graphql-depth-limit");

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(mercurius, {
    schema,
    graphiql: true,
    context: () => fastify,
    loaders,
    cache: false,
    validationRules: [depthLimit(6)],
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: {},
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: {},
  });
};

export default app;
