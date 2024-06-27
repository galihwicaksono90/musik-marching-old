import { TRPCError } from "@trpc/server"
import { publicProcedure } from "./trpc"
import { userType } from "../../types"

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

  const role = req.user?.role
  if (role !== userType.CONTRIBUTOR) {
    throw new TRPCError({ code: "FORBIDDEN" })
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { req } = ctx

  const role = req.user?.role
  if (role === userType.ADMIN) {
    throw new TRPCError({ code: "FORBIDDEN" })
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})

