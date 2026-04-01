import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from torchvision import transforms
from tqdm import tqdm

from dataset import DisasterDataset
from model import DisasterDamageCNN

def train_model(data_dir, num_epochs=10, batch_size=32, learning_rate=1e-4):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")

    # Data Augmentation for training
    train_transforms = transforms.Compose([
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

    try:
        full_dataset = DisasterDataset(data_dir, transform=train_transforms)
    except Exception as e:
        print(f"Error loading dataset from {data_dir}. Ensure directory structure is correct. ({e})")
        return

    # Assuming 80-20 split
    train_size = int(0.8 * len(full_dataset))
    val_size = len(full_dataset) - train_size
    
    if train_size == 0 or val_size == 0:
        print("Dataset is too small to split. Please add more images.")
        return

    train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=4)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=4)

    num_classes = len(full_dataset.classes)
    model = DisasterDamageCNN(num_classes=num_classes).to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    best_val_loss = float('inf')

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        
        # Training loop
        print(f"Epoch {epoch+1}/{num_epochs}")
        pbar = tqdm(train_loader, desc="Training")
        for inputs, labels in pbar:
            inputs, labels = inputs.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * inputs.size(0)
            pbar.set_postfix({'loss': loss.item()})

        epoch_loss = running_loss / train_size

        # Validation loop
        model.eval()
        val_loss = 0.0
        correct = 0
        total = 0
        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                val_loss += loss.item() * inputs.size(0)
                
                _, predicted = outputs.max(1)
                total += labels.size(0)
                correct += predicted.eq(labels).sum().item()

        epoch_val_loss = val_loss / val_size
        val_accuracy = 100. * correct / total
        
        print(f"Train Loss: {epoch_loss:.4f} | Val Loss: {epoch_val_loss:.4f} | Val Acc: {val_accuracy:.2f}%")

        if epoch_val_loss < best_val_loss:
            best_val_loss = epoch_val_loss
            print(f"Saving new best model with Validation Loss: {best_val_loss:.4f}")
            torch.save(model.state_dict(), 'best_model.pth')
            # Save class mapping as well
            torch.save(full_dataset.classes, 'classes.pth')

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--data_dir', type=str, default='data', help='Path to dataset directory')
    parser.add_argument('--epochs', type=int, default=10, help='Number of epochs')
    parser.add_argument('--batch_size', type=int, default=32, help='Batch size')
    parser.add_argument('--lr', type=float, default=1e-4, help='Learning rate')
    args = parser.parse_args()
    
    if not os.path.exists(args.data_dir):
        print(f"Directory {args.data_dir} not found. Creating a dummy structure for demonstration.")
        os.makedirs(os.path.join(args.data_dir, "Destroyed"), exist_ok=True)
        os.makedirs(os.path.join(args.data_dir, "Major_Damage"), exist_ok=True)
        os.makedirs(os.path.join(args.data_dir, "Minor_Damage"), exist_ok=True)
        os.makedirs(os.path.join(args.data_dir, "No_Damage"), exist_ok=True)
        print("Please place your images into the created directories and run the script again.")
    else:
        train_model(args.data_dir, num_epochs=args.epochs, batch_size=args.batch_size, learning_rate=args.lr)
