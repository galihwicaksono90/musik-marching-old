import { publicProcedure, router } from "../trpc"
import { getPublisedMusics } from "./music.service"

import { protectedProcedure } from "../middlewares"

export const musicRouter = router({
  publishedMusics: publicProcedure.query(async () => {
    const musics = await getPublisedMusics()
    return musics
  })
})
