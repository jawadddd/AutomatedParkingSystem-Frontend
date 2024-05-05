import paho.mqtt.client as mqtt
import time
import base64

# MQTT broker details
broker_address = "broker.mqttdashboard.com"
broker_port = 1883
keepalive = 60
clientid = "publisher"
username = ""
password = ""
topic = "hassanrehman/hassan2103/image"

# Function to read image file and encode it into base64
def read_image(file_path):
    with open(file_path, "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read())
    return encoded_image

# Path to the image file
image_path = "hassan.png"

# Data to be sent
image_data = read_image(image_path)

# Callback function for when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Publish data when connected
    client.publish(topic, image_data)
    print("Image published to topic:", topic)

# Callback function for when a message is published
def on_publish(client, userdata, mid):
    print("Message published with MID:", mid)

# Create an MQTT client instance
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)

# Assign callbacks
client.on_connect = on_connect
client.on_publish = on_publish

# Connect to the broker
client.username_pw_set(username, password)
client.connect(broker_address, broker_port, keepalive)

# Loop start
client.loop_start()

# Wait for a while to ensure message delivery
time.sleep(2)

# Disconnect from the broker
client.disconnect()

# Loop stop
client.loop_stop()
