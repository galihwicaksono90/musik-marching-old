
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import cors from 'cors'
import { appRouter } from "./routers"
import { createContext } from "./context"

const server = createHTTPServer({
  middleware: cors({}),
  router: appRouter,
  createContext
})

server.listen(4000)

export type { AppRouter, RouterInput, RouterOutput } from "./routers"
