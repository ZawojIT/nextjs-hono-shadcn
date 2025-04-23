import { InferSchemas, Schemas } from '@/types/utils'
import { z } from 'zod'

export type PostsSchemas = InferSchemas<typeof postsSchemas>

export const postsSchemas = {
  getPosts: {
    input: z
      .object({
        limit: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
      })
      .optional(),
    output: z.object({
      docs: z.array(
        z
          .object({
            id: z.number(),
            title: z.string(),
            description: z.string(),
            image: z.object({
              id: z.number(),
              url: z.string().url(),
              alt: z.string(),
            }),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          })
          .passthrough()
      ),
      totalDocs: z.number(),
      limit: z.number(),
      totalPages: z.number(),
      page: z.number(),
      pagingCounter: z.number(),
      hasPrevPage: z.boolean(),
      hasNextPage: z.boolean(),
      prevPage: z.number().nullable(),
      nextPage: z.number().nullable(),
    }),
  },
  getPost: {
    input: z.object({
      id: z.string().or(z.number()),
    }),
    output: z
      .object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        image: z.object({
          id: z.number(),
          url: z.string().url(),
          alt: z.string(),
        }),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      })
      .passthrough(),
  },
  createPost: {
    input: z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description is required'),
      image: z.number(), // Media ID
    }),
    output: z
      .object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        image: z.object({
          id: z.number(),
          url: z.string().url(),
          alt: z.string(),
        }),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      })
      .passthrough(),
  },
} satisfies Schemas
