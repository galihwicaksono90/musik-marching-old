import { prisma } from "../../../prisma"
import { paginationSchema, Pagination, PublishedScoresSchema } from "./score.schema"

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
  const scores = await prisma.score.findMany({
    where: {
      authorId: authorId,
    },
    include: {
      author: true,
      tags: true,
      purchase: true
    }
  })
  return scores
}


