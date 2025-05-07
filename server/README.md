# CourseGPT Backend

Express.js backend for CourseGPT application with MongoDB integration.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file with the following content:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/coursegpt
```

Note: You can replace the MongoDB URI with your own MongoDB connection string.

3. Make sure MongoDB is running on your machine, or use a cloud service like MongoDB Atlas.

4. Start the server:
```
npm run dev
```

## API Endpoints

### Lessons

- **POST** `/:uuid/store_lessons`
  - Stores lesson details in MongoDB
  - Request body: Lesson object
  - Response: Created lesson with ID

- **GET** `/:uuid/store_lessons`
  - Retrieves all lessons for a specific UUID from MongoDB
  - Response: Array of lessons

### Courses

- **POST** `/:uuid/store_course`
  - Stores a course with its lessons in MongoDB
  - Request body: Course object with lessons array
  - Response: Created course with timestamp

- **GET** `/:uuid/store_course`
  - Retrieves a course for a specific UUID from MongoDB
  - Response: Course object with its lessons

## Example Usage

### Store a lesson:
```
POST /abc123/store_lessons
{
  "title": "Introduction to JavaScript",
  "content": "JavaScript is a programming language...",
  "duration": 60
}
```

### Store a course:
```
POST /abc123/store_course
{
  "title": "Web Development Fundamentals",
  "description": "Learn the basics of web development",
  "lessons": [
    {
      "id": "lesson1",
      "title": "HTML Basics",
      "content": "HTML is the structure of web pages..."
    },
    {
      "id": "lesson2",
      "title": "CSS Styling",
      "content": "CSS makes your HTML look good..."
    }
  ]
}
```

## Database Schema

### Lesson Schema
- uuid: String (required)
- title: String (required)
- content: String (required)
- duration: Number (default: 0)
- id: String (auto-generated if not provided)
- createdAt: Date (auto-generated)
- updatedAt: Date (auto-generated)

### Course Schema
- uuid: String (required, unique)
- title: String (required)
- description: String
- lessons: Array of Lesson objects
- createdAt: Date (auto-generated)
- updatedAt: Date (auto-generated) 