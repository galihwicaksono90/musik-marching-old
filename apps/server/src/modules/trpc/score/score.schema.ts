import { z } from "zod"

export const paginationSchema = z.object({
  take: z.number().optional().default(10),
  skip: z.number().optional(),
  cursor: z.string().optional()
})

export const orderEnum = z.enum(["asc", "desc"])

export const scoreSortingSchema = z.object({
  createdAt: orderEnum.optional().default('desc'),
  price: orderEnum.optional()
})


export const publishedScoresSchema = z.object({
  pagination: paginationSchema.optional(),
  title: z.string().optional().default(""),
  tagIds: z.array(z.string()).default([]),
  sorting: scoreSortingSchema.optional()
})

export type ScoreOrderSchema = z.infer<typeof scoreSortingSchema>
export type Pagination = z.infer<typeof paginationSchema>
export type PublishedScoresSchema = z.infer<typeof publishedScoresSchema>
