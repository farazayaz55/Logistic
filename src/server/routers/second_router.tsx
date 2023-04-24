import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../trpc';
export const second_router=createTRPCRouter({
    hello2: publicProcedure
      .input(
        z.object({
          text: z.string(),
        }),
      )
      .query(({ input }) => {
        return {
          greeting: `bye ${input.text}`,
        };
      }),
  
      bye2:  publicProcedure
      .input(
        z.object({
          text: z.string(),
        }),
      )
      .mutation(({ input }) => {
        return {
          greeting: `bye ${input.text}`,
        };
      }),
  });