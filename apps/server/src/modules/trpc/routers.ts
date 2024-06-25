import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { router } from "./trpc"
import { userRouter } from "./users/users.route"
import { scoreRouter } from "./score/score.route"
import { authRouter } from "./auth/auth.route"

export const appRouter = router({
  user: userRouter,
  score: scoreRouter,
  auth: authRouter
})

export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
