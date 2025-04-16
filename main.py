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

class AnswersRequest(BaseModel):
    answers: List[str]

@app.get("/")
async def read_root():
    return {"message": "API is live!"}

@app.post("/generate-description")
async def generate_description(data: AnswersRequest):
    answers = data.answers

    intro_phrases = [
        "Hey there! ",
        "Looking for someone to vibe with?",
        "Adventurer by day, Netflix expert by night.",
        "I may not be a photographer, but I can picture us together "
    ]

    base_desc = random.choice(intro_phrases) + "\n\n"

    interests = [a.strip() for a in answers if a.strip()]
    
    if interests:
        base_desc += "Here's a little about me:\n"
        for i, interest in enumerate(interests):
            base_desc += f"• {interest}\n"
        base_desc += "\n"

    photo_hint = [
        "Got a few snapshots that say more than words ever could. 📸",
        "Check out my pics – they tell their own story!",
        "Swipe through and see the real me.",
        "Because sometimes a smile in a photo says it all."
    ]
    base_desc += random.choice(photo_hint) + "\n"

    closing = [
        "Let’s connect and see where this goes!",
        "If you're into deep convos and spontaneous plans, hit me up!",
        "Open to new adventures, genuine vibes, and maybe something amazing."
    ]
    base_desc += "\n" + random.choice(closing)

    return {"description": base_desc.strip()}
