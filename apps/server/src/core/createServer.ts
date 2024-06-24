import fastify from "fastify"
import { registerGoogleOAuth2 } from "@/providers/passport"
import { registerSecureSession } from "@/providers/session"
import { registerCors } from "@/providers/cors"
import { googleOAuth2Routes } from "@/modules/oauth/google/oauth.route"
import { registerTrpc } from "@/providers/trpc"
import fastifySecureSession from "@fastify/secure-session"
import fs from "fs"
import path from "path"

export function createServer() {
  const app = fastify({
    // logger: {
    //   level: "trace"
    // }
  })

  registerCors(app)
  registerSecureSession(app)
  registerGoogleOAuth2(app)

  app.register(googleOAuth2Routes, {
    prefix: "/oauth2"
  })

  app.get("/hello", async ({ user }, reply) => {
    reply.send({ user })
  })

  registerTrpc(app)

  return app
}
