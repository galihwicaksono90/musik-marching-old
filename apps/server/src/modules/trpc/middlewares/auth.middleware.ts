import { publicProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const { req } = ctx

  const user = req.user
  if (!user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      ...ctx
    }
  })
})

export const contributorProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { req } = ctx

  const user = req.user
  if (!user?.isContributor) {
    throw new TRPCError({ code: "FORBIDDEN" })
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})
