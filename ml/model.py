import torch
import torch.nn as nn
from torchvision import models

class DisasterDamageCNN(nn.Module):
    def __init__(self, num_classes=4, pretrained=True):
        super(DisasterDamageCNN, self).__init__()
        # Using ResNet50 as the backbone
        # Warning: `pretrained` is deprecated in newer torchvision versions, but we'll use weights=ResNet50_Weights.DEFAULT
        # For broader compatibility, we can just use models.resnet50(pretrained=pretrained)
        self.backbone = models.resnet50(pretrained=pretrained)
        
        # Replace the final fully connected layer to match our num_classes
        in_features = self.backbone.fc.in_features
        self.backbone.fc = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(in_features, num_classes)
        )

    def forward(self, x):
        return self.backbone(x)

if __name__ == "__main__":
    # Test the model structure
    model = DisasterDamageCNN(num_classes=4)
    dummy_input = torch.randn(1, 3, 224, 224)
    output = model(dummy_input)
    print("Model output shape:", output.shape)
