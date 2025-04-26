'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/elements/button'
import { createPostsClientService } from '@/hooks/posts/posts.client'
import { postsQueryKeys } from '@/hooks/posts/posts.keys'
import { useQuery } from '@tanstack/react-query'

export function PostsList() {
  const service = createPostsClientService()

  const { data, isLoading, error } = useQuery({
    queryKey: postsQueryKeys.getPosts({}),
    queryFn: (ctx) => service.getPosts({}, ctx),
  })

  const posts = data?.docs || []

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">Browse all posts</p>
        <Button asChild>
          <Link href="/posts/create">Create New Post</Link>
        </Button>
      </div>

      {isLoading && (
        <div className="py-8 text-center">
          <p>Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-red-600">Error loading posts</p>
        </div>
      )}

      {posts.length === 0 && !isLoading && !error && (
        <div className="rounded-md border py-12 text-center">
          <p className="text-muted-foreground">No posts found</p>
          <Button asChild className="mt-4">
            <Link href="/posts/create">Create your first post</Link>
          </Button>
        </div>
      )}

      {posts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block overflow-hidden rounded-md border transition-shadow hover:shadow-md"
            >
              {post.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {!post.image && (
                <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="truncate text-lg font-semibold">{post.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
