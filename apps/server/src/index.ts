import './loadEnv'
import { createServer } from "./core/createServer"
import { appRouter } from "./providers/trpc"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

(async () => {
  const server = createServer()
  try {
    server.listen({
      port: Number(process.env.PORT)
    })
  } catch (err) {
    console.log(err)
    server.close()
  }
})()


export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<typeof appRouter>
export type RouterOutput = inferRouterOutputs<typeof appRouter>
