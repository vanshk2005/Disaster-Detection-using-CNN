EQ_1 = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Damaged_buildings_in_Port-au-Prince.jpg"
FL_1 = "https://upload.wikimedia.org/wikipedia/commons/e/ec/Flooded_houses_in_Thailand.jpg"
FI_1 = "https://upload.wikimedia.org/wikipedia/commons/7/7c/California_wildfires_2007.jpg"
ST_1 = "https://upload.wikimedia.org/wikipedia/commons/9/98/Hurricane_Michael_damage_in_Mexico_Beach.jpg"
TS_1 = "https://upload.wikimedia.org/wikipedia/commons/3/30/2004_Indian_Ocean_earthquake_and_tsunami.jpg"
VL_1 = "https://upload.wikimedia.org/wikipedia/commons/b/b3/Kilauea_eruption_2018.jpg"

historical_disasters = [
    {
        "id": "hist-1906-sf",
        "title": "1906 San Francisco Earthquake",
        "type": "Earthquake / Fire",
        "description": "A major earthquake that struck San Francisco and the coast of Northern California. Devastating fires broke out and destroyed most of the city.",
        "date": "1906-04-18T13:12:00Z",
        "latitude": 37.75,
        "longitude": -122.55,
        "link": "https://en.wikipedia.org/wiki/1906_San_Francisco_earthquake",
        "ai_analysis": {
            "class": "Destroyed",
            "confidence": 0.999,
            "satellite_image_urls": [EQ_1, FI_1]
        }
    },
    {
        "id": "hist-1912-titanic",
        "title": "Sinking of the RMS Titanic",
        "type": "Manmade / Maritime",
        "description": "The British passenger liner sank in the North Atlantic Ocean after striking an iceberg during her maiden voyage.",
        "date": "1912-04-15T06:20:00Z",
        "latitude": 41.7269,
        "longitude": -49.9482,
        "link": "https://en.wikipedia.org/wiki/Sinking_of_the_RMS_Titanic",
        "ai_analysis": {
            "class": "Destroyed",
            "confidence": 0.988,
            "satellite_image_urls": [FL_1, TS_1]
        }
    },
    {
        "id": "hist-1980-sthelens",
        "title": "Mount St. Helens Eruption",
        "type": "Volcano",
        "description": "The most disastrous volcanic eruption in modern U.S. history.",
        "date": "1980-05-18T15:32:00Z",
        "latitude": 46.1912,
        "longitude": -122.1944,
        "link": "https://en.wikipedia.org/wiki/1980_eruption_of_Mount_St._Helens",
        "ai_analysis": {
            "class": "Major_Damage",
            "confidence": 0.991,
            "satellite_image_urls": [VL_1, FI_1]
        }
    },
    {
        "id": "hist-1986-chernobyl",
        "title": "Chernobyl Nuclear Disaster",
        "type": "Manmade / Industrial",
        "description": "A catastrophic nuclear accident that occurred at the Chernobyl Nuclear Power Plant in Ukraine.",
        "date": "1986-04-26T01:23:40Z",
        "latitude": 51.3895,
        "longitude": 30.0991,
        "link": "https://en.wikipedia.org/wiki/Chernobyl_disaster",
        "ai_analysis": {
            "class": "Destroyed",
            "confidence": 0.999,
            "satellite_image_urls": [FI_1, EQ_1]
        }
    },
    {
        "id": "hist-1986-bhopal",
        "title": "Bhopal Disaster",
        "type": "Manmade / Industrial",
        "description": "Considered the world's worst industrial disaster. A highly toxic gas leak at a pesticide plant in India.",
        "date": "1984-12-02T23:00:00Z",
        "latitude": 23.273,
        "longitude": 77.399,
        "link": "https://en.wikipedia.org/wiki/Bhopal_disaster",
        "ai_analysis": {
            "class": "Major_Damage",
            "confidence": 0.852,
            "satellite_image_urls": [FI_1, FL_1]
        }
    },
    {
        "id": "hist-2004-tsunami",
        "title": "2004 Indian Ocean Earthquake and Tsunami",
        "type": "Earthquake / Tsunami",
        "description": "An undersea megathrust earthquake that registered a magnitude of 9.1–9.3 Mw, triggering a series of devastating tsunamis.",
        "date": "2004-12-26T00:58:53Z",
        "latitude": 3.316,
        "longitude": 95.854,
        "link": "https://en.wikipedia.org/wiki/2004_Indian_Ocean_earthquake_and_tsunami",
        "ai_analysis": {
            "class": "Destroyed",
            "confidence": 0.998,
            "satellite_image_urls": [TS_1, FL_1]
        }
    },
    {
        "id": "hist-2005-katrina",
        "title": "Hurricane Katrina",
        "type": "Cyclone",
        "description": "A destructive Category 5 Atlantic hurricane that caused over 1,800 deaths and $125 billion in damage.",
        "date": "2005-08-29T11:10:00Z",
        "latitude": 29.9511,
        "longitude": -90.0715,
        "link": "https://en.wikipedia.org/wiki/Hurricane_Katrina",
        "ai_analysis": {
            "class": "Destroyed",
            "confidence": 0.985,
            "satellite_image_urls": [ST_1, FL_1]
        }
    },
    {
        "id": "hist-2010-deepwater",
        "title": "Deepwater Horizon Oil Spill",
        "type": "Manmade / Environmental",
        "description": "An industrial disaster that began in the Gulf of Mexico, considered the largest marine oil spill in history.",
        "date": "2010-04-20T00:00:00Z",
        "latitude": 28.7366,
        "longitude": -88.3659,
        "link": "https://en.wikipedia.org/wiki/Deepwater_Horizon_oil_spill",
        "ai_analysis": {
            "class": "Major_Damage",
            "confidence": 0.910,
            "satellite_image_urls": [FL_1, FI_1]
        }
    },
    {
        "id": "hist-2011-tohoku",
        "title": "2011 Tōhoku Earthquake and Tsunami",
        "type": "Earthquake / Tsunami",
        "description": "A magnitude 9.0–9.1 Mw undersea megathrust earthquake off the coast of Japan.",
        "date": "2011-03-11T05:46:24Z",
        "latitude": 38.297,
        "longitude": 142.373,
        "link": "https://en.wikipedia.org/wiki/2011_T%C5%8Dhoku_earthquake_and_tsunami",
        "ai_analysis": {
            "class": "Destroyed",
            "confidence": 0.975,
            "satellite_image_urls": [TS_1, EQ_1]
        }
    },
    {
        "id": "hist-2019-bushfires",
        "title": "2019–20 Australian Bushfire Season",
        "type": "Wildfire",
        "description": "A period of unusually intense bushfires in many parts of Australia.",
        "date": "2019-12-01T00:00:00Z",
        "latitude": -35.2809,
        "longitude": 149.1300,
        "link": "https://en.wikipedia.org/wiki/2019%E2%80%9320_Australian_bushfire_season",
        "ai_analysis": {
            "class": "Major_Damage",
            "confidence": 0.965,
            "satellite_image_urls": [FI_1, VL_1]
        }
    },
    {
        "id": "hist-2020-beirut",
        "title": "2020 Beirut Explosion",
        "type": "Manmade / Explosion",
        "description": "A massive explosion of ammonium nitrate stored at the Port of Beirut in Lebanon.",
        "date": "2020-08-04T15:08:18Z",
        "latitude": 33.901,
        "longitude": 35.519,
        "link": "https://en.wikipedia.org/wiki/2020_Beirut_explosion",
        "ai_analysis": {
            "class": "Destroyed",
            "confidence": 0.999,
            "satellite_image_urls": [EQ_1, FI_1]
        }
    },
    {
        "id": "hist-2023-turkeysyria",
        "title": "2023 Turkey–Syria Earthquake",
        "type": "Earthquake",
        "description": "A devastating Mw 7.8 earthquake striking southern and central Turkey and northern and western Syria.",
        "date": "2023-02-06T01:17:35Z",
        "latitude": 37.174,
        "longitude": 37.032,
        "link": "https://en.wikipedia.org/wiki/2023_Turkey%E2%80%93Syria_earthquakes",
        "ai_analysis": {
            "class": "Destroyed",
            "confidence": 0.995,
            "satellite_image_urls": [EQ_1, TS_1]
        }
    }
]

def add_historical_disaster(event):
    if not any(d['id'] == event['id'] for d in historical_disasters):
        historical_disasters.insert(0, event)
