
import json
import random

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from gtts import gTTS
from pydantic import BaseModel

app = FastAPI()
origins=["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class TextRequest(BaseModel):
    text: str

@app.post("/tts")
async def text_to_speech(request: TextRequest):
    try:
        text = request.text
        tts = gTTS(text, lang='en')
        audio_stream = tts.stream()  
        return StreamingResponse(audio_stream, media_type="audio/mpeg")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating speech: {str(e)}")

@app.get("/questions")
async def q_and_a():
        with open('test2.json', 'r') as json_file:
            q_and_a = json.load(json_file)
            random_questions = random.sample(q_and_a, 10)
        return random_questions

