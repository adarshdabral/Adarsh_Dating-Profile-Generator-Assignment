'use client'

import { useState } from 'react'
import PhotoUpload from '@/components/PhotoUpload'
import QuestionForm from '@/components/QuestionForm'

export default function HomePage() {
  // State variables
  const [photos, setPhotos] = useState<File[]>([])
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [profileDescription, setProfileDescription] = useState('')
  const [isEditing, setIsEditing] = useState(false)


  const generateProfileDescription = async () => {
    if (photos.length === 0) return

    setIsLoading(true)

    const base64Photos = await Promise.all(
      photos.map(photo => new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(photo)
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
      }))
    )

   
    const requestBody = {
      answers: answers,
      photos: base64Photos.map((dataUrl, index) => ({
        name: photos[index].name,
        dataUrl: dataUrl
      }))
    }

    try {
      // Send the data to the server
      const response = await fetch('http://localhost:8000/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) throw new Error('Something went wrong while generating the description')

      const responseData = await response.json()
      setProfileDescription(responseData.description)

      setIsLoading(false)
    } catch (error) {
      console.error('Error generating description:', error)
      setIsLoading(false)
    }
  }

 
  const copyToClipboard = () => {
    if (profileDescription) {
      navigator.clipboard.writeText(profileDescription)
      alert('Your description has been copied to clipboard!')
    }
  }


  const toggleEditMode = () => {
    setIsEditing(prev => !prev)
  }

  const updateDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileDescription(event.target.value)
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Create Your Perfect Dating Profile</h1>

      <div className="space-y-8">

        <PhotoUpload photos={photos} setPhotos={setPhotos} />

        <QuestionForm answers={answers} setAnswers={setAnswers} />

   
        <button
          disabled={photos.length === 0 || isLoading}
          onClick={generateProfileDescription}
          className={`w-full py-3 rounded-xl text-white font-bold transition ${
            photos.length === 0 || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          {isLoading ? 'Generating Profile...' : 'Generate My Profile'}
        </button>

        {/* Profile Description */}
        {profileDescription && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Your Generated Profile Description:</h2>

            {/* Edit */}
            {isEditing ? (
              <textarea
                className="w-full p-4 border rounded-xl"
                value={profileDescription}
                onChange={updateDescription}
                rows={6}
              />
            ) : (
              <p>{profileDescription}</p>
            )}


            <div className="flex gap-4">
              <button
                onClick={toggleEditMode}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {isEditing ? 'Save Changes' : 'Edit Description'}
              </button>
        {/* Copy */}
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Copy to Clipboard
              </button>
            </div>

          
          </div>
        )}
      </div>
    </main>
  )
}
