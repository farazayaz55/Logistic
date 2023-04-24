import { z } from 'zod';
import { firstRouter } from './first_router';
import { second_router } from './second_router';
import { createTRPCRouter } from '../trpc';

export const appRouter = createTRPCRouter({firstRouter,second_router})

// export type definition of API
export type AppRouter = typeof appRouter;

