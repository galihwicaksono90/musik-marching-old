import { initTRPC } from "@trpc/server"
import { createHTTPServer } from "@trpc/server/adapters/standalone"
// import { z } from "zod"
import cors from "cors"
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// const createContext = () => ({})

// type Context = typeof createContext;

type User = {
  id: number
  name: string
}

const users: User[] = [
  {
    id: 1,
    name: "Galih",
  },
  {
    id: 2,
    name: "Tony",
  }
]

const t = initTRPC.create()

const router = t.router
const publicProcedure = t.procedure
// const middleware = t.middleware

const appRouter = router({
  user: publicProcedure.
    query(async () => {
      return "hello server"
    }),
  users: publicProcedure.
    query(async () => {
      return users
    })
})

const server = createHTTPServer({
  middleware: cors({}),
  router: appRouter,
})

server.listen(4000)

export type AppRouter = typeof appRouter
