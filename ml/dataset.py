import os
from PIL import Image
import torch
from torch.utils.data import Dataset
from torchvision import transforms

class DisasterDataset(Dataset):
    def __init__(self, data_dir, transform=None):
        """
        Expects a directory structure like:
        data_dir/
            class_0/
                img1.jpg
                img2.jpg
            class_1/
                ...
        """
        self.data_dir = data_dir
        self.transform = transform if transform else self.default_transforms()
        self.classes = sorted(os.listdir(data_dir))
        self.class_to_idx = {cls_name: i for i, cls_name in enumerate(self.classes)}
        self.images = self._load_images()

    def default_transforms(self):
        return transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225])
        ])

    def _load_images(self):
        images = []
        for cls_name in self.classes:
            cls_dir = os.path.join(self.data_dir, cls_name)
            if not os.path.isdir(cls_dir):
                continue
            for img_name in os.listdir(cls_dir):
                if img_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                    images.append((os.path.join(cls_dir, img_name), self.class_to_idx[cls_name]))
        return images

    def __len__(self):
        return len(self.images)

    def __getitem__(self, idx):
        img_path, label = self.images[idx]
        try:
            image = Image.open(img_path).convert("RGB")
            if self.transform:
                image = self.transform(image)
        except Exception as e:
            # Fallback for corrupted images
            print(f"Error loading image {img_path}: {e}")
            image = torch.zeros((3, 224, 224))
            
        return image, label
