import os
import urllib.request
import ssl
import shutil

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

PUBLIC_DIR = r"c:\Users\kakka\Desktop\DL PROJECT\frontend\public\disasters"
os.makedirs(PUBLIC_DIR, exist_ok=True)

WIKI_IMAGES = {
    "earthquake": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Damaged_buildings_in_Port-au-Prince.jpg",
    "flood": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Flooded_houses_in_Thailand.jpg",
    "fire": "https://upload.wikimedia.org/wikipedia/commons/7/7c/California_wildfires_2007.jpg",
    "storm": "https://upload.wikimedia.org/wikipedia/commons/9/98/Hurricane_Michael_damage_in_Mexico_Beach.jpg",
    "volcano": "https://upload.wikimedia.org/wikipedia/commons/0/07/Kilauea_eruption_2018.jpg",
    "tsunami": "https://upload.wikimedia.org/wikipedia/commons/3/30/2004_Indian_Ocean_earthquake_and_tsunami.jpg"
}

def download():
    opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=ctx))
    opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
    urllib.request.install_opener(opener)

    for category, url in WIKI_IMAGES.items():
        base_filename = os.path.join(PUBLIC_DIR, f"{category}_base.jpg")
        try:
            print(f"Downloading {category}...")
            urllib.request.urlretrieve(url, base_filename)
            # Create 5 copies of this image to simulate a large dataset for the carousels
            for i in range(1, 6):
                shutil.copy(base_filename, os.path.join(PUBLIC_DIR, f"{category}_{i}.jpg"))
            print(f"Created 5 images for {category}")
        except Exception as e:
            print(f"Failed {category}: {e}")

if __name__ == "__main__":
    download()
