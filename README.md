# Outbuild Backend Assessment API

## Description

This project is a backend API for managing `Schedules` and `Activities` for users. It is built using **Node.js**, **Express**, and **PostgreSQL**. The API allows authenticated users to create `Schedules`, add activities to them, and retrieve `Schedules` with their respective activities. The system uses JWT for authentication.

## Prerequisites

Before running the project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (optional if you prefer to use Docker)

## Installation and Setup

1. **Clone the repository**

   Clone this repository to your local machine:

   ```bash
   git clone <REPOSITORY_URL>
   cd api-backend-assessment
   ```

2. **Install dependencies**

   Install the necessary dependencies using npm:

   ```bash
   npm install
   ```

3. **Configure the database**

   Ensure you have a running PostgreSQL database. Create a new database named `outbuild` (or any name you prefer).

   Then, configure the environment variables in a `.env` file at the root of the project with the following content:

   ```bash
   DATABASE_URL=postgres://<username>:<password>@localhost:5432/outbuild
   JWT_SECRET=your_secret_key
   ```

   Replace `<username>` and `<password>` with your PostgreSQL credentials.

4. **Initialize the database**

   The project uses **Sequelize** to manage the database. The models and relationships will be automatically created when you start the server.

5. **Start the server**

   Once the database is set up, you can start the server with the following command:

   ```bash
   npm start
   ```

   If everything is configured correctly, you should see a message in the console that says:

   ```
   Server is running on port 3000
   ```

6. **Generate a JWT token**

   To authenticate with the API, first generate a JWT token by accessing the `/auth/login` route.

   **Example**:

   - Method: `POST`
   - URL: `http://localhost:3000/auth/login`

   The response will be a JWT token:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```

## API Endpoints

### Authentication

#### `POST /auth/login`

- **Description**: Generates a JWT token for authentication.
- **Body**: None
- **Response**:
  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

### Schedules

#### `POST /schedules`

- **Description**: Creates a new `Schedule` (empty, without activities).
- **Headers**:
  - Authorization: `Bearer <JWT_TOKEN>`
- **Body**:
  ```json
  {
    "name": "Project A",
    "image_url": "https://example.com/building.png"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Schedule created",
    "data": {
      "id": 1,
      "name": "Project A",
      "image_url": "https://example.com/building.png",
      "userId": 1
    }
  }
  ```

#### `GET /schedules/:id`

- **Description**: Retrieves a `Schedule` with its activities.
- **Headers**:
  - Authorization: `Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Project A",
    "image_url": "https://example.com/building.png",
    "activities": [
      {
        "id": 1,
        "name": "Excavation",
        "start_date": "2024-10-01T00:00:00.000Z",
        "end_date": "2024-10-10T00:00:00.000Z"
      }
    ]
  }
  ```

### Activities

#### `POST /schedules/:id/activities`

- **Description**: Adds one or more activities to an existing `Schedule`.
- **Headers**:
  - Authorization: `Bearer <JWT_TOKEN>`
- **Body** (add one activity):
  ```json
  {
    "name": "Excavation",
    "start_date": "2024-10-01",
    "end_date": "2024-10-10"
  }
  ```
- **Body** (add multiple activities):
  ```json
  [
    {
      "name": "Foundation",
      "start_date": "2024-10-11",
      "end_date": "2024-10-15"
    },
    {
      "name": "Framing",
      "start_date": "2024-10-16",
      "end_date": "2024-10-20"
    }
  ]
  ```
- **Response**:
  ```json
  {
    "message": "Activities added",
    "data": [
      {
        "id": 2,
        "name": "Foundation",
        "start_date": "2024-10-11T00:00:00.000Z",
        "end_date": "2024-10-15T00:00:00.000Z"
      },
      {
        "id": 3,
        "name": "Framing",
        "start_date": "2024-10-16T00:00:00.000Z",
        "end_date": "2024-10-20T00:00:00.000Z"
      }
    ]
  }
  ```

## Observability

The system uses **Morgan** to log all requests in the console. Be sure to check the logs to verify correct system behavior.
