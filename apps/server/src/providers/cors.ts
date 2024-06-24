import fastifyCors from "@fastify/cors"
import { FastifyInstance } from "fastify"



export function registerCors(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: ["http://localhost:3000"],
    credentials: true
  })
}
