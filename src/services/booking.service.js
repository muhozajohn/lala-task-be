import { PrismaClient, BookingStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Create Booking
export const createBooking = async (bookingData, renterId, propertyId) => {
  try {
    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!property) {
      return { 
        success: false, 
        message: "Property not found" 
      };
    }

    // Check if user exists and is a renter
    const renter = await prisma.user.findUnique({
      where: { id: perseInt(renterId) }
    });

    if (!renter) {
      return { 
        success: false, 
        message: "Renter not found" 
      };
    }

    // Check for date conflicts
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        propertyId,
        status: { not: BookingStatus.CANCELLED },
        OR: [
          {
            AND: [
              { checkIn: { lte: new Date(bookingData.checkIn) } },
              { checkOut: { gte: new Date(bookingData.checkIn) } }
            ]
          },
          {
            AND: [
              { checkIn: { lte: new Date(bookingData.checkOut) } },
              { checkOut: { gte: new Date(bookingData.checkOut) } }
            ]
          }
        ]
      }
    });

    if (conflictingBooking) {
      return {
        success: false,
        message: "Property is not available for these dates"
      };
    }

    const newBooking = await prisma.booking.create({
      data: {
        checkIn: new Date(bookingData.checkIn),
        checkOut: new Date(bookingData.checkOut),
        status: bookingData.status || BookingStatus.PENDING,
        propertyId,
        renterId,
      },
    });

    return {
      success: true,
      message: "Booking created successfully",
      data: newBooking
    };
  } catch (error) {
    console.error("Booking Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get All Bookings (with filters)
export const getBookings = async (filters = {}) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        ...(filters.renterId && { renterId: filters.renterId }),
        ...(filters.propertyId && { propertyId: filters.propertyId }),
        ...(filters.status && { status: filters.status })
      },
      include: {
        property: true,
        renter: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        checkIn: 'asc'
      }
    });

    return {
      success: true,
      data: bookings
    };
  } catch (error) {
    console.error("Booking Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get Booking by ID
export const getBookingById = async (bookingId) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        property: true,
        renter: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!booking) {
      return {
        success: false,
        message: "Booking not found"
      };
    }

    return {
      success: true,
      data: booking
    };
  } catch (error) {
    console.error("Booking Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Update Booking
export const updateBooking = async (bookingId, updateData) => {
  try {
    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!existingBooking) {
      return {
        success: false,
        message: "Booking not found"
      };
    }

    // If dates are being updated, check for conflicts
    if (updateData.checkIn || updateData.checkOut) {
      const conflictingBooking = await prisma.booking.findFirst({
        where: {
          id: { not: bookingId },
          propertyId: existingBooking.propertyId,
          status: { not: BookingStatus.CANCELLED },
          OR: [
            {
              AND: [
                { checkIn: { lte: new Date(updateData.checkIn || existingBooking.checkIn) } },
                { checkOut: { gte: new Date(updateData.checkIn || existingBooking.checkIn) } }
              ]
            },
            {
              AND: [
                { checkIn: { lte: new Date(updateData.checkOut || existingBooking.checkOut) } },
                { checkOut: { gte: new Date(updateData.checkOut || existingBooking.checkOut) } }
              ]
            }
          ]
        }
      });

      if (conflictingBooking) {
        return {
          success: false,
          message: "Property is not available for these dates"
        };
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        ...(updateData.checkIn && { checkIn: new Date(updateData.checkIn) }),
        ...(updateData.checkOut && { checkOut: new Date(updateData.checkOut) }),
        ...(updateData.status && { status: updateData.status })
      },
      include: {
        property: true,
        renter: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return {
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking
    };
  } catch (error) {
    console.error("Booking Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Delete Booking
export const deleteBooking = async (bookingId) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return {
        success: false,
        message: "Booking not found"
      };
    }

    // Instead of hard delete, you might want to just cancel the booking
    const deletedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: BookingStatus.CANCELLED }
    });

    return {
      success: true,
      message: "Booking cancelled successfully",
      data: deletedBooking
    };
  } catch (error) {
    console.error("Booking Service Error:", error);
    return { success: false, message: error.message };
  }
};