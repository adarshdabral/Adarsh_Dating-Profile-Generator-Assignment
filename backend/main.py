from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import random


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class UserAnswers(BaseModel):
    answers: List[str] 

# Test endpoint 
@app.get("/")
async def check_status():
    return {"message": "API is up and running!"}

# Endpoint to generate the profile description 
@app.post("/generate-description")
async def generate_profile_description(user_data: UserAnswers):
   
    user_answers = user_data.answers

    
    opening_lines = [
        "Hey, what's up! ",
        "Adventure awaits, let's see where it takes us!",
        "A passionate wanderer with a love for Netflix. ",
        "I might not be a pro photographer, but I can totally picture us together "
    ]

    
    profile_description = random.choice(opening_lines) + "\n\n"

    
    interests = [answer.strip() for answer in user_answers if answer.strip()]

    if interests:
        profile_description += "Here's a bit about me:\n"
        for idx, interest in enumerate(interests):
            profile_description += f"• {interest}\n"
        profile_description += "\n"

    
    photo_lines = [
        "My photos tell a better story than words ever could. ",
        "Take a look at my pictures – they speak for themselves!",
        "See the real me through my photos. Take a scroll.",
        "Sometimes, a photo can say it all. "
    ]
    profile_description += random.choice(photo_lines) + "\n"

    
    closing_statements = [
        "Let's see where this goes, shall we?",
        "If you're into deep conversations and spontaneous adventures, let's chat!",
        "Looking for new connections and maybe something awesome."
    ]
    profile_description += "\n" + random.choice(closing_statements)

    
    return {"description": profile_description.strip()}
