import { router } from "@/trpc/trpc"
import { prisma } from "@/prisma"
import { publicProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { protectedProcedure } from "@/trpc/middlewares"

const userCreateInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(10)
})

export type UserCreateInput = z.infer<typeof userCreateInput>

export const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user
  }),
  all: publicProcedure.query(async () => {
    const allUsers = await prisma.user.findMany({ take: 10 })
    return allUsers
  }),
  oneByEmail: publicProcedure.
    input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      return await prisma.user.findFirstOrThrow({
        where: ({ email: input.email }),
        select: {
          id: true,
          email: true,
        }
      })
    }),
  create: publicProcedure.
    input(userCreateInput)
    .mutation(async ({ input }) => {

      const userExists = await prisma.user.findUnique({
        where: {
          email: input.email
        }
      })

      if (userExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        })
      }

      const newUser = await prisma.user.create({
        data: input
      })
      return newUser
    }),
})
