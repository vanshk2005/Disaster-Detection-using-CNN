import os
import shutil
import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from inference_service import model_service
from live_feed import get_live_disasters
from historical_data import historical_disasters

app = FastAPI(title="Disaster Damage Detection API")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Disaster Damage Detection API is running."}

@app.post("/predict/")
async def predict_damage(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return {"error": "Uploaded file is not an image"}

    # Save uploaded file
    file_ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Run inference
    result = model_service.predict(file_path)
    
    # Optional: cleanup the file after prediction
    # os.remove(file_path)
    
    return result

@app.get("/live-alerts/")
def fetch_live_alerts():
    """
    Automated job endpoint:
    Fetches latest disaster alerts globally and runs the CNN damage detection 
    on the retrieved satellite imagery for those coordinates.
    """
    alerts = get_live_disasters()
    return {"status": "success", "count": len(alerts), "events": alerts}

@app.get("/historical-disasters/")
def fetch_historical_disasters():
    return {"status": "success", "count": len(historical_disasters), "events": historical_disasters}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
