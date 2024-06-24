import fastifyPassport from "@fastify/passport"
import { FastifyInstance } from "fastify";
import { Strategy as GoogleOAuth2, type StrategyOptions } from "passport-google-oauth20"

declare module 'fastify' {
  interface PassportUser {
    id: string
  }
}

const googleOAuth2Options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
}

fastifyPassport.use('googleOAuth2', new GoogleOAuth2(googleOAuth2Options, async function (accessToken, refreshToken, profile, done) {
  return done(null, profile)
}))

fastifyPassport.registerUserSerializer(async (user) => {
  return user
})

fastifyPassport.registerUserDeserializer(async (user) => {
  return user
})

export function registerGoogleOAuth2(app: FastifyInstance) {
  app.register(fastifyPassport.initialize())
  app.register(fastifyPassport.secureSession())
}
