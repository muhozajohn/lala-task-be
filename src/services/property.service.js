import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new property
export const createProperty = async (propertyData, hostId) => {
  try {
    // Verify that the host exists and is actually a host
    const host = await prisma.user.findUnique({
      where: { id: hostId }
    });

    if (!host) {
      return { success: false, message: "Host not found" };
    }

    if (host.role !== 'HOST') {
      return { success: false, message: "User is not a host" };
    }

    const newProperty = await prisma.property.create({
      data: {
        title: propertyData.title,
        description: propertyData.description,
        pricePerNight: propertyData.pricePerNight,
        location: propertyData.location,
        images: propertyData.images || [],
        amenities: propertyData.amenities || [],  
        houseRules: propertyData.houseRules || [], 
        maxGuests: propertyData.maxGuests || 1,  
        bathrooms: propertyData.bathrooms || 1, 
        bedrooms: propertyData.bedrooms || 1, 
        hostId: hostId ,
      },
    });

    return {
      success: true,
      message: "Property created successfully",
      data: newProperty
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get all properties with optional filters
export const getAllProperties = async (filters = {}) => {
  try {
    const where = {};
    
    // Apply filters if they exist
    if (filters.location) {
      where.location = { contains: filters.location, mode: 'insensitive' };
    }
    if (filters.maxPrice) {
      where.pricePerNight = { lte: parseFloat(filters.maxPrice) };
    }
    if (filters.minPrice) {
      where.pricePerNight = { ...where.pricePerNight, gte: parseFloat(filters.minPrice) };
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        host: true,
        bookings: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { success: true, properties };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get a single property by ID
export const getPropertyById = async (propertyId) => {
  try {
    const id = parseInt(propertyId);
    
    if (isNaN(id)) {
      return { success: false, message: "Invalid property ID format" };
    }

    const property = await prisma.property.findUnique({
      where: { id:id },
      include: {
        host: true,
      }
    });

    if (!property) {
      return { success: false, message: "Property not found" };
    }

    return { success: true, property };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Update property
export const updateProperty = async (propertyId, propertyData, hostId) => {
  try {
    const id = parseInt(propertyId);
    
    if (isNaN(id)) {
      return { success: false, message: "Invalid property ID format" };
    }

    // Verify property exists and belongs to the host
    const existingProperty = await prisma.property.findFirst({
      where: {
        id,
        hostId
      }
    });

    if (!existingProperty) {
      return { success: false, message: "Property not found or you don't have permission to update it" };
    }

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        title: propertyData.title,
        description: propertyData.description,
        pricePerNight: propertyData.pricePerNight,
        location: propertyData.location,
        images: propertyData.images || [],
        amenities: propertyData.amenities || [],  
        houseRules: propertyData.houseRules || [], 
        maxGuests: propertyData.maxGuests || 1,  
        bathrooms: propertyData.bathrooms || 1, 
        bedrooms: propertyData.bedrooms || 1, 
        hostId: hostId ,
        updatedAt: new Date()
      },
    });

    return {
      success: true,
      message: "Property updated successfully",
      data: updatedProperty
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Delete property
export const deleteProperty = async (propertyId, hostId) => {
  try {
    const id = parseInt(propertyId);
    
    if (isNaN(id)) {
      return { success: false, message: "Invalid property ID format" };
    }

    // Verify property exists and belongs to the host
    const existingProperty = await prisma.property.findFirst({
      where: {
        id,
        hostId
      }
    });

    if (!existingProperty) {
      return { success: false, message: "Property not found or you don't have permission to delete it" };
    }

    // Check if there are any active bookings
    const activeBookings = await prisma.booking.findMany({
      where: {
        propertyId: id,
        endDate: {
          gte: new Date()
        }
      }
    });

    if (activeBookings.length > 0) {
      return { success: false, message: "Cannot delete property with active bookings" };
    }

    // Delete property and all related bookings (Prisma will handle cascading)
    await prisma.property.delete({
      where: { id }
    });

    return {
      success: true,
      message: "Property and related bookings deleted successfully"
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get properties by location
export const getPropertiesByLocation = async (location) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        location: {
          contains: location,
          mode: 'insensitive'
        }
      },
      include: {
        host: true,
        bookings: true
      }
    });

    return { success: true, properties };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get properties within price range
export const getPropertiesByPriceRange = async (minPrice, maxPrice) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        pricePerNight: {
          gte: parseFloat(minPrice),
          lte: parseFloat(maxPrice)
        }
      },
      include: {
        host: true,
        bookings: true
      }
    });

    return { success: true, properties };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Check property availability for given dates
export const checkPropertyAvailability = async (propertyId, startDate, endDate) => {
  try {
    const id = parseInt(propertyId);
    
    if (isNaN(id)) {
      return { success: false, message: "Invalid property ID format" };
    }

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        bookings: {
          where: {
            OR: [
              {
                AND: [
                  { startDate: { lte: new Date(startDate) } },
                  { endDate: { gte: new Date(startDate) } }
                ]
              },
              {
                AND: [
                  { startDate: { lte: new Date(endDate) } },
                  { endDate: { gte: new Date(endDate) } }
                ]
              }
            ]
          }
        }
      }
    });

    if (!property) {
      return { success: false, message: "Property not found" };
    }

    const isAvailable = property.bookings.length === 0;

    return {
      success: true,
      isAvailable,
      conflictingBookings: isAvailable ? [] : property.bookings
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};