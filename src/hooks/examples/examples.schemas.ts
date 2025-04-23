import { InferSchemas, Schemas } from '@/types/utils'
import { z } from 'zod'

export type ExamplesSchemas = InferSchemas<typeof examplesSchemas>

export const examplesSchemas = {
  getExample: {
    input: z.object({ id: z.string() }),
    output: z.object({ id: z.string() }),
  },
} satisfies Schemas
