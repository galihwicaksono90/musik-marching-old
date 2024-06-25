import { type Prisma } from "@prisma/client"
import { prisma } from "../../../prisma"
import { z } from "zod"

const userCreateInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export type UserCreateInput = z.infer<typeof userCreateInput>

export async function upsertUser({ email, name }: UserCreateInput) {
  const user = await prisma.user.upsert({
    where: {
      email
    },
    update: {
      name
    },
    create: {
      name,
      email
    }
  })
  return user
}

export async function registerUserAsContributor({ userId }: { userId: string }) {
  try {
    const contributor = await prisma.contributor.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        name: "mbuh"
      },
    })
    return contributor
  } catch (error) {
    return null
  }
}

export async function findUserById({ id }: { id: string }) {
  const user = await prisma.user.findFirst({
    where: ({ id }),
    select: {
      id: true,
      email: true,
    }
  })
  return user
}



export async function findUserByEmail({ email }: { email: string }) {
  const user = await prisma.user.findFirst({
    where: ({ email: email }),
    select: {
      id: true,
      email: true,
    }
  })
  return user
}


