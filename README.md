Here's a structured version of your assessment documentation for running the project, ensuring clarity and ease of understanding for anyone who wants to set it up:

---

# Assessment Documentation

## Project Overview

- **Frontend**: [Live Demo](https://wishlist-assessment.vercel.app/) (Note: The performance may be slow due to using a free instance)
- **GitHub Repository**: [GitHub - Wishlist Assessment](https://github.com/prateeeksagar/wishlist-assessment)

## How to Run the Project

### 1. Frontend Setup

1. **Navigate to the Frontend Folder**
   ```bash
   cd frontend
   ```

2. **Create Environment File**
   - **File Name**: `.env.local`
   - **Content**:
     ```plaintext
     NEXT_PUBLIC_BASE_URL = "http://localhost:4000"
     ```

3. **Install Dependencies and Start the Backend Server**
   - Navigate to the backend folder:
   ```bash
   cd ../backend
   ```
   - Run the following command:
   ```bash
   npm install && npm run build && npm start
   ```

### 2. Backend Setup

1. **Create Environment File**
   - **File Name**: `.env`
   - **Content**:
     ```plaintext
     PORT = "4000"
     JWT_SECRET = "your_random_string_here"  # Use any random string for JWT secret
     MONGO_URL = "your_mongodb_connection_string_here"
     ```

2. **Install Dependencies and Start the Server**
   - Ensure you are in the backend folder and run:
   ```bash
   npm install
   npm run build
   npm start
   ```

### 3. Accessing the Application
- Once both the frontend and backend servers are running, access the application in your browser:
  ```
  http://localhost:3000
  ```

---

This format provides clear steps for setting up the project.
