const fetch = require("node-fetch");

exports.resolvers = {
  Query: {
    cart: async (_, { sessionId, currencyCode }) => {
      const response = await fetch(
        `http://localhost:8080/api/cart?sessionId=${sessionId}&currencyCode=${currencyCode}`,
      );

      return await response.json();
    },
  },

  Mutation: {
    addToCart: async (_, { userId, productId, quantity }) => {
      const response = await fetch(
        `http://localhost:8080/api/cart?currencyCode=USD`,
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
