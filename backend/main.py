from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import os
import uuid

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_ROOT = "uploads"
os.makedirs(UPLOAD_ROOT, exist_ok=True)

@app.post("/api/report")
async def submit_report(
    image: UploadFile = File(...),
    audio: Optional[UploadFile] = File(None),
    description: str = Form(...),
    lat: float = Form(...),
    lng: float = Form(...)
):
    # Generate unique ID for the issue
    issue_id = str(uuid.uuid4())
    issue_folder = os.path.join(UPLOAD_ROOT, issue_id)
    os.makedirs(issue_folder, exist_ok=True)

    print(f"✅ New report: {issue_id}")
    print(f"📍 Location: ({lat}, {lng})")
    print(f"📝 Description: {description}")

    # Save image
    image_path = os.path.join(issue_folder, image.filename)
    with open(image_path, "wb") as f:
        f.write(await image.read())
    print(f"🖼️ Image saved at {image_path}")

    # Save audio (if provided)
    if audio:
        audio_path = os.path.join(issue_folder, audio.filename)
        with open(audio_path, "wb") as f:
            f.write(await audio.read())
        print(f"🎙️ Audio saved at {audio_path}")
    else:
        print("🎙️ No audio provided.")

    # Save description + location in a text file
    metadata_path = os.path.join(issue_folder, "report.txt")
    with open(metadata_path, "w", encoding="utf-8") as f:
        f.write(f"Description: {description}\n")
        f.write(f"Latitude: {lat}\n")
        f.write(f"Longitude: {lng}\n")

    print(f"🗂️ Metadata saved at {metadata_path}")

    return {"message": "Report submitted successfully", "issue_id": issue_id}
