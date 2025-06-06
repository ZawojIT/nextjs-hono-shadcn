'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/elements/button'
import { Input } from '@/components/elements/input'
import { Label } from '@/components/elements/label'
import { useCreatePost } from '@/hooks/posts/posts'
import { useToast } from '@/hooks/shadcn/use-toast'
import { ImageUpload, ImageUploadRef } from '@/app/(app)/components/ImageUpload'

export function PostForm() {
  const router = useRouter()
  const createPostMutation = useCreatePost()
  const { toast } = useToast()
  const imageUploadRef = useRef<ImageUploadRef>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log('Form submission started')

    if (!title || !description) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields',
        variant: 'destructive',
      })
      setIsSubmitting(false)
      return
    }

    try {
      if (isFileSelected && imageUploadRef.current) {
        console.log('Uploading image as part of form submission')
        const uploadSuccess = await imageUploadRef.current.handleUpload()

        if (!uploadSuccess) {
          toast({
            title: 'Image Upload Failed',
            description: 'Unable to upload the image',
            variant: 'destructive',
          })
          setIsSubmitting(false)
          return
        }
      }

      // The actual image ID will be provided via the onUploadSuccess callback
      // which will be called by the ImageUpload component after successful upload
    } catch (error) {
      console.error('Error during image upload:', error)
      toast({
        title: 'Image Upload Failed',
        description: 'An unexpected error occurred during image upload',
        variant: 'destructive',
      })
      setIsSubmitting(false)
      return
    }
  }

  const handleImageUploadSuccess = (mediaData: { id: number; url: string }) => {
    console.log('Image uploaded successfully:', mediaData)

    // Now proceed with post creation using the uploaded image
    createPost(mediaData.id)
  }

  const createPost = async (imageId?: number) => {
    try {
      const postData = {
        title,
        description,
        ...(imageId ? { image: imageId } : {}),
      }

      console.log('Creating post with data:', postData)

      await createPostMutation.mutateAsync(postData, {
        onSuccess: () => {
          console.log('Post created successfully')
          toast({
            title: 'Post created successfully!',
          })
          // Reset form
          setTitle('')
          setDescription('')
          setIsFileSelected(false)
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
          setIsSubmitting(false)
        },
      })
    } catch (error) {
      console.error('Error creating post:', error)
      toast({
        title: 'Post Creation Failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  }

  const handleFileSelected = () => {
    setIsFileSelected(true)
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

      <div className="grid w-full items-center gap-1.5">
        <ImageUpload
          ref={imageUploadRef}
          onUploadSuccess={handleImageUploadSuccess}
          hideUploadButton={true}
          onFileSelected={handleFileSelected}
        />
      </div>

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
