// src/app/upload/page.tsx
'use client'

import { useState } from 'react'
import PhotoUpload from '@/components/PhotoUpload'
import QuestionForm from '@/components/QuestionForm'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [photos, setPhotos] = useState<File[]>([])
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const router = useRouter()

  const handleGenerate = async () => {
    const formData = new FormData()
    photos.forEach((photo) => formData.append('photos', photo))
    formData.append('answers', JSON.stringify(answers))

    const res = await fetch('http://localhost:8000/generate-description', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()

    localStorage.setItem('generatedDescription', data.description)
    router.push('/generate')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Create Your Dating Profile</h1>
      <PhotoUpload photos={photos} setPhotos={setPhotos} />
      <QuestionForm answers={answers} setAnswers={setAnswers} />
      <button
        onClick={handleGenerate}
        disabled={photos.length < 1}
        className={`mt-6 w-full py-3 rounded-xl text-white font-bold transition ${
          photos.length < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
        }`}
      >
        Generate Description
      </button>
    </div>
  )
}
