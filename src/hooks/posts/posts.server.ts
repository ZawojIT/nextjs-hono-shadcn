import { ServerService } from '@/types/utils'
import { PostsSchemas } from './posts.schemas'

export const createPostsServerService = (): ServerService<PostsSchemas> => {
  return {
    getPosts: async (params) => {
      const queryParams = params
        ? new URLSearchParams(
            Object.entries(params).reduce(
              (acc, [key, value]) => {
                if (value !== undefined) {
                  acc[key] = String(value)
                }
                return acc
              },
              {} as Record<string, string>
            )
          ).toString()
        : ''

      const url = `/api/posts${queryParams ? `?${queryParams}` : ''}`
      const response = await fetch(url, { cache: 'no-store' })

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      return response.json()
    },

    getPost: async (params) => {
      const response = await fetch(`/api/posts/${params.id}`, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }

      return response.json()
    },

    createPost: async (params) => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create post')
      }

      return response.json()
    },
  }
}
