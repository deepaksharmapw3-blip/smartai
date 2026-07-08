from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.gemini import get_health_advice

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomRequest(BaseModel):
    symptoms: str

@app.get("/")
def home():
    return {"message": "Smart Health Care API Running"}

@app.post("/predict")
def predict(data: SymptomRequest):
    result = get_health_advice(data.symptoms)
    return {"response": result}