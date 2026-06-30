const { ApolloServer } = require("apollo-server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: "product",
        url: "http://localhost:4001",
      },
      {
        name: "currency",
        url: "http://localhost:4002",
      },
      {
        name: "cart",
        url: "http://localhost:4003",
      },
      {
        name: "recommendation",
        url: "http://localhost:4004",
      },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});
