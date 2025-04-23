import { QueryKeys } from '@/types/utils'
import { PostsSchemas } from './posts.schemas'

export type PostsQueryKeys = QueryKeys<PostsSchemas>

export const postsQueryKeys: PostsQueryKeys = {
  getPosts: (params) => ['posts', 'list', JSON.stringify(params)],
  getPost: (params) => ['posts', 'detail', params.id.toString()],
  createPost: (params) => ['posts', 'create', JSON.stringify(params)],
}
