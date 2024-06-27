import { prisma } from "../../prisma"
import { paginationSchema, Pagination, PublishedScoresSchema, CreateScoreSchema } from "./score.schema"
import { findContributorByEmail } from "../user/user.service"
import { TRPCError } from "@trpc/server"

export async function getPublisedScores(input: PublishedScoresSchema) {
  const { title, pagination, tagIds, sorting } = input

  const scores = await prisma.score.findMany({
    cursor: pagination?.cursor ? {
      id: pagination?.cursor
    } : undefined,
    skip: pagination?.cursor ? 1 : 0,
    take: pagination?.take,
    where: {
      title: {
        contains: title
      },
      deletedAt: null,
      tags: {
        some: {
          tagId: {
            in: tagIds
          }
        }
      }
    },
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "desc"
    },
  })

  return scores
}

export async function getContributorScores(authorId: string) {
  const scores = await prisma.score.findMany()
  return scores
}

export async function createScore(contributorId: string, input: CreateScoreSchema) {
  const contributor = findContributorByEmail({ id: contributorId })

  if (!contributor) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Contributor not found"
    })
  }

  const score = await prisma.score.create({
    data: {
      title: input.title,
      author: input.author,
      description: input.description,
      price: input.price,
      isExclusive: input.isExclusive,
      uploadedBy: {
        connect: {
          id: contributorId
        }
      }
    }
  })

  return score
}


