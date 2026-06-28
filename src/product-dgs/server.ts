import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers";
import { gql } from "apollo-server";

const typeDefs = gql(readFileSync("./schema.graphql", { encoding: "utf-8" }));

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`product-dgs ready at ${url}`);
});
