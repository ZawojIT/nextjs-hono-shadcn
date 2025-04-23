'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { usersQueryKeys } from './users.keys'
import { UsersSchemas } from './users.schemas'

// User creation hook using TanStack Query
export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (
      data: UsersSchemas['createUser']['input']
    ): Promise<UsersSchemas['createUser']['output']> => {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create user')
      }

      return response.json()
    },
  })
}

// Users fetching hook
export const useUsers = (filters?: UsersSchemas['getUsers']['input']) => {
  return useQuery({
    queryKey: usersQueryKeys.getUsers(filters),
    queryFn: async (): Promise<UsersSchemas['getUsers']['output']['docs']> => {
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

      const url = `/api/users${queryParams ? `?${queryParams}` : ''}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data: UsersSchemas['getUsers']['output'] = await response.json()
      return data.docs
    },
  })
}

// Single user fetching hook
export const useUser = (id: string | number) => {
  return useQuery({
    queryKey: usersQueryKeys.getUser({ id }),
    queryFn: async (): Promise<UsersSchemas['getUser']['output']> => {
      const response = await fetch(`/api/users/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      return response.json()
    },
    enabled: !!id,
  })
}
