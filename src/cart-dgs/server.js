const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");

const { resolvers } = require("./resolvers");

const typeDefs = gql(
  readFileSync("./schema.graphql", {
    encoding: "utf-8",
  }),
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`cart-dgs ready at ${url}`);
});
