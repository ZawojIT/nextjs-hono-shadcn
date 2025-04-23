'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/elements/button'
import { Input } from '@/components/elements/input'
import { Label } from '@/components/elements/label'
import { ImageUpload, ImageUploadRef } from '../../components/ImageUpload'
import { useCreatePost } from '@/hooks/posts/posts'
import { useToast } from '@/hooks/shadcn/use-toast'
import { toast as sonnerToast } from 'sonner'

export function PostForm() {
  const router = useRouter()
  const createPostMutation = useCreatePost()
  const { toast } = useToast()
  const imageUploadRef = useRef<ImageUploadRef>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadedImage, setUploadedImage] = useState<{
    id: number
    url: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!title || !description) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all fields',
        variant: 'destructive',
      })
      setIsSubmitting(false)
      return
    }

    try {
      let imageId = uploadedImage?.id

      // If image not already uploaded, try to upload it now
      if (!imageId && imageUploadRef.current) {
        const uploadResult = await imageUploadRef.current.handleUpload()
        if (!uploadResult) {
          // Image upload failed, abort post creation
          setIsSubmitting(false)
          return
        }
        // The uploaded image ID will be set by the onUploadSuccess callback
        // which updates the uploadedImage state
      }

      // Wait a bit to ensure state is updated with the uploaded image
      if (!imageId && uploadedImage?.id) {
        imageId = uploadedImage.id
      }

      if (!imageId) {
        toast({
          title: 'Missing Image',
          description: 'Please upload an image for your post',
          variant: 'destructive',
        })
        setIsSubmitting(false)
        return
      }

      await createPostMutation.mutateAsync(
        {
          title,
          description,
          image: imageId,
        },
        {
          onSuccess: () => {
            sonnerToast.success('Post created successfully!')
            // Reset form
            setTitle('')
            setDescription('')
            setUploadedImage(null)
            // Redirect to posts list
            router.push('/posts')
          },
          onError: (error) => {
            console.error('Error creating post:', error)
            toast({
              title: 'Post Creation Failed',
              description:
                error instanceof Error
                  ? error.message
                  : 'An unexpected error occurred',
              variant: 'destructive',
            })
          },
        }
      )
    } catch (error) {
      console.error('Error creating post:', error)
      toast({
        title: 'Post Creation Failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
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
          ref={imageUploadRef}
          onUploadSuccess={(mediaData) => setUploadedImage(mediaData)}
          onUploadError={(error) => {
            console.error('Upload error in form:', error)
            // The error toast is already shown in the ImageUpload component
          }}
          defaultPreview={uploadedImage?.url}
          hideUploadButton={true}
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
          isSubmitting || createPostMutation.isPending || !title || !description
        }
        className="w-full"
      >
        {isSubmitting || createPostMutation.isPending
          ? 'Creating Post...'
          : 'Create Post'}
      </Button>
    </form>
  )
}
