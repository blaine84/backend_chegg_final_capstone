# Movie Theater Backend API

A RESTful API for managing movies, theaters, and reviews. Built with Node.js, Express, and PostgreSQL.

## Features

- List all movies (with optional filter for currently showing)
- Get movie details with associated theaters and reviews
- List all theaters with their movie schedules
- Create, update, and delete reviews
- Critic information included with reviews

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Production database
- **Knex.js** - SQL query builder and migrations
- **SQLite** - Test database

## API Endpoints

### Movies
- `GET /movies` - List all movies
- `GET /movies?is_showing=true` - List currently showing movies
- `GET /movies/:movieId` - Get movie details
- `GET /movies/:movieId/theaters` - Get theaters showing a movie
- `GET /movies/:movieId/reviews` - Get reviews for a movie

### Theaters
- `GET /theaters` - List all theaters with their movies

### Reviews
- `PUT /reviews/:reviewId` - Update a review
- `DELETE /reviews/:reviewId` - Delete a review

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd Capstone\ Project
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (optional - defaults to local PostgreSQL)
```bash
DATABASE_URL=postgresql://username:password@localhost/database_name
```

4. Run migrations
```bash
npm run migrate
```

5. Seed the database
```bash
npm run seed
```

6. Start the server
```bash
npm start
```

The API will be available at `http://localhost:5001`

## Scripts

- `npm start` - Start the server
- `npm run start:dev` - Start with nodemon (auto-reload)
- `npm test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed the database
- `npm run rollback` - Rollback last migration
- `npm run reset` - Rollback, migrate, and seed

## Database Schema

### Tables
- **movies** - Movie information
- **theaters** - Theater locations
- **critics** - Movie critics
- **reviews** - Movie reviews by critics
- **movies_theaters** - Junction table for movies and theaters

## Deployment

Deployed on Render with PostgreSQL database.

Live API: (https://backend-chegg-final-capstone.onrender.com/)

## Project Structure

```
src/
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── db/
│   ├── connection.js   # Database connection
│   ├── migrations/     # Database migrations
│   └── seeds/          # Seed data
├── movies/             # Movies routes and logic
├── theaters/           # Theaters routes and logic
├── reviews/            # Reviews routes and logic
└── errors/             # Error handling middleware
```

## Author
Blaine Griffin

Created as a capstone project for Chegg Skills Backend Web Development course.
