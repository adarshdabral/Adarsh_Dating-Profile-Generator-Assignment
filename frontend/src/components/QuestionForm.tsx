'use client'

interface QuestionFormProps {
  answers: string[]
  setAnswers: (answers: string[]) => void
}

const defaultQuestions = [
  "What's something you're passionate about?",
  "What does your perfect weekend look like?",
  "What are you looking for in a partner?"
]

export default function QuestionForm({ answers, setAnswers }: QuestionFormProps) {
  const handleChange = (index: number, value: string) => {
    const updated = [...answers]
    updated[index] = value
    setAnswers(updated)
  }

  return (
    <div className="space-y-4">
      <label className="block font-semibold">Optional Questions</label>
      {defaultQuestions.map((q, i) => (
        <div key={i}>
          <p className="text-sm text-gray-600 mb-1">{q}</p>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows={2}
            value={answers[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder="Type your answer (or leave blank)..."
          />
        </div>
      ))}
    </div>
  )
}
