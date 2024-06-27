import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { createContext } from "../libs/trpc/context"
import { FastifyInstance } from "fastify"
import { router } from "../libs/trpc"

import { authRouter } from "../modules/auth/auth.route"
import { scoreRouter } from "../modules/score/score.route"
import { userRouter } from "../modules/user/user.route"

export const appRouter = router({
  user: userRouter,
  score: scoreRouter,
  auth: authRouter
})

export function registerTrpc(app: FastifyInstance) {
  app.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      router: appRouter,
      createContext
    }
  })
}
