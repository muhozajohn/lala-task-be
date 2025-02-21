import express from 'express';
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from '../controllers/booking.controller';

const bookingRoute = express.Router();

// Create a new booking
bookingRoute.post("/properties/:propertyId/bookings", createBooking);

// Get all bookings (with optional filters)
bookingRoute.get("/", getAllBookings);

// Get a single booking by ID
bookingRoute.get("/:id", getBookingById);

// Update a booking (PUT and PATCH should have the same logic)
bookingRoute.put("/:id", updateBooking);
bookingRoute.patch("/:id", updateBooking);

// Delete (Cancel) a booking
bookingRoute.delete("/:id", deleteBooking);

export default bookingRoute;
