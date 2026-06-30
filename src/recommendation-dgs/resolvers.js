const fetch = require("node-fetch");

exports.resolvers = {
  Query: {
    recommendations: async (_, { sessionId, currencyCode, productIds }) => {
      const url =
        `http://localhost:8080/api/recommendations` +
        `?sessionId=${sessionId}` +
        `&currencyCode=${currencyCode}` +
        `&productIds=${productIds || ""}`;

      console.log("CALL URL =", url);

      const response = await fetch(url);

      const text = await response.text();

      console.log("RAW RESPONSE =", text);

      const data = JSON.parse(text);

      return data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        picture: p.picture,
        categories: p.categories,
        price: p.priceUsd.units + p.priceUsd.nanos / 1_000_000_000,
      }));
    },
  },
};
