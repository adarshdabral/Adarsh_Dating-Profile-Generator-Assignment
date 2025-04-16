'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface PhotoUploadProps {
  photos: File[]
  setPhotos: (files: File[]) => void
}

export default function PhotoUpload({ photos, setPhotos }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

  // Generate preview URLs when photos are added
  useEffect(() => {
    const newPreviews = photos.map(file => URL.createObjectURL(file))
    setPhotoPreviews(newPreviews)

    // Cleanup blob URLs on unmount
    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [photos])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + photos.length > 4) {
      alert('Maximum 4 photos allowed.')
      return
    }
    setPhotos([...photos, ...files])
  }

  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos]
    updatedPhotos.splice(index, 1)
    setPhotos(updatedPhotos)
  }

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Upload Photos (1–4 required)</label>
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        ref={inputRef}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl mb-4"
      >
        Select Photos
      </button>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {photoPreviews.map((url, idx) => (
          <div key={idx} className="relative group w-full h-32">
            <Image
              src={url}
              alt={`Uploaded ${idx + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <button
              onClick={() => removePhoto(idx)}
              className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full px-2 py-1 text-sm hidden group-hover:block"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
