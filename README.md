# LaLa Rental Platform - Backend

Backend service for the LaLa rental booking platform built with Node.js, Express, Prisma, and PostgreSQL. This service handles user authentication, property management, and booking operations.

## Features

### Authentication
- Google OAuth 2.0 integration
- JWT token-based authentication
- Role-based access control (Renter/Host)

### Property Management
- CRUD operations for property listings
- Property availability checking
- Property search and filtering

### Booking System
- Booking creation and management
- Double-booking prevention
- Booking status updates (Pending/Confirmed/Canceled)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Google OAuth 2.0, JWT
- **Documentation**: Swagger/OpenAPI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/muhozajohn/lala-task-be.git
cd lala-task-be
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/lala_db"

# Authentication
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
JWT_SECRET="your-jwt-secret"

# Server
PORT=5000
NODE_ENV=development
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
```
POST /api/auth/google-login
GET  /api/auth/profile
```

### Properties
```
GET    /api/properties        - Get all properties
GET    /api/properties/:id    - Get single property
POST   /api/properties        - Create property (Host only)
PUT    /api/properties/:id    - Update property (Host only)
DELETE /api/properties/:id    - Delete property (Host only)
```

### Bookings
```
GET    /api/bookings         - Get user's bookings
POST   /api/bookings         - Create booking
PUT    /api/bookings/:id     - Update booking status
DELETE /api/bookings/:id     - Cancel booking
```

## Database Schema

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String
  role      UserRole
  googleId  String    @unique
  properties Property[]
  bookings  Booking[]
}

model Property {
  id            String    @id @default(cuid())
  title         String
  description   String
  pricePerNight Decimal
  location      String
  hostId        String
  host          User      @relation(fields: [hostId], references: [id])
  bookings      Booking[]
}

model Booking {
  id         String        @id @default(cuid())
  checkIn    DateTime
  checkOut   DateTime
  status     BookingStatus
  propertyId String
  renterId   String
  property   Property      @relation(fields: [propertyId], references: [id])
  renter     User         @relation(fields: [renterId], references: [id])
}
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middlewares/    # Custom middlewares
├── models/         # Prisma models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── app.js         # App entry point
```

## Error Handling

The API uses a consistent error response format:
```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

## Authentication Flow

1. Client initiates Google OAuth login
2. Backend verifies Google token
3. Create/update user in database
4. Generate JWT token
5. Return user data and token

## Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep "Auth"
```

## API Documentation

API documentation is available at `/api-docs` when running in development mode.

## Development

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Scripts

```bash
npm run dev     # Start development server
npm start       # Start production server
npm test        # Run tests
npm run lint    # Run ESLint
npm run migrate # Run database migrations
```

## Author

- John Muhoza (@muhozajohn)

## License

This project is licensed under the MIT License.