from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS, cross_origin
from PIL import Image
import pytesseract
import os
import google.generativeai as genai
from pymongo import MongoClient
import json
from dotenv import load_dotenv

load_dotenv()

# Set the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

# Ensure the TESSDATA_PREFIX environment variable is set correctly
os.environ['TESSDATA_PREFIX'] = r'C:\\Program Files\\Tesseract-OCR\\tessdata'

# Set up MongoDB client
client = MongoClient(os.getenv('MongoDBURI'))  # Corrected URI
database = client['students_info']  # Select the database
collection = database['students']  # Select the collection

# Initialize the Gemini API client
genAI = genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")
model = genai.GenerativeModel('gemini-pro')

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Define your 404 error handler to redirect to the index page
@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('index'))

@app.route('/api/upload', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        try:
            print(request.data)
            file = request.data['image']
            image = Image.open(file)
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

            response = model.generate_content(prompt)
            
            if response.text:
                return response.text
            else:
                return "Sorry, but I think Gemini didn't want to answer that!"
        except Exception as e:
            return "Sorry, but Gemini didn't want to answer that!"

    return render_template('index.html', **locals())

if __name__ == '__main__':
    app.run(debug=True, port=8080)