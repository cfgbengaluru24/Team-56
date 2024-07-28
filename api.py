from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract
import os
import google.generativeai as genai
from pymongo import MongoClient
from dotenv import load_dotenv
import json
from io import BytesIO
import base64

load_dotenv()

# Set the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

# Ensure the TESSDATA_PREFIX environment variable is set correctly
os.environ['TESSDATA_PREFIX'] = r'C:\\Program Files\\Tesseract-OCR\\tessdata'

# Set up MongoDB client
client = MongoClient(os.getenv('MongoDBURI'))
database = client['students_info']
collection = database['students']

# Initialize the Gemini API client
genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def decode_base64_image(base64_string):
    header, encoded = base64_string.split(',', 1)
    data = base64.b64decode(encoded)
    return Image.open(BytesIO(data))

@app.route('/api/upload', methods=['POST'])
def upload():
    try:
        data = request.json
        
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        base64_image = data['image']
        image = decode_base64_image(base64_image)
        text = pytesseract.image_to_string(image, lang='ben')

        prompt = f"""
        Translate the following Bengali text to English and format the output as JSON with fields:
        {{
            "name": "Name in English",
            "english": "English subject details in English",
            "hindi": "Hindi subject details in English",
            "marks": {{
                "bangla": "Bangla subject details in English",
                "english": "English subject details in English",
                "math": "Math subject details in English",
                "science": "Science subject details in English",
                "social_studies": "Social Studies subject details in English"
            }},
            "attendance": {{
                "total_days": "Total days present",
                "absent": "Number of days absent",
                "late_arrival": "Number of late arrivals"
            }},
            "co_curricular": "Details of co-curricular activities in English",
            "overall_assessment": "Overall assessment in English"
        }}
        Bengali text: {text}
        """

        result = model.generate_content(prompt)
        response = result.text.strip()

        if response:
            json_response = json.loads(response.replace("```json", "").replace("```", "").strip())
            result_insert = collection.insert_one(json_response)
            return jsonify({'message': 'Document inserted', 'id': str(result_insert.inserted_id)})
        else:
            return jsonify({'error': 'Gemini API did not return a response'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
