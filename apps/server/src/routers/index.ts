import { userRouter } from "./userRouter"
import { router } from "../trpc"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

export const appRouter = router({
  users: userRouter
})

export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
