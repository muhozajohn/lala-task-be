import * as BookingService from "../services/booking.service";
import { validateBooking } from "../utils/validations";

// Create a new booking
export const createBooking = async (req, res) => {
  const { error, value } = validateBooking(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const renterId = req.user.id;
    const { propertyId } = req.params;
    const bookingResponse = await BookingService.createBooking(value, renterId, propertyId);

    if (bookingResponse.success) {
      return res.status(201).json({
        status: "201",
        message: bookingResponse.message,
        data: bookingResponse.data,
      });
    } else {
      return res.status(400).json({
        status: "400",
        message: bookingResponse.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// Get all bookings with optional filters
export const getAllBookings = async (req, res) => {
  const filters = {
    renterId: req.query.renterId,
    propertyId: req.query.propertyId,
    status: req.query.status,
  };

  try {
    const result = await BookingService.getBookings(filters);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "Bookings retrieved successfully",
        data: result.data,
      });
    } else {
      return res.status(404).json({
        status: "404",
        message: result.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await BookingService.getBookingById(id);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "Booking retrieved successfully",
        data: result.data,
      });
    } else {
      return res.status(404).json({
        status: "404",
        message: result.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve booking",
      error: error.message,
    });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await BookingService.updateBooking(id, updateData);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: result.message,
        data: result.data,
      });
    } else {
      return res.status(400).json({
        status: "400",
        message: result.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

// Delete (Cancel) a booking
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await BookingService.deleteBooking(id);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: result.message,
        data: result.data,
      });
    } else {
      return res.status(404).json({
        status: "404",
        message: result.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};
