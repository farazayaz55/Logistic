//trpc http handler
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routers/_app';
import dbConnect from '@/mongoConnect/mongoConnect';
import { error } from 'console';
import { type } from 'os';
import { NextApiRequest } from 'next';
// export API handler
// @see https://trpc.io/docs/api-handler



export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: async () => {
    console.log("CREATE CONTEXT CALLED")
    await dbConnect()
    return {session:null}
  },
  onError:
      ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
});