import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise EnvironmentError(
        "GEMINI_API_KEY is not set. "
        "Create a .env file in the backend folder with: GEMINI_API_KEY=your_key_here"
    )

client = genai.Client(api_key=api_key)


def get_health_advice(symptoms: str, language: str = "English") -> str:
    """
    Calls Gemini AI to analyze symptoms and return health advice
    in the specified language (English, Hindi, Bengali, etc.)
    """
    if not symptoms or not symptoms.strip():
        return "Please describe your symptoms so I can provide guidance."

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

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        return response.text
    except Exception as e:
        error_message = str(e)
        print(f"[Gemini Error] {error_message}")
        if "API_KEY" in error_message.upper() or "PERMISSION" in error_message.upper() or "INVALID" in error_message.upper():
            return "API key error: Please check your GEMINI_API_KEY configuration."
        if "QUOTA" in error_message.upper() or "RESOURCE_EXHAUSTED" in error_message.upper():
            return "The AI service is temporarily unavailable due to quota limits. Please try again later."
        if "SAFETY" in error_message.upper():
            return "The AI could not generate a response due to content safety filters. Please rephrase your symptoms."
        return f"An error occurred while contacting the AI service: {error_message}"
