import { QueryKeys } from '@/types/utils'
import type { ExamplesSchemas } from './examples.schemas'

export type ExamplesQueryKeys = QueryKeys<ExamplesSchemas>

export const examplesQueryKeys: ExamplesQueryKeys = {
  getExample: (params) => ['examples', params.id],
}
