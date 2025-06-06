'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/elements/button'
import { createPostsClientService } from '@/hooks/posts/posts.client'
import { postsQueryKeys } from '@/hooks/posts/posts.keys'
import { useQuery } from '@tanstack/react-query'

interface PostDetailProps {
  id: string
}

export function PostDetail({ id }: PostDetailProps) {
  const service = createPostsClientService()

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: postsQueryKeys.getPost({ id }),
    queryFn: (ctx) => service.getPost({ id }, ctx),
  })

  return (
    <>
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/posts">← Back to Posts</Link>
        </Button>
      </div>

      {isLoading && (
        <div className="py-8 text-center">
          <p>Loading post...</p>
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-red-600">Error loading post</p>
        </div>
      )}

      {post && (
        <div className="mx-auto max-w-3xl">
          {post.image ? (
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg sm:h-96">
              <Image
                src={post.image.url}
                alt={post.image.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center sm:h-96">
              <span className="text-gray-500">No image</span>
            </div>
          )}

          <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{post.description}</p>
          </div>

          <div className="mt-8 border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Created at: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
