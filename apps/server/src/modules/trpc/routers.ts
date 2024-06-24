import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { router } from "./trpc"
import { userRouter } from "./users/users.route"

export const appRouter = router({
  users: userRouter
})

export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
