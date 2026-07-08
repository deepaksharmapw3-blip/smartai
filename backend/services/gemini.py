import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def get_health_advice(symptoms, language):
    response = model.generate_content(f"""
You are an expert AI doctor.

Reply ONLY in {language} language.

Patient symptoms:
{symptoms}

Give:
1. Possible Disease
2. First Aid
3. Medicine Suggestion
4. Emergency Level
""")

    return response.text