import RPi.GPIO as GPIO
import time
import requests
import json
import base64
import requests
import paho.mqtt.client as mqtt
import picamera



# MQTT broker details
broker_address = "broker.mqttdashboard.com"
broker_port = 1883
keepalive = 60
clientid = "publisher"
username = ""
password = ""
topic = "hassanrehman/hassan2103/image"

	
image_path ="/home/pi/image.jpg"




# Callback function for when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Publish data when connected
    client.publish(topic, image_data)
    print("Image published to topic:", topic)

# Callback function for when a message is published
def on_publish(client, userdata, mid):
    print("Message published with MID:", mid)
    
# Function to read image file and encode it into base64
def read_image(file_path):
    with open(file_path, "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read())
    return encoded_image

def take_picture(file_path):
	with picamera.PiCamera() as camera:
		camera.resolution = (1024,768)
		camera.start_preview()
		time.sleep(3)
		
		camera.capture(file_path)
		print("picture clicked successfully")
'''
def print_data(response):
    print("Basic Information")
    print(f"- Epoch Time: {response['epoch_time']}")
    print(f"- Image Dimensions: {response['img_width']} x {response['img_height']}")
    print(f"- Processing Time: {response['processing_time']['total']:.2f} ms\n")

    for result in response['results']:
        print("Detected Plate Information")
        print(f"- Plate Number: {result['plate']}")
        print(f"- Confidence: {result['confidence']:.2f}%")
        print(f"- Region: {result['region']}\n")

        print("Plate Detection Candidates")
        print("| Candidate Plate | Confidence (%) |")
        print("|-----------------|----------------|")
        for candidate in result['candidates']:
            print(f"| {candidate['plate']} | {candidate['confidence']:.2f} |")
        
        print("\nCoordinates and Vehicle Region")
        coords = result['coordinates']
        print(f"- Coordinates: {[(c['x'], c['y']) for c in coords]}")
        vr = result['vehicle_region']
        print(f"- Vehicle Region: X: {vr['x']}, Y: {vr['y']}, Width: {vr['width']}, Height: {vr['height']}\n")
   ''' 

# Set the GPIO mode and pins
GPIO.setmode(GPIO.BOARD)
servo_pin = 11  # Motor pin
ir_pin1 = 37   # First entrance IR sensor pin
ir_pin2 = 38   # Second parking lot IR sensor pin

GPIO.setup(servo_pin, GPIO.OUT)
GPIO.setup(ir_pin1, GPIO.IN)
GPIO.setup(ir_pin2, GPIO.IN)

# Create a PWM instance
pwm = GPIO.PWM(servo_pin, 50)  # 50 Hz (20 ms PWM period)

def set_angle(angle):
    duty = angle / 18 + 2  # Map angle to duty cycle
    GPIO.output(servo_pin, True)
    pwm.ChangeDutyCycle(duty)
    time.sleep(0.3)  # Shorten the delay for faster movement
    GPIO.output(servo_pin, False)
    pwm.ChangeDutyCycle(0)  # Stop sending pulses

try:
    pwm.start(0)  # Start PWM with 0% duty cycle
    while True:
        if GPIO.input(ir_pin2) == GPIO.LOW:  
            # If first sensor detects an object
            #print("Object detected by sensor 1! Moving to 180 degrees.")
            set_angle(180)
        else:
            #print("No object detected by sensor 1. Moving to 90 degrees.")
            set_angle(90)

        if GPIO.input(ir_pin1) == GPIO.LOW :
            print("Object detected by sensor 2!")
            
            
            
            time.sleep(0.5)
            take_picture(image_path)
            
            image_data = read_image(image_path)

            time.sleep(0.5)
            
            
            # Client ID from your Imgur application
            client_id = 'b841234729f0d21'
            
            # Path to your image
            #image_path = '4.jpeg'

            # Read the binary file and encode it
            with open(image_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read())

            url = "https://api.imgur.com/3/image"
            payload = {'image': encoded_string}
            headers = {'Authorization': 'Client-ID ' + client_id}
        # First, we are uploading an image to the cloud (Imgur)
            imgur_response = requests.post(url, headers=headers, data=payload)

            if imgur_response.status_code == 200:
                # If the request was successful, get the image link
                try:
                    #------------------------------------------------------------------------------

                    image_link = imgur_response.json()['data']['link']
                    print(image_link)

                                    
                    # # code for number plate detection
                    url = "https://openalpr.p.rapidapi.com/recognize_url"

                    querystring = {"country":"eu"}

                    payload = { "image_url": image_link }

                    headers = {
                        "content-type": "application/x-www-form-urlencoded",
                        "X-RapidAPI-Key": "ae8adf0096mshce5307163e52132p1895a3jsnb07be5907431",
                        "X-RapidAPI-Host": "openalpr.p.rapidapi.com"
                    }


                    response = requests.post(url, data=payload, headers=headers, params=querystring)
                    # Call the function with your response data

                    print(response.json())
                    set_angle(180)
                                        
                    # Create an MQTT client instance
                    client = mqtt.Client()

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


                except KeyError:
                    print("Error: Could not retrieve image link from Imgur response.")
            else:
                print("tur ja");
    else:
        print("Error uploading image to Imgur. Status code:", imgur_response.status_code)  
            
        time.sleep(0.2)  # Add a small delay to avoid rapid checks
        set_angle(90)

except KeyboardInterrupt:
    pwm.stop()
    GPIO.cleanup()
