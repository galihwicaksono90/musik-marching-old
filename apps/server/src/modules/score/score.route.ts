import { contributorProcedure, publicProcedure, router } from "../../libs/trpc"
import { getPublisedScores, createScore } from "./score.service"
import { publishedScoresSchema, createScoreSchema } from "./score.schema"
import { prisma } from "../../prisma"

export const scoreRouter = router({
  publishedScores: publicProcedure
    .input(publishedScoresSchema)
    .query(async ({ input }) => {
      const scores = await getPublisedScores(input)
      return scores
    }),

  all: publicProcedure
    .query(async () => {
      return await prisma.score.findMany()
    }),
  create: contributorProcedure
    .input(createScoreSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not found")
      }
      const score = await createScore(ctx.user.id, input)
      return score
    })
})
