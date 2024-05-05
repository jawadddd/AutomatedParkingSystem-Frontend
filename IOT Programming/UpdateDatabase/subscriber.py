import paho.mqtt.client as mqtt
import base64
import pymongo
import time
import requests
import json
import subprocess


# MongoDB Atlas connection URI
MONGO_URI = "mongodb://jawadhaider682:Ep8km9btNMhWJa0x@ac-puxt79s-shard-00-00.owke4n8.mongodb.net:27017,ac-puxt79s-shard-00-01.owke4n8.mongodb.net:27017,ac-puxt79s-shard-00-02.owke4n8.mongodb.net:27017/?ssl=true&replicaSet=atlas-jx0038-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

# Client ID from your Imgur application
client_id = 'b841234729f0d21'


# MongoDB Atlas connection URI
MONGO_URI = "mongodb://jawadhaider682:Ep8km9btNMhWJa0x@ac-puxt79s-shard-00-00.owke4n8.mongodb.net:27017,ac-puxt79s-shard-00-01.owke4n8.mongodb.net:27017,ac-puxt79s-shard-00-02.owke4n8.mongodb.net:27017/?ssl=true&replicaSet=atlas-jx0038-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

# Client ID from your Imgur application
client_id = 'b841234729f0d21'


# MQTT broker details
broker_address = "broker.mqttdashboard.com"
broker_port = 1883
keepalive = 60
clientid = "subscriber"
username = ""
password = ""
topic = "hassanrehman/hassan2103/image"

# Callback function for when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    # Subscribe to the topic
    client.subscribe(topic)
    print("Subscribed to topic:", topic)

# Callback function for when a message is received
def on_message(client, userdata, message):
    print("Message received on topic:", message.topic)
    # Decode the received image data
    image_data = base64.b64decode(message.payload)
    # Save the image data to a file
    with open("received_image.jpg", "wb") as image_file:
        image_file.write(image_data)
    print("Image saved to file: received_image.jpg")

# Define the command to run your Python file
    command = ["python", "updatedbiot.py"]

# Run the command
    subprocess.run(command)


# Create an MQTT client instance
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)

# Assign callbacks
client.on_connect = on_connect
client.on_message = on_message

# Connect to the broker
client.username_pw_set(username, password)
client.connect(broker_address, broker_port, keepalive)

# Loop start
client.loop_forever()




# # Path to your image
# image_path = 'received_image.jpg'

# # Read the binary file and encode it
# with open(image_path, "rb") as image_file:
#     encoded_string = base64.b64encode(image_file.read())

# url = "https://api.imgur.com/3/image"
# payload = {'image': encoded_string}
# headers = {'Authorization': 'Client-ID ' + client_id}

# # First, we are uploading an image to the cloud (Imgur)
# imgur_response = requests.post(url, headers=headers, data=payload)
# most_confident_plate_number=""
# if imgur_response.status_code == 200:
#     # If the request was successful, get the image link
#     try:
#         image_link = imgur_response.json()['data']['link']
#         print("Image uploaded successfully. Link:", image_link)

#         # Number plate detection
#         url = "https://openalpr.p.rapidapi.com/recognize_url"
#         querystring = {"country":"eu"}
#         payload = {"image_url": image_link}
#         headers = {
#             "content-type": "application/x-www-form-urlencoded",
#             "X-RapidAPI-Key": "ae8adf0096mshce5307163e52132p1895a3jsnb07be5907431",
#             "X-RapidAPI-Host": "openalpr.p.rapidapi.com"
#         }
#         response = requests.post(url, data=payload, headers=headers, params=querystring)
        
#         # Parsing response
#         data = response.json()
#         if 'results' in data and data['results']:
#             # Get the most confident number plate
#             plates = data['results'][0]['candidates']
#             most_confident_plate = max(plates, key=lambda x: x['confidence'])
#             most_confident_plate_number = most_confident_plate['plate']
#             most_confident_plate_confidence = most_confident_plate['confidence']
#             print("Most confident plate:", most_confident_plate_number, "with confidence:", most_confident_plate_confidence)
            
#             # Store most confident plate number in a string
#             most_confident_plate_string = f"Plate Number: {most_confident_plate_number}, Confidence: {most_confident_plate_confidence}"
           
#         else:
#             print("No plates detected in the image.")
#     except KeyError:
#         print("Error: Could not retrieve image link from Imgur response.")

# print(most_confident_plate_number)



# try:
#     # Connect to MongoDB Atlas
#     client = pymongo.MongoClient(MONGO_URI)

#     # Access your database
#     db = client.test  # Change to your database name

#     # Access your collection (assuming it's called 'admin')
#     collection = db.admins  # Change to your collection name

#     # Find the document with userName "DaftarKhwan"
#     document = collection.find_one({"userName": "DaftarKhwan"})

#     if document:
#         # Access the floorsPlan array in the document
#         floorsPlan = document.get('floorsPlan', [])
        
#         # Iterate through the floorsPlan array to find the first cell that matches the criteria
#         for floor in floorsPlan:
#             for row in floor:
#                 for cell in row:
#                     if cell['name'] == "Slot" and (cell['status'] == "Available" or cell['status'] == "available") :
#                         # Update the status of the cell to "Available"
#                         cell['status'] = "booked"
#                         cell['slotNo'] = most_confident_plate_number                         
#                         # Update the document with the modified floorsPlan object
#                         collection.update_one(
#                             {"_id": document["_id"]},
#                             {"$set": {"floorsPlan": floorsPlan}}
#                         )
                        
#                         print("Status updated successfully for document with userName 'DaftarKhwan'")
#                         # Return after updating the first cell found
#                         exit()
        
#         # If no cell matching the criteria is found
#         print("No cell matching the criteria found in the floorsPlan of document with userName 'DaftarKhwan'")
    
#     else:
#         print("Document with userName 'DaftarKhwan' not found.")

# except pymongo.errors.ConnectionFailure:
#     print("Failed to connect to the database.")

