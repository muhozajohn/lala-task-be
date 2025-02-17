import express from 'express';
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from '../controllers/booking.controller';

const bookingRoute = express.Router();

bookingRoute.post("/", createBooking);
bookingRoute.get("/", getAllBookings);
bookingRoute.get("/:id", getBookingById);
bookingRoute.put("/:id", updateBooking);
bookingRoute.patch("/:id", updateBooking);
bookingRoute.delete("/:id", deleteBooking); 


export default bookingRoute;
