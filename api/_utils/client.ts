import { createClient, defaultExchanges } from "@urql/core";

const client = createClient({
  url: process.env.HASURA_PROJECT_ENDPOINT as string,
  fetchOptions: () => {
    return {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
      },
    };
  },
  exchanges: defaultExchanges,
});

export default client;
