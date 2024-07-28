import streamlit as st
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

# Set up Streamlit
st.title("English Text OCR and Translation")

uploaded_image = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])

if uploaded_image is not None:
    image = Image.open(uploaded_image)
    st.image(image, caption='Uploaded Image', use_column_width=True)

    with st.spinner("Performing OCR and Translation..."):
        try:
            # Perform OCR using pytesseract
            text = pytesseract.image_to_string(image, lang='ben')
            st.write("Extracted Text (Bengali):", text)

            # Translate the text using the Gemini API
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
            response = result.text
            st.write("API Response:", response)  # Debug: Print raw API response

            translated_text = response
            st.write("Translated Text:", translated_text)

            # Clean up the text and parse JSON
            translated_text = translated_text.replace("```json", "").replace("```", "").strip()
            st.write("Cleaned Translated Text:", translated_text)  # Debug: Print cleaned text

            json_response = json.loads(translated_text)
            st.write("Parsed JSON Response:", json_response)  # Debug: Print parsed JSON

            # Store the JSON into MongoDB
            result_insert = collection.insert_one(json_response)
            st.write('Document inserted with _id:', result_insert.inserted_id)

        except Exception as e:
            st.error(f"An error occurred: {e}")
            st.write(e)  # Debug: Print exception message
