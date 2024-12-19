from flask import Flask, render_template,url_for,redirect,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import bcrypt
from os import environ
import requests

app = Flask(__name__)
CORS(app)

load_dotenv()
CS_HOST_NAME=environ.get('CS_HOST_NAME')
CS_USERNAME=environ.get('CS_USERNAME')
CS_PASSWORD=environ.get('CS_PASSWORD')
connection_string = f"mongodb+srv://{CS_USERNAME}:{CS_PASSWORD}@{CS_HOST_NAME}/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"

# Initialize the MongoClient
client = MongoClient(connection_string)

try:
    # Verify connection by listing databases
    print("Connecting to MongoDB...")
    client.admin.command('ping')  # A lightweight check to verify connection
    print("Connected successfully!")
    
    # Select softechDB
    db = client["softechDB"]  

    # User collection
    userCollection = db["user"]

    def message_from_ai():
        url = 'http://localhost:8000/message'
        try:
            # res = requests.post(url)
            # res.raise_for_status()
            # data = res.json()
            # print(f'data: {data}')
            data = 'something random'
            return data

           
        except requests.RequestException as e:
            print(f"error: {e}")
            return None

    @app.route('/login',methods=["POST"])
    def login():
        # User data
        print('user logging in')
        email = request.json.get('email')
        password = request.json.get('password')

        try:
            # Checking if email exist in DB
            registeredUser = userCollection.find_one({"email": email})
           

            if registeredUser:
                 # Verifying user's password
                print(f"registeredUser: {registeredUser}; email: {registeredUser['email']}")
                if bcrypt.checkpw(password.encode('utf-8'), registeredUser['password']):
                     aiMessage = message_from_ai()
                     if(aiMessage):
                         return jsonify({"message": "User logged in successfully! - " + aiMessage}), 201
                     else:
                         return jsonify({"message": "Error OpenAI connection" }), 400 
                else:
                    print('incorrect password')
                    return jsonify({"message": "Email or password are incorrect"}), 400
            else:
                print('email does not exist')
                return jsonify({"message": "Email or password are incorrect"}), 400  

        except Exception as e:
            return jsonify({"message": "An error occurred, please try again later"},e), 500  
    

    # TODO: delete later
    @app.route('/register',methods=['POST'])
    def register():
        email = request.json.get('email')
        print(f"email: {email}")
        password = request.json.get('password')
        print(f"password: {password}")

        try:
            # Checking if email exist in DB
            registeredUser = userCollection.find_one({"email": email})

            if registeredUser:
                print("user already exist")
                return jsonify({"message": "User already registered"}), 400
           
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            print(hashed_password)
            userCollection.insert_one({"email":email, "password":hashed_password})

            users = userCollection.find({})
            for user in users:
                print(f"email: {user.get('email')}")

            return jsonify({"message": "User registered successfully!"}), 200
            
        except Exception as e:
            return jsonify({"message": "An error occurred, please try again later"},e), 500  

except Exception as e:
    print("Connection failed:", e)  

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port="5000")


