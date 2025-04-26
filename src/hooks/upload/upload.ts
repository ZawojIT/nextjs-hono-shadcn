'use client'

import { useMutation } from '@tanstack/react-query'
import { uploadQueryKeys } from './upload.keys'
import { UploadSchemas } from './upload.schemas'

// Post creation hook using TanStack Query
export const useUploadMedia = () => {
  return useMutation({
    mutationFn: async ({
      alt,
      file,
    }: UploadSchemas['uploadMedia']['input']): Promise<
      UploadSchemas['uploadMedia']['output']
    > => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('_payload', JSON.stringify({ alt }))

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to upload file')
      }

      const responseData = await response.json()
      console.log('Media upload response:', responseData);
      
      // Handle both direct response and doc-wrapped response
      const mediaData = responseData.doc || responseData;
      return mediaData;
    },
  })
}
