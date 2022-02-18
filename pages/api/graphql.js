import "reflect-metadata";
import { resolvers } from "@generated/type-graphql";
import { buildSchemaSync } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from "graphql-helix";

import { PostResolverExtended } from "../../graphql/PostCustom";

const prisma = new PrismaClient();

const schema = buildSchemaSync({
  resolvers: [...resolvers, PostResolverExtended],
  validate: false,
});

const graphqlHandler = async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(
      renderGraphiQL({
        endpoint: "/api/graphql",
      })
    );
    return;
  }

  // Extract the GraphQL parameters from the request
  const { operationName, query, variables } = getGraphQLParameters(request);

  // Validate and execute the query
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
    contextFactory: (context) => {
      context.prisma = prisma;
      return context;
    },
  });

  sendResult(result, res);
};

export default graphqlHandler;
