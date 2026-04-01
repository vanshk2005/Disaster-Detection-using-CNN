import sys
import os

# Add ml folder to path so we can import the predictor
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ml')))

try:
    from inference import DisasterPredictor
except ImportError:
    print("Could not import DisasterPredictor from ml/inference.py")
    DisasterPredictor = None

class ModelService:
    def __init__(self):
        model_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'best_model.pth')
        classes_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'classes.pth')
        if DisasterPredictor:
            self.predictor = DisasterPredictor(model_path, classes_path)
        else:
            self.predictor = None

    def predict(self, image_path):
        if not self.predictor:
            return {"error": "Predictor not initialized"}
        return self.predictor.predict(image_path)

model_service = ModelService()
