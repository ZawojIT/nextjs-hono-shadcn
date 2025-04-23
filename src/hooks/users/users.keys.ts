import { QueryKeys } from '@/types/utils'
import { UsersSchemas } from './users.schemas'

export type UsersQueryKeys = QueryKeys<UsersSchemas>

export const usersQueryKeys: UsersQueryKeys = {
  getUsers: (params) => ['users', 'list', JSON.stringify(params)],
  getUser: (params) => ['users', 'detail', params.id.toString()],
  createUser: (params) => ['users', 'create', JSON.stringify(params)],
}
