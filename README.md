# Elysian Softech Task Overview

This project consists of a login system with the following requirements:

## Mobile:

* Developed using React Native.

* Provides a responsive login interface for mobile devices.

## Web:

* Developed using React JS.

* Provides a responsive login interface for web browsers.

## Python Server:

* Backend server implemented in Python.

* Hosted on Azure Cloud.

* MongoDB is used for database management.

## Additional Functionality:

* After user log in, a Toast message is displayed.

* The Toast message contains random text retrieved from OpenAI's ChatGPT API.

* A secondary server, implemented in Node.js, is responsible for connecting to the OpenAI API, hosted on Azure Cloud.

## Installation and Setup

### Prerequisites

1. Node.js and npm installed.

3. Python installed.

4. MongoDB database setup.

5. Azure account for cloud hosting.

6. OpenAI API key (requires a paid OpenAI account for API access).

### Steps

#### Mobile (React Native):

1. Navigate to the mobile directory.

```
cd mobile
```

2. Install dependencies.
```
npm install
```

3. Start the development server.
```
npx expo start
```

#### Web (React JS):

1. Navigate to the web directory.
```
cd web
```

2. Install dependencies.
```
npm install
```

3. Start the development server.
```
npm start
```

#### Python Server:

1. Navigate to the backend directory.
```
cd server-python
```

2. Install dependencies.
```
pip install -r requirements.txt
```

3. Start the server.
```
python app.py
```

#### Node.js Server:

1. Navigate to the Node.js server directory.
```
cd server-nodejs
```

2. Install dependencies.
```
npm install
```

3. Start the server.
```
node app.js
```

### Usage

1. Launch both the mobile and web interfaces to test user login.

2. Ensure both Python and Node.js servers are running for full functionality.

3. Enter user information to trigger the Toast message with random text from the OpenAI API.

### Example User for Testing

Use the following credentials to test the login functionality:

* Email: gal@email.com

* Password: 123456
