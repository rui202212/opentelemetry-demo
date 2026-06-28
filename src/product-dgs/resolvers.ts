import fetch from "node-fetch";

export const resolvers = {
  Query: {
    products: async (_: any, { currencyCode }: any) => {
      const res = await fetch(
        `http://frontend-proxy:8080/api/products?currencyCode=${currencyCode}`,
      );

      const data = await res.json();

      return data.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.priceUsd.units + p.priceUsd.nanos / 1_000_000_000,
      }));
    },
  },
};
