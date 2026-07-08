from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.gemini import get_health_advice

app = FastAPI(title="Smart Health AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SymptomRequest(BaseModel):
    symptoms: str
    language: str = "English"


@app.get("/")
def home():
    return {"message": "Smart Health Care API Running"}


@app.get("/health")
def health_check():
    """Liveness probe used by Docker / load balancers."""
    return {"status": "ok"}


@app.post("/predict")
def predict(data: SymptomRequest):
    if not data.symptoms or not data.symptoms.strip():
        raise HTTPException(status_code=422, detail="symptoms field must not be empty")

    result = get_health_advice(data.symptoms, data.language)
    return {"response": result}
