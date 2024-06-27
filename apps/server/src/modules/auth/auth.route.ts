import { router, protectedProcedure } from "../../libs/trpc"

export const authRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user
  })
})
