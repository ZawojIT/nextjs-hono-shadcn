'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/elements/button'
import { Input } from '@/components/elements/input'
import { Label } from '@/components/elements/label'
import { ImageUpload } from './ImageUpload'
import { useCreatePost } from '@/hooks/posts/posts'

export function PostForm() {
  const router = useRouter()
  const createPostMutation = useCreatePost()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadedImage, setUploadedImage] = useState<{
    id: number
    url: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !uploadedImage) {
      alert('Please fill all fields and upload an image')
      return
    }

    try {
      await createPostMutation.mutateAsync(
        {
          title,
          description,
          image: uploadedImage.id,
        },
        {
          onSuccess: () => {
            alert('Post created successfully!')
            // Reset form
            setTitle('')
            setDescription('')
            setUploadedImage(null)
            // Redirect to posts list
            router.push('/posts')
          },
        }
      )
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter post description"
          className="flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>

      <div className="rounded-md border p-4">
        <h3 className="mb-2 font-medium">Upload Image</h3>
        <ImageUpload
          onUploadSuccess={(mediaData) => setUploadedImage(mediaData)}
          defaultPreview={uploadedImage?.url}
        />
      </div>

      {uploadedImage && (
        <div className="rounded-md border bg-green-50 p-2">
          <p className="text-sm text-green-600">Image uploaded successfully!</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={
          createPostMutation.isPending ||
          !title ||
          !description ||
          !uploadedImage
        }
        className="w-full"
      >
        {createPostMutation.isPending ? 'Creating Post...' : 'Create Post'}
      </Button>
    </form>
  )
}
