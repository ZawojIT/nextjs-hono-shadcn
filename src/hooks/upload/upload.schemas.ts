import { InferSchemas, Schemas } from '@/types/utils'
import { z } from 'zod'

export type UploadSchemas = InferSchemas<typeof uploadSchemas>

export const uploadSchemas = {
  uploadMedia: {
    input: z.object({
      alt: z.string().min(1, 'Alt text is required'),
      file: z.instanceof(File),
    }),
    output: z
      .object({
        id: z.number(),
        alt: z.string(),
        url: z.string().url(),
        filename: z.string(),
        mimeType: z.string(),
        filesize: z.number(),
        width: z.number().optional(),
        height: z.number().optional(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      })
      .passthrough(),
  },
} satisfies Schemas
