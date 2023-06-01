import { NextApiRequest, NextApiResponse } from 'next';
import { createOpenApiNextHandler } from 'trpc-openapi';

import { appRouter } from '@/server/routers/_app';
import dbConnect from '@/mongoConnect/mongoConnect';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {


  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    router: appRouter,
    createContext:async () => {
        console.log("CREATE CONTEXT CALLED")
        await dbConnect()
        return {session:null}
      },
  })(req, res);
};

export default handler;