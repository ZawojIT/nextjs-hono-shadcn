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
      console.log('Mutation function called with data:', data)
      
      // Using the standard PayloadCMS API endpoint format
      // PayloadCMS uses /api/{collectionSlug} for its REST API
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ensure we're sending the data in the format PayloadCMS expects
        // For relationships like 'image', PayloadCMS might expect the ID format
        // to be different than what we have in our schema
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image: data.image, // This should be the media ID
        }),
        credentials: 'include',
      })

      console.log('API response status:', response.status)
      
      if (!response.ok) {
        let errorMessage = 'Failed to create post';
        try {
          const error = await response.json();
          console.error('API error response:', error);
          errorMessage = error.message || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        throw new Error(errorMessage);
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
