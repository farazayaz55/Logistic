import { airSolutions } from './airSolutions';
import { seaSolutionsRouter } from './seaSolutions';
import { z } from 'zod';
import { firstRouter } from './authRouter';
import { createTRPCRouter } from '../trpc';

export const appRouter = createTRPCRouter({firstRouter,seaSolutionsRouter,airSolutions})

// export type definition of API
export type AppRouter = typeof appRouter;

