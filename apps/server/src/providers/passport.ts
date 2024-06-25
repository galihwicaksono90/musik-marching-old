import fastifyPassport from "@fastify/passport"
import { FastifyInstance } from "fastify";
import { Strategy as GoogleOAuth2, type StrategyOptions } from "passport-google-oauth20"
import { User } from "@prisma/client"
import { prisma } from "../prisma";

declare module 'fastify' {
  interface PassportUser extends User { }
}

const googleOAuth2Options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
}

fastifyPassport.use('googleOAuth2', new GoogleOAuth2(googleOAuth2Options, async function (accessToken, refreshToken, profile, done) {
  const user = await prisma.user.upsert({
    where: {
      email: profile.emails![0].value
    },
    update: {
      name: profile.displayName
    },
    create: {
      name: profile.displayName,
      email: profile.emails![0].value
    }
  })
  return done(null, user)
}))

fastifyPassport.registerUserSerializer(async (user) => {
  return user
})

fastifyPassport.registerUserDeserializer(async (input: User) => {
  const authUser = prisma.user.findFirstOrThrow({
    where: {
      email: input.email as string
    }
  })

  return authUser
})

export function registerGoogleOAuth2(app: FastifyInstance) {
  app.register(fastifyPassport.initialize())
  app.register(fastifyPassport.secureSession())
}
