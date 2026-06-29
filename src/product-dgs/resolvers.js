const fetch = require("node-fetch");

exports.resolvers = {
  Query: {
    products: async (_, { currencyCode }) => {
      const res = await fetch(
        `http://localhost:8080/api/products?currencyCode=${currencyCode}`,
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("ERROR RESPONSE:", text);
        throw new Error("Backend error: " + text);
      }

      const data = await res.json();
      console.log("Calling products API...", data);

      return data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.priceUsd.units + p.priceUsd.nanos / 1_000_000_000,
      }));
    },
  },
};
