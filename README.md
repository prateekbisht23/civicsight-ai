# 🏙️ CivicSight AI

**AI-Powered Civic Issue Detection and Reporting Platform**  
Detect and report urban infrastructure issues like potholes, trash, and signage violations through intelligent image and speech processing.

---

## 🔧 Features

- 🖼️ **Civic Issue Classification** from images using deep learning.
- 🚗 **Object Detection** to locate contextual elements (cars, signs, humans).
- 📸 **Image-to-Text Generation** to auto-describe issues for accessibility.
- 🎙️ **Voice Reporting** via Whisper-powered speech-to-text.
- 🌍 **Geolocation Tagging** with Mapbox + OpenStreetMaps.
- 🌐 **Multilingual Support** with on-the-fly translation.
- 🧠 **Admin Dashboard** for monitoring and feedback-based model retraining.

---

## 📦 Tech Stack

| Layer     | Stack |
|-----------|-------|
| Frontend  | React, React Native, TailwindCSS |
| Backend   | FastAPI, PostgreSQL + PostGIS |
| Models    | Hugging Face Transformers |
| DevOps    | Docker, Railway, Vercel, GitHub Actions |
| APIs      | Google Maps API, Twilio, Hugging Face Hub |

---

## 🧠 Model Pipeline

1. **Upload or record** an image/audio.
2. **Model Inference**: Classify issue → detect objects → caption image → transcribe audio.
3. **Geotag** and **submit** to the backend.
4. **Dashboard visualization** + feedback collection.

---

## 🚀 Local Setup

```bash
git clone https://github.com/yourname/civicsight-ai
cd civicsight-ai
cp .env.example .env
docker-compose up --build
