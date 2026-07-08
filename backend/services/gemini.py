import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def get_health_advice(symptoms: str, language: str = "English") -> str:
    """
    Calls Gemini AI to analyze symptoms and return health advice
    in the specified language (English, Hindi, Bengali, etc.)
    """
    prompt = f"""
You are an expert AI doctor.

Reply ONLY in {language} language. Use clear formatting with numbered points.

Patient symptoms:
{symptoms}

Provide:
1. Possible Disease
2. First Aid / Immediate Steps
3. Medicine Suggestion (over-the-counter if applicable)
4. Emergency Level (Low / Medium / High)

Important: Be concise, clear, and compassionate. Always recommend consulting a real doctor for serious conditions.
"""
    response = model.generate_content(prompt)
    return response.text