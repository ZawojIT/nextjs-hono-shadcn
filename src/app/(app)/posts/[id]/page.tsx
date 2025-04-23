import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { postsQueryKeys } from '@/hooks/posts/posts.keys'
import { createPostsServerService } from '@/hooks/posts/posts.server'
import { PostDetail } from '../../components/PostDetail'

interface PageProps {
  params: {
    id: string
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const queryClient = new QueryClient()
  const service = createPostsServerService()

  await queryClient.prefetchQuery({
    queryKey: postsQueryKeys.getPost({ id: params.id }),
    queryFn: () => service.getPost({ id: params.id }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail id={params.id} />
    </HydrationBoundary>
  )
}
