import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { postsQueryKeys } from '@/hooks/posts/posts.keys'
import { createPostsServerService } from '@/hooks/posts/posts.server'
import { PostsList } from './components/posts-list'

export default async function PostsPage() {
  const queryClient = new QueryClient()
  const service = createPostsServerService()

  await queryClient.prefetchQuery({
    queryKey: postsQueryKeys.getPosts({}),
    queryFn: () => service.getPosts({}),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsList />
    </HydrationBoundary>
  )
}
