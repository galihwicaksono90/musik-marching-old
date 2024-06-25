import { prisma } from "../../../prisma"


export async function getPublisedMusics() {
  const musics = await prisma.music.findMany({
    where: {
      deletedAt: null,
      verifiedAt: {
        not: null
      }
    }
  })


  return musics
}

export async function getContributorMusics(authorId: string) {
  const musics = await prisma.music.findMany({
    where: {
      authorId: authorId,
    },
    include: {
      author: true,
      tags: true,
      purchase: true
    }
  })
  return musics
}


