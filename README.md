# Dating Profile Generator

This project is a web application that assists users in generating personalized dating profile descriptions based on their inputs. It includes a frontend for user interaction and a backend API that generates profile descriptions.

## Features

- Upload up to 4 profile photos (mandatory for generation)
- Answer personality-based questions
- Generate a tailored dating profile description
- Edit and copy the generated text before use
- Responsive design for all screen sizes

## Technology Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React

### Backend
- FastAPI (Python)
- Pydantic for validation
- CORS middleware for cross-origin support

## Application Architecture

- The **frontend** allows users to:
  - Upload images (client-side only)
  - Submit answers to questions
  - View and interact with the generated description

- The **backend**:
  - Exposes a POST endpoint at `/generate-description`
  - Processes a list of user-submitted answers
  - Constructs a human-like profile description using randomized templates and formatting

## Design Decisions

- **Natural Tone Generation**: The backend uses randomized intro lines, bullet points for personality traits, and closing remarks to mimic human-written content.
- **Photo Upload Enforcement**: Photo uploads are mandatory to encourage authenticity and completeness of user profiles. However, images are not stored or sent to the backend.
- **Stateless Backend**: No user data is stored or logged. The service only processes input and returns output.

## Assumptions

- Users must upload at least one photo (and up to four) to proceed.
- Answers are optional, but their inclusion significantly improves the quality and personalization of the description.
- There is no user authentication or persistent storage in this application.

## Run the Frontend
-cd frontend
-npm install
-npm run dev

## Run the backend
-cd backend
-python -m venv venv
-venv\Scripts\activate
-pip install -r requirements.txt
-uvicorn main:app --reload

