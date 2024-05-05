import pymongo
import base64
import requests

# MongoDB Atlas connection URI
MONGO_URI = "mongodb://jawadhaider682:Ep8km9btNMhWJa0x@ac-puxt79s-shard-00-00.owke4n8.mongodb.net:27017,ac-puxt79s-shard-00-01.owke4n8.mongodb.net:27017,ac-puxt79s-shard-00-02.owke4n8.mongodb.net:27017/?ssl=true&replicaSet=atlas-jx0038-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

# Client ID from your Imgur application
client_id = 'b841234729f0d21'

# Path to your image
image_path = 'received_image.jpg'

# Read the binary file and encode it
with open(image_path, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

url = "https://api.imgur.com/3/image"
payload = {'image': encoded_string}
headers = {'Authorization': 'Client-ID ' + client_id}

# First, upload an image to Imgur
imgur_response = requests.post(url, headers=headers, data=payload)

most_confident_plate_number = ""

if imgur_response.status_code == 200:
    try:
        # Get the image link
        image_link = imgur_response.json()['data']['link']
        print("Image uploaded successfully. Link:", image_link)

        # Number plate detection
        url = "https://openalpr.p.rapidapi.com/recognize_url"
        querystring = {"country": "eu"}
        payload = {"image_url": image_link}
        headers = {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": "ae8adf0096mshce5307163e52132p1895a3jsnb07be5907431",
            "X-RapidAPI-Host": "openalpr.p.rapidapi.com"
        }
        response = requests.post(url, data=payload, headers=headers, params=querystring)

        data = response.json()
        if 'results' in data and data['results']:
            plates = data['results'][0]['candidates']
            most_confident_plate = max(plates, key=lambda x: x['confidence'])
            most_confident_plate_number = most_confident_plate['plate']
            most_confident_plate_confidence = most_confident_plate['confidence']
            print("Most confident plate:", most_confident_plate_number, "with confidence:", most_confident_plate_confidence)

        else:
            print("No plates detected in the image.")
    except KeyError:
        print("Error: Could not retrieve image link from Imgur response.")

print("Most confident plate number:", most_confident_plate_number)

# Connect to MongoDB Atlas
try:
    client = pymongo.MongoClient(MONGO_URI)
    db = client.test  # Change to your database name
    collection = db.admins  # Change to your collection name

    # Find document with userName "DaftarKhwan"
    document = collection.find_one({"userName": "DaftarKhwan"})

    if document:
        floorsPlan = document.get('floorsPlan', [])
        # If no available slot found, find and update the booked slot with the same plate number
        found_slot = False
        for floor in floorsPlan:
            for row in floor:
                for cell in row:
                    if cell['name'] == "Slot" and cell['vehicle'] == most_confident_plate_number and cell['status'] == "booked":
                        cell['status'] = "Available"
                        cell['vehicle'] = ""
                        found_slot = True
                        collection.update_one(
                            {"_id": document["_id"]},
                            {"$set": {"floorsPlan": floorsPlan}}
                        )
                        break
                if found_slot:
                    break
            if found_slot:
                break

        if found_slot:
            print(f"Slot with plate number '{most_confident_plate_number}' updated to 'Available'.")
        else:
            # Iterate through the floorsPlan array to find the first cell that matches the criteria
            for floor in floorsPlan:
                for row in floor:
                    for cell in row:
                        if cell['name'] == "Slot" and (cell['status'] == "Available" or cell['status'] == "available"):
                            cell['status'] = "booked"
                            cell['vehicle'] = most_confident_plate_number
                            collection.update_one(
                                {"_id": document["_id"]},
                                {"$set": {"floorsPlan": floorsPlan}}
                            )
                            print("Status updated successfully for document with userName 'DaftarKhwan'")
                            exit()


    else:
        print("Document with userName 'DaftarKhwan' not found.")

except pymongo.errors.ConnectionFailure:
    print("Failed to connect to the database.")
