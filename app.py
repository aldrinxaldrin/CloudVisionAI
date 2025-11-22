from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)
CORS(app)

os.makedirs('uploads', exist_ok=True)

print("Loading model... (this takes 10-20 seconds)")
model = load_model('model/cloudvisionai_model.h5')
print("Model loaded!")

# ←←← CHANGE THIS LIST TO YOUR EXACT CLASSES ←←←
CLASS_NAMES = ['cloudy', 'rain', 'shine', 'sunrise']  # Example – put your real folder names here!!

def prepare_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array

@app.route('/')
def home():
    return "CloudvisionAI backend is working!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file'}), 400
    
    file = request.files['file']
    filepath = os.path.join('uploads', file.filename)
    file.save(filepath)

    try:
        img_array = prepare_image(filepath)
        preds = model.predict(img_array)[0]
        confidence = float(np.max(preds))
        result = CLASS_NAMES[np.argmax(preds)]

        os.remove(filepath)
        return jsonify({
            'prediction': result,
            'confidence': round(confidence * 100, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)