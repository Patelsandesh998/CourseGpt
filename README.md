
# CourseGpt

CourseGPT is an AI-powered educational platform that helps students and educators create, manage, and interact with course content using advanced AI capabilities.

Project Structure
This project consists of two main parts:

Client: Next.js frontend application
Server: Express.js backend API
Prerequisites
Node.js (v16+)

MongoDB
npm or yarn package manager
Google Firebase account (for authentication)
Google Gemini API key
Setup Instructions
cd CourseGPT
Server Setup
Navigate to the server directory:

cd server
Install dependencies:

npm install
Create a .env file in the server directory with the following content:

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/coursegpt
Note: Update the MongoDB URI as needed for your environment.

Start the development server:

npm run dev
This will start the server on port 5000 (or the port specified in your .env file).

For production:

npm run build
npm start
Client Setup
Navigate to the client directory:

cd client
Install dependencies:

npm install
Create a .env file in the client directory with the following content:

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_API_GEMINI_KEY=your_gemini_api_key
Replace the placeholder values with your actual API keys.

Start the development server:

npm run dev
