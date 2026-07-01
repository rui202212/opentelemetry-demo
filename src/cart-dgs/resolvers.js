const fetch = require("node-fetch");

const BASE_URL = process.env.BACKEND_URL || "http://localhost:8080";
console.log("BASE_URL =", BASE_URL);

exports.resolvers = {
  Query: {
    cart: async (_, { sessionId, currencyCode }) => {
      const response = await fetch(
        `${BASE_URL}/api/cart?sessionId=${sessionId}&currencyCode=${currencyCode}`,
      );

      return await response.json();
    },
  },

  Mutation: {
    addToCart: async (_, { userId, productId, quantity }) => {
      const response = await fetch(
        `${BASE_URL}/api/cart?currencyCode=USD`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            item: {
              productId,
              quantity,
            },
          }),
        },
      );

      return await response.json();
    },
  },
};
