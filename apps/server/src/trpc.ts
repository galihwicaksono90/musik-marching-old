import { initTRPC } from "@trpc/server"
import type { Context } from "./context"

const t = initTRPC.context<Context>().create()

const protectedProcedure = t.procedure.use((opts) => {
  return opts.next({
    ctx: {
      session: opts.ctx.session
    }
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware
export { protectedProcedure }


