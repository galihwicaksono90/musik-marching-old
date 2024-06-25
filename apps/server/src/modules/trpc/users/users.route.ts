import { router } from "../trpc"
import { prisma } from "../../../prisma"
import { publicProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { protectedProcedure } from "../trpc"
import { findUserByEmail, registerUserAsContributor } from "./users.service"


export const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user
  }),
  allContributors: publicProcedure
    .query(async () => {
      const allContributors = await prisma.contributor.findMany({ take: 10, include: { user: true } })
      return allContributors
    }),
  all: publicProcedure
    .query(async () => {
      const allUsers = await prisma.user.findMany({ take: 10 })
      return allUsers
    }),
  oneUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      return await findUserByEmail({ email: input.email })
    }),
  registerAsContributor: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const newContributor = registerUserAsContributor({
        userId: input.userId
      })

      if (!newContributor) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to register user as contributor"
        })
      }


      return newContributor
    }),

})
