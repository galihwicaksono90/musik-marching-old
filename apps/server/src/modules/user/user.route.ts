import { router } from "../../libs/trpc"
import { prisma } from "../../prisma"
import { publicProcedure, protectedProcedure, adminProcedure } from "../../libs/trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { findUserByEmail, registerUserAsContributor, getAllUsers } from "./user.service"
import { userType } from "../../types"


export const userRouter = router({
  allContributors: publicProcedure
    .query(async () => {
      const allContributors = await prisma.user.findMany({
        where: {
          role: userType.CONTRIBUTOR
        }
      })
      return allContributors
    }),
  all: publicProcedure
    .query(async () => {
      return await getAllUsers()
    }),
  oneByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      return await findUserByEmail({ email: input.email })
    }),
  registerAsContributor: adminProcedure
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
