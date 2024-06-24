import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"

export const createContext = async (opts: CreateFastifyContextOptions) => {
  const user = opts.req.user
  console.log({ usercontext: user, req: opts.req, res: opts.res })
  return {
    user,
    req: opts.req,
    res: opts.res,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>
