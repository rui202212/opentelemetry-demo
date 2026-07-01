const fetch = require("node-fetch");

const BASE_URL = process.env.BACKEND_URL || "http://localhost:8080";
console.log("BASE_URL =", BASE_URL);

exports.resolvers = {
  Query: {
    products: async (_, { currencyCode }) => {
      const res = await fetch(
        `${BASE_URL}/api/products?currencyCode=${currencyCode}`,
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("ERROR RESPONSE:", text);
        throw new Error("Backend error: " + text);
      }

      const data = await res.json();
      // console.log("Calling products API...", data);
      console.log(`Retrieved ${data.length} products`);

      return data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.priceUsd.units + p.priceUsd.nanos / 1_000_000_000,
      }));
    },
  },
};
