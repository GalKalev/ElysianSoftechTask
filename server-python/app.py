from flask import Flask, render_template,url_for,redirect,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import logging
import bcrypt
from os import environ

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

    @app.route('/submit',methods=["POST"])
    def submit_user():
        # New user data
        print(f"submitted")
        email = request.json.get('email')
        print(f"email: {email}")
        password = request.json.get('password')
        print(f"password: {password}")
        # logging.debug(f"email: {email}, password: {password}")

        # Checking if email already exist in DB
        registeredUser = userCollection.find_one({"email": email})

        if registeredUser:
            print("user already exist")
            return jsonify({"message": "User already registered"}), 400
        else:
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            print(hashed_password)
            userCollection.insert_one({"email":email, "password":hashed_password})
        
        users = userCollection.find({})
        for user in users:
            print(f"email: {user.get('email')}")

        return jsonify({"message": "User registered successfully!"}), 201


   
    
    # Insert a document
    # user = {"email": "g@g.com", "password": "1234"}
    # print(f"user: {user.email}")
    # # result = collection.insert_one(user)  # Use insert_one to add the document
    # # print(f"Inserted document ID: {result.inserted_id}")

    # registeredUser = userCollection.find_one({"email": user.email})

    # if registeredUser:
    #     print("user already exist")
    # else:
    #     userCollection.insert_one(user)

   

except Exception as e:
    print("Connection failed:", e)

if __name__ == '__main__':
    app.run(debug=False)


