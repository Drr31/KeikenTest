<<<<<<< HEAD

=======
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv, find_dotenv
import openai
from openai.error import OpenAIError, RateLimitError, InvalidRequestError
from utils import usage_tracker
import logging

# Chargement des variables d'environnement
load_dotenv(find_dotenv())

# Configuration des clés API
weatherstack_api_key = os.getenv('WEATHERSTACK_API_KEY')
openai_api_key = os.getenv('OPENAI_API_KEY')

# Vérification des clés API
if not weatherstack_api_key:
    raise ValueError("WEATHERSTACK_API_KEY non trouvée dans les variables d'environnement")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY non trouvée dans les variables d'environnement")

# Configuration de l'API OpenAI
openai.api_key = openai_api_key

app = Flask(__name__)
CORS(app)

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='api.log'
)
logger = logging.getLogger(__name__)

@app.after_request
def log_response(response):
    if response.status_code >= 400:
        logger.error(f"Request failed: {response.status_code} - {response.get_data(as_text=True)}")
    return response

# Route de test
@app.route('/test')
def test():
    return jsonify({"message": "Server is running!", "status": "ok"})

# Endpoint météo
@app.route('/api/weather', methods=['GET'])
def get_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    city = request.args.get('city')
    units = request.args.get('units', 'm')
    
    if city:
        url = f'http://api.weatherstack.com/current?access_key={weatherstack_api_key}&query={city}&units={units}'
    else:
        url = f'http://api.weatherstack.com/current?access_key={weatherstack_api_key}&query={lat},{lon}&units={units}'
    
    response = requests.get(url)
    return jsonify(response.json())

# Endpoint suggestions avec OpenAI
@app.route('/api/suggestions', methods=['POST'])
def get_suggestions():
    if not usage_tracker.can_make_request():
        return jsonify({
            'suggestion': "Too many requests. Please wait a moment before trying again.",
            'error': "Rate limit exceeded"
        }), 429
    
    try:
        data = request.json
        weather_context = data.get('context', {})
        weather = weather_context.get('weather', {})
        current = weather.get('current', {})
        location = weather.get('location', {})
        
        # Vérification des données requises
        if not current or not location:
            return jsonify({
                'suggestion': "I need more weather information to make a good suggestion.",
                'error': "Insufficient weather data"
            }), 400

        # Construction d'un prompt plus détaillé
        prompt = f"""Given the following weather conditions in {location.get('name', 'this location')}:
        - Temperature: {current.get('temperature')}°C
        - Weather: {', '.join(current.get('weather_descriptions', []))}
        - Time: {weather_context.get('time', 'current time')}
        - Humidity: {current.get('humidity')}%
        - Wind: {current.get('wind_speed')} km/h
        - Visibility: {current.get('visibility')} km

        Suggest a suitable activity or two that would be enjoyable in these conditions. 
        Keep the suggestion concise but specific to the weather conditions."""

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a local activity advisor who specializes in weather-appropriate suggestions."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=150,
                temperature=0.7,
                timeout=10  # Timeout après 10 secondes
            )
            
            suggestion = response.choices[0].message.content.strip()
            
            # Vérification de la longueur de la réponse
            if len(suggestion) < 10:
                raise ValueError("Response too short")
                
            return jsonify({'suggestion': suggestion})
            
        except RateLimitError:
            print("Rate limit exceeded")
            return jsonify({
                'suggestion': "I'm getting too many requests right now. Try again in a moment.",
                'error': "Rate limit exceeded"
            }), 429
            
        except InvalidRequestError as e:
            print(f"Invalid request: {str(e)}")
            return jsonify({
                'suggestion': "I couldn't process that request. Please try again.",
                'error': str(e)
            }), 400
            
        except OpenAIError as e:
            print(f"OpenAI API error: {str(e)}")
            return jsonify({
                'suggestion': "The AI service is currently unavailable. Try again later.",
                'error': str(e)
            }), 503
            
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({
            'suggestion': "I can't access the AI at the moment, but how about a weather-appropriate activity?",
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    print(f"Using Weatherstack API Key: {weatherstack_api_key[:5]}...")
    app.run(host='0.0.0.0', port=5001, debug=True)
>>>>>>> fbe15d94 (Push all the code into github)
