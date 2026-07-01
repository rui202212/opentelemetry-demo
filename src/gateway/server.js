const { ApolloServer } = require("apollo-server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");

const PRODUCT_URL = process.env.PRODUCT_DGS_URL || "http://localhost:4001";
const CURRENCY_URL = process.env.CURRENCY_DGS_URL || "http://localhost:4002";
const CART_URL = process.env.CART_DGS_URL || "http://localhost:4003";
const RECOMMENDATION_URL =
  process.env.RECOMMENDATION_DGS_URL || "http://localhost:4004";

console.log("PRODUCT_URL =", PRODUCT_URL);
console.log("CURRENCY_URL =", CURRENCY_URL);
console.log("CART_URL =", CART_URL);
console.log("RECOMMENDATION_URL =", RECOMMENDATION_URL);

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "product", url: PRODUCT_URL },
      { name: "currency", url: CURRENCY_URL },
      { name: "cart", url: CART_URL },
      { name: "recommendation", url: RECOMMENDATION_URL },
    ],

    /* subgraphs: [
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
    ], */
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});
