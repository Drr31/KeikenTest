# Local Explorer

Local Explorer is a fullstack application designed to help users discover local activities based on their current location, real-time weather, and personalized activity suggestions. The app integrates geolocation, the Weatherstack API for weather data, and Google Maps for visualizing your location and nearby points of interest. It features a modern UI built with React, Bootstrap, and smooth animations via Framer Motion.

## Features

- **Geolocation & Weather Data:**  
  Automatically retrieves the user’s location and fetches current weather data using the Weatherstack API.
  
- **Activity Suggestions:**  
  Provides recommendations for activities based on current weather conditions (using placeholder logic with room for future enhancements).

- **Google Maps Integration:**  
  Displays a map centered on the user’s location along with nearby points of interest.

- **City Search:**  
  Users can search for weather and suggestions for any city.

- **Responsive, Modern UI:**  
  Built with React and styled with Bootstrap and Framer Motion for smooth animations and a polished look.

## Technologies Used

- **Backend:**  
  - Python, Flask, Flask-CORS  
  - Requests, python-dotenv  
  - Weatherstack API

- **Frontend:**  
  - React, Axios  
  - Bootstrap, Framer Motion  
  - Google Maps JavaScript API (via `@react-google-maps/api`)

## Getting Started

### Prerequisites

- Node.js and npm installed.
- Python 3.x installed.
- A GitHub account.
- API keys for Weatherstack and Google Maps.

### Installation

#### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
```
python -m venv env
# On macOS/Linux:
source env/bin/activate
# On Windows:
env\Scripts\activate


Install required Python packages:
 ```
bash
pip install -r requirements.txt
 ```

 Start the Flask server:
 ```
bash
python app.py
 ```

 Usage
Geolocation:
Click the "Get My Location" button to allow the app to detect your current position.

City Search:
Use the search box to fetch weather data and suggestions for a specific city.

Map:
View your location and nearby points of interest on an interactive Google Map.

Deployment
For production, consider deploying:

The Flask backend on platforms such as Heroku, Render, or AWS.
The React frontend on platforms like Vercel, Netlify, or GitHub Pages.
Make sure to configure your environment variables (API keys) appropriately on your chosen hosting platforms.
