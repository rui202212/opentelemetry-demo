const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");
const fetch = require("node-fetch");

const typeDefs = gql(readFileSync("./schema.graphql", { encoding: "utf-8" }));

const BASE_URL = process.env.BACKEND_URL || "http://localhost:8080";
console.log("BASE_URL =", BASE_URL);

const resolvers = {
  Query: {
    currencies: async () => {
      const res = await fetch(`${BASE_URL}/api/currency`);
      return await res.json();
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`currency-dgs ready at ${url}`);
});
