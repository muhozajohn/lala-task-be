import { PrismaClient, BookingStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Create Booking
export const createBooking = async (bookingData, renterId, propertyId) => {
  try {
    const id = parseInt(propertyId);
    const renterIdInt = parseInt(renterId);

    const property = await prisma.property.findUnique({
      where: { id: id }
    });
    if (!property) return { success: false, message: "Property not found" };

    const renter = await prisma.user.findUnique({
      where: { id: renterIdInt }
    });
    if (!renter) return { success: false, message: "Renter not found" };

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        propertyId: id,
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
      return { success: false, message: "Property is not available for these dates" };
    }

    const newBooking = await prisma.booking.create({
      data: {
        checkIn: new Date(bookingData.checkIn),
        checkOut: new Date(bookingData.checkOut),
        status: bookingData.status || BookingStatus.PENDING,
        propertyId: id,
        renterId: renterIdInt,
      }
    });

    return { success: true, message: "Booking created successfully", data: newBooking };
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
    const id = parseInt(bookingId);
    const booking = await prisma.booking.findUnique({
      where: { id: id },
      include: {
        property: true,
        renter: { select: { id: true, name: true, email: true } }
      }
    });
    if (!booking) return { success: false, message: "Booking not found" };
    return { success: true, data: booking };
  } catch (error) {
    console.error("Booking Service Error:", error);
    return { success: false, message: error.message };
  }
};


// Update Booking
export const updateBooking = async (bookingId, updateData) => {
  try {
    const id = parseInt(bookingId);
    const existingBooking = await prisma.booking.findUnique({ where: { id: id } });
    if (!existingBooking) return { success: false, message: "Booking not found" };

    if (updateData.checkIn || updateData.checkOut) {
      const conflictingBooking = await prisma.booking.findFirst({
        where: {
          id: { not: id },
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
        return { success: false, message: "Property is not available for these dates" };
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: id },
      data: {
        ...(updateData.checkIn && { checkIn: new Date(updateData.checkIn) }),
        ...(updateData.checkOut && { checkOut: new Date(updateData.checkOut) }),
        ...(updateData.status && { status: updateData.status })
      }
    });

    return { success: true, message: "Booking updated successfully", data: updatedBooking };
  } catch (error) {
    console.error("Booking Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Delete Booking
export const deleteBooking = async (bookingId) => {
  try {
    const id = parseInt(bookingId);
    const booking = await prisma.booking.findUnique({ where: { id: id } });
    if (!booking) return { success: false, message: "Booking not found" };

    const deletedBooking = await prisma.booking.update({
      where: { id: id },
      data: { status: BookingStatus.CANCELLED }
    });

    return { success: true, message: "Booking cancelled successfully", data: deletedBooking };
  } catch (error) {
    console.error("Booking Service Error:", error);
    return { success: false, message: error.message };
  }
};