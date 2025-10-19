# Welcome to Loc8r

A location-based application built with the MEAN stack (MongoDB, Express, Angular/React, Node.js).

## Features

- Find places near your current location
- Filter by distance
- View place details including ratings and facilities
- Add new places to the database

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- npm or yarn

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

## Running the Application

### Development Mode

To run both the frontend and backend simultaneously:
```bash
npm run dev:full
```

To run only the frontend:
```bash
npm run dev
```

To run only the backend:
```bash
npm run server
```

### Production Mode

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the application:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:8080`
2. Click on "Open Loc8r" to access the main application
3. Allow location access when prompted
4. Browse places near you
5. Add new places using the "Add Place" button

## API Endpoints

- `GET /api/places` - Get places near a location
- `GET /api/places/:id` - Get a specific place
- `POST /api/places` - Create a new place
- `PUT /api/places/:id` - Update a place
- `DELETE /api/places/:id` - Delete a place

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Geospatial Queries**: MongoDB 2dsphere indexes
