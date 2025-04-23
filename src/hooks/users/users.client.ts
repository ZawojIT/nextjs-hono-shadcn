import { ClientService } from '@/types/utils'
import { UsersSchemas } from './users.schemas'

export const createUsersClientService = (): ClientService<UsersSchemas> => {
  return {
    getUsers: async (params, ctx) => {
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

      const url = `/api/users${queryParams ? `?${queryParams}` : ''}`
      const response = await fetch(url, { signal: ctx.signal })

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      return response.json()
    },

    getUser: async (params, ctx) => {
      const response = await fetch(`/api/users/${params.id}`, {
        signal: ctx.signal,
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      return response.json()
    },

    createUser: async (params, ctx) => {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        signal: ctx.signal,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create user')
      }

      return response.json()
    },
  }
}
