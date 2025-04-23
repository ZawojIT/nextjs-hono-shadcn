'use client'

import { useState, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { Button } from '@/components/elements/button'
import { Input } from '@/components/elements/input'
import { Label } from '@/components/elements/label'
import { useUploadMedia } from '@/hooks/upload/upload'

interface ImageUploadProps {
  onUploadSuccess: (mediaData: { id: number; url: string }) => void
  defaultPreview?: string
}

export function ImageUpload({
  onUploadSuccess,
  defaultPreview,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultPreview || null)
  const [alt, setAlt] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadMutation = useUploadMedia()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // Clean up the object URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl)
  }

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0]

    if (!file || !alt) {
      alert('Please select a file and provide alt text')
      return
    }

    try {
      uploadMutation.mutate(
        { file, alt },
        {
          onSuccess: (data) => {
            onUploadSuccess({
              id: data.id,
              url: data.url,
            })
            alert('File uploaded successfully!')
          },
          onError: (error) => {
            console.error('Upload error:', error)
            alert(
              `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
          },
        }
      )
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="alt">Alt Text</Label>
        <Input
          id="alt"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Describe the image"
        />
      </div>

      {preview && (
        <div className="mt-4 rounded-md border p-2">
          <div className="relative h-48 w-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={uploadMutation.isPending}
        className="mt-4"
      >
        {uploadMutation.isPending ? 'Uploading...' : 'Upload Image'}
      </Button>

      {uploadMutation.isError && (
        <p className="mt-2 text-sm text-red-500">
          {uploadMutation.error instanceof Error
            ? uploadMutation.error.message
            : 'Upload failed'}
        </p>
      )}
    </div>
  )
}
