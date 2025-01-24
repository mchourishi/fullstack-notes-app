## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- **Python 3.10**
- **Node.js** **npm**
- **MongoDB Community Edition**

---

## Setup Instructions

### Backend Setup

1. **Navigate to the Backend Directory**

   From the root directory

   ```bash
   cd backend
   ```

2. **Create a Virtual Environment**

   ```bash
   python3.10 -m venv venv
   ```

3. **Activate the Virtual Environment**

   - **On macOS/Linux:**

     ```bash
     source venv/bin/activate
     ```

4. **Install Python Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

   From the root directory

   ```bash
   cd frontend
   ```

2. **Use Correct Node Version**

   ```bash
   nvm use v20.13.1
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

---

## Populating the Database

We have provided a script to populate the MongoDB database with sample data.

1. **Ensure MongoDB Is Running**

   - **On macOS (Homebrew):**

     ```bash
     brew services start mongodb-community@7.0
     ```

2. **Populate the Database**

   From the `frontend` directory, run:

   ```bash
   npm run populate-db
   ```

---

## Running the Application

### Start the Backend Server

1. **Ensure the Virtual Environment Is Activated**

   If not already activated, navigate to the `backend` directory and activate it:

   ```bash
   cd backend
   ```

   - **On macOS/Linux:**

     ```bash
     source venv/bin/activate
     ```

2. **Run the Backend Server**

   ```bash
   python run.py
   ```

   The backend server will start on port `5001`.

### Start the Frontend Server

1. **Navigate to the Frontend Directory**

   From the root directory

   ```bash
   cd frontend
   ```

2. **Start the Development Servers**

   ```bash
   npm run dev
   ```

   This will start both the Node.js server and the React development server concurrently.

---

## Accessing the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the application running with the sample data displayed.

---
