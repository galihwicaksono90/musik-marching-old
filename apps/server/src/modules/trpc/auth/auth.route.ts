import { router, protectedProcedure } from "../trpc"

export const authRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user
  })
})
