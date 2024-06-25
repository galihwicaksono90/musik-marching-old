import fastify from "fastify"
import { registerGoogleOAuth2 } from "../providers/passport"
import { registerSecureSession } from "../providers/session"
import { registerCors } from "../providers/cors"
import { googleOAuth2Routes } from "../modules/oauth/google/oauth.route"
import { registerTrpc } from "../providers/trpc"

export function createServer() {
  const app = fastify()

  registerCors(app)
  registerSecureSession(app)
  registerGoogleOAuth2(app)

  app.register(googleOAuth2Routes, {
    prefix: "/oauth2"
  })

  registerTrpc(app)

  app.get("/logout", async (request, reply) => {
    request.logout()
  })

  return app
}
