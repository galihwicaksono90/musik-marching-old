import { publicProcedure, router } from "../trpc"
import { getPublisedScores } from "./score.service"
import { publishedScoresSchema } from "./score.schema"

export const scoreRouter = router({
  publishedScores: publicProcedure
    .input(publishedScoresSchema)
    .query(async ({ input }) => {
      const scores = await getPublisedScores(input)
      return scores
    })
})
