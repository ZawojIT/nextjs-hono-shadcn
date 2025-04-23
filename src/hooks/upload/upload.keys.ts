import { QueryKeys } from '@/types/utils'
import { UploadSchemas } from './upload.schemas'

export type UploadQueryKeys = QueryKeys<UploadSchemas>

export const uploadQueryKeys: UploadQueryKeys = {
  uploadMedia: (params) => ['upload', 'media', params.alt],
}
