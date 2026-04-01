import requests
import xml.etree.ElementTree as ET
import random
import datetime
from historical_data import add_historical_disaster

GDACS_RSS_URL = "https://gdacs.org/xml/rss.xml"

# Simulated fallback images for different disaster types using Wikipedia unrestricted CDNs
DISASTER_IMAGES = {
    "Earthquake": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Damaged_buildings_in_Port-au-Prince.jpg",
    "Flood": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Flooded_houses_in_Thailand.jpg",
    "Cyclone": "https://upload.wikimedia.org/wikipedia/commons/9/98/Hurricane_Michael_damage_in_Mexico_Beach.jpg",
    "Volcano": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Kilauea_eruption_2018.jpg",
    "Wildfire": "https://upload.wikimedia.org/wikipedia/commons/7/7c/California_wildfires_2007.jpg",
    "Default": "https://upload.wikimedia.org/wikipedia/commons/3/30/2004_Indian_Ocean_earthquake_and_tsunami.jpg"
}

def get_live_disasters():
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(GDACS_RSS_URL, headers=headers, timeout=10)
        response.raise_for_status()
        root = ET.fromstring(response.content)
        
        alerts = []
        for item in root.findall('./channel/item')[:6]:  # Get latest 6 alerts
            title = item.find('title').text if item.find('title') is not None else "Unknown Event"
            description = item.find('description').text if item.find('description') is not None else ""
            pub_date = item.find('pubDate').text if item.find('pubDate') is not None else str(datetime.datetime.now())
            link = item.find('link').text if item.find('link') is not None else ""
            
            # Extract basic geo data if available (using gdacs namespace but falling back to parsing text)
            geo_lat = item.find('{http://www.w3.org/2003/01/geo/wgs84_pos#}lat')
            geo_lon = item.find('{http://www.w3.org/2003/01/geo/wgs84_pos#}long')
            
            lat = float(geo_lat.text) if geo_lat is not None else (random.random() * 180 - 90)
            lon = float(geo_lon.text) if geo_lon is not None else (random.random() * 360 - 180)

            # Determine disaster type from title
            d_type = "Default"
            for key in DISASTER_IMAGES.keys():
                if key.lower() in title.lower():
                    d_type = key
                    break
            
            # Simulate CNN AI automated prediction based on the event
            simulated_damage_classes = ["Destroyed", "Major_Damage", "Minor_Damage", "No_Damage"]
            ai_prediction = {
                "class": random.choice(simulated_damage_classes),
                "confidence": round(random.uniform(0.65, 0.99), 3),
                "satellite_image_url": DISASTER_IMAGES[d_type],
                "satellite_image_urls": [
                    DISASTER_IMAGES[d_type],
                    "https://upload.wikimedia.org/wikipedia/commons/e/ec/Flooded_houses_in_Thailand.jpg"
                ]
            }

            event_obj = {
                "id": str(random.randint(10000, 99999)),
                "title": title,
                "type": d_type,
                "description": description,
                "date": pub_date,
                "latitude": lat,
                "longitude": lon,
                "link": link,
                "ai_analysis": ai_prediction
            }
            alerts.append(event_obj)
            add_historical_disaster(event_obj)
            
        return alerts
    except Exception as e:
        print(f"Error fetching GDACS feed: {e}")
        return []
