<<<<<<< HEAD
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
=======
# CourseGPT

CourseGPT is an AI-powered educational platform that helps students and educators create, manage, and interact with course content using advanced AI capabilities.

## Project Structure

This project consists of two main parts:
- **Client**: Next.js frontend application
- **Server**: Express.js backend API

## Prerequisites

- Node.js (v16+)
- MongoDB
- npm or yarn package manager
- Google Firebase account (for authentication)
- Google Gemini API key

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/govindmohan0/CourseGPT.git
cd CourseGPT
```

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/coursegpt
   ```
   Note: Update the MongoDB URI as needed for your environment.

4. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the server on port 5000 (or the port specified in your .env file).

5. For production:
   ```bash
   npm run build
   npm start
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory with the following content:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_API_GEMINI_KEY=your_gemini_api_key
   ```
   Replace the placeholder values with your actual API keys.

4. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the client application on port 3000.

5. For production:
   ```bash
   npm run build
   npm start
   ```

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Set up Authentication (Email/Password at minimum)
3. Get your Firebase configuration and update the Firebase API key in the client `.env` file

## Google Gemini API Setup

1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the API key to your client `.env` file

## Available Scripts

### Server

- `npm run dev`: Run the development server with hot reload
- `npm run build`: Build the TypeScript files to JavaScript
- `npm start`: Run the production server
- `npm test`: Run tests

### Client

- `npm run dev`: Run the development server
- `npm run build`: Build the application for production
- `npm start`: Run the production build
- `npm run lint`: Run ESLint to check code quality

## Technologies Used

### Server
- Express.js
- TypeScript
- MongoDB with Mongoose
- CORS

### Client
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- Firebase Authentication
- Google Gemini AI API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
>>>>>>> 88f8a15 (Initial commit)
