import { InferSchemas, Schemas } from '@/types/utils'
import { z } from 'zod'

export type UsersSchemas = InferSchemas<typeof usersSchemas>

export const usersSchemas = {
  createUser: {
    input: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      message: z.string().min(10, 'Message must be at least 10 characters'),
    }),
    output: z.object({
      success: z.boolean(),
      message: z.string(),
      data: z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
      }),
    }),
  },
  getUsers: {
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
            name: z.string(),
            email: z.string(),
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
  getUser: {
    input: z.object({
      id: z.string().or(z.number()),
    }),
    output: z
      .object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        message: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      })
      .passthrough(),
  },
} satisfies Schemas
