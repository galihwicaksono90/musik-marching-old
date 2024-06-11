import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: `mantap`,
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
