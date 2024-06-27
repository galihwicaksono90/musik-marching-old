import { prisma } from "../../prisma"
import { z } from "zod"
import { userType } from "../../types"

const userCreateInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export type UserCreateInput = z.infer<typeof userCreateInput>

export async function getAllUsers() {
  const user = await prisma.user.findMany()
  return user
}


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
      email,
      role: userType.USER
    }
  })
  return user
}

export async function registerUserAsContributor({ userId }: { userId: string }) {
  const contributor = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role: userType.CONTRIBUTOR
    }
  })

  return contributor
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

export async function findContributorByEmail({ id }: { id: string }) {
  const user = await prisma.user.findFirst({
    where: ({ id: id, role: userType.CONTRIBUTOR }),
  })
  return user
}


