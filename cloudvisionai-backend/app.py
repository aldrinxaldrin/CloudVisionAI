from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import os
import io

app = Flask(__name__)
CORS(app)

# Folders
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- CHANGE THESE TWO THINGS ONLY ---
MODEL_PATH = 'model/cloudvisionai_model.h5'          # Keep this exact if your model is in /model folder
CLASS_NAMES = ['cloudy', 'rain', 'shine', 'sunrise'] # ←←← PUT YOUR REAL CLASSES HERE IN EXACT ORDER FROM TRAINING!
# Example if you used the 11-class dataset:
# CLASS_NAMES = ['dew', 'fogmist', 'frost', 'glaze', 'hail', 'lightning', 'rain', 'rainbow', 'rime', 'sandstorm', 'snow']

print("Loading model... (this may take 10-30 seconds on first start)")
model = load_model(MODEL_PATH)
print("Model loaded successfully!")
print(f"Classes: {CLASS_NAMES}")

def prepare_image(file_stream):
    # Works with uploaded file directly (no need to save to disk first)
    img = Image.open(file_stream)
    img = img.resize((224, 224))
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32') / 255.0
    return img_array

@app.route('/')
def home():
    return "<h1>CloudvisionAI API is LIVE!</h1><p>Send POST request with image to /predict</p>"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Process directly from memory (faster & safer on free hosts)
        img_array = prepare_image(file.stream)
        predictions = model.predict(img_array)[0]
        
        confidence = float(np.max(predictions))
        predicted_class = CLASS_NAMES[np.argmax(predictions)]
        all_probs = {name: round(float(prob), 4) for name, prob in zip(CLASS_NAMES, predictions)}

        return jsonify({
            'prediction': predicted_class,
            'confidence_percent': round(confidence * 100, 2),
            'all_probabilities': all_probs
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))