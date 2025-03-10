import os
import openai
from dotenv import load_dotenv, find_dotenv

# Chargement des variables d'environnement
load_dotenv(find_dotenv())

# Configuration de la clé API
openai.api_key = os.getenv("OPENAI_API_KEY")

print("OPENAI_API_KEY from env:", os.getenv("OPENAI_API_KEY"))


def test_gpt():
    try:
        # Test avec le modèle GPT-3.5-turbo (plus récent que text-davinci-003)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say hello in a short sentence."}
            ],
            max_tokens=50,
            temperature=0.7
        )
        print("Response:", response.choices[0].message.content.strip())
        print("Test successful! Your API key is working.")
    except Exception as e:
        print("Error:", str(e))
        print("\nTroubleshooting tips:")
        print("1. Check if your API key is correct")
        print("2. Verify your internet connection")
        print("3. Make sure you have the latest openai package installed")





def test_api_key():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY not found in environment variables")
        return False
    print("API Key found:", api_key[:8] + "..." + api_key[-4:])
    return True

if __name__ == "__main__":
    print("Testing OpenAI API configuration...")
    if test_api_key():
        print("\nTesting API connection...")
        test_gpt() 