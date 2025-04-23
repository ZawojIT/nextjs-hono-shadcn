'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { postsQueryKeys } from './posts.keys'
import { PostsSchemas } from './posts.schemas'

interface Post {
  id: number
  title: string
  description: string
  image: {
    id: number
    url: string
    alt: string
  }
  [key: string]: any
}

interface CreatePostData {
  title: string
  description: string
  image: number // Media ID
}

// Post creation hook using TanStack Query
export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (
      data: PostsSchemas['createPost']['input']
    ): Promise<PostsSchemas['createPost']['output']> => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create post')
      }

      return response.json()
    },
  })
}

// Post fetching hook
export const usePosts = (filters?: PostsSchemas['getPosts']['input']) => {
  return useQuery({
    queryKey: postsQueryKeys.getPosts(filters),
    queryFn: async (): Promise<PostsSchemas['getPosts']['output']['docs']> => {
      // Build query string if filters are provided
      const queryParams = filters
        ? new URLSearchParams(
            Object.entries(filters).reduce(
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

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data: PostsSchemas['getPosts']['output'] = await response.json()
      return data.docs
    },
  })
}

// Single post fetching hook
export const usePost = (id: string | number) => {
  return useQuery({
    queryKey: postsQueryKeys.getPost({ id }),
    queryFn: async (): Promise<PostsSchemas['getPost']['output']> => {
      const response = await fetch(`/api/posts/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }

      return response.json()
    },
    enabled: !!id,
  })
}
