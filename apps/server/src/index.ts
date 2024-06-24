import './loadEnv'
import { createServer } from "@/core/createServer"

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

export type { AppRouter, RouterInput, RouterOutput } from "./modules/trpc/routers"
