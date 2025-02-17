import { validateProperty, validatePropertyUpdate } from "../utils/validations";
import * as PropertyService from "../services/property.service";

// Create a new property
export const createProperty = async (req, res) => {
  const { error, value } = validateProperty(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const hostId = req.user.id; 
    console.log("hostId: " + hostId);
    const propertyResponse = await PropertyService.createProperty(value, hostId);

    if (propertyResponse.success) {
      return res.status(201).json({
        status: "201",
        message: propertyResponse.message,
        data: propertyResponse.property,
      });
    } else {
      return res.status(400).json({
        status: "400",
        message: propertyResponse.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to create property",
      error: error.message,
    });
  }
};

// Get all properties with optional filters
export const getAllProperties = async (req, res) => {
  const filters = {
    location: req.query.location,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice
  };

  try {
    const result = await PropertyService.getAllProperties(filters);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "Properties retrieved successfully",
        data: result.properties,
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
      message: "Failed to retrieve properties",
      error: error.message,
    });
  }
};

// Get a single property by ID
export const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await PropertyService.getPropertyById(id);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "Property retrieved successfully",
        data: result.property,
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
      message: "Failed to retrieve property",
      error: error.message,
    });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { error, value } = validatePropertyUpdate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const hostId = req.user.id; 
    const result = await PropertyService.updateProperty(id, value, hostId);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: result.message,
        data: result.property,
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
      message: "Failed to update property",
      error: error.message,
    });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await PropertyService.deleteProperty(id, req.user.id);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: result.message,
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
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

// Get properties by location
export const getPropertiesByLocation = async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({
      status: "400",
      message: "Location parameter is required",
    });
  }

  try {
    const result = await PropertyService.getPropertiesByLocation(location);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "Properties retrieved successfully",
        data: result.properties,
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
      message: "Failed to retrieve properties by location",
      error: error.message,
    });
  }
};

// Get properties by price range
export const getPropertiesByPriceRange = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  if (!minPrice || !maxPrice) {
    return res.status(400).json({
      status: "400",
      message: "Both minPrice and maxPrice parameters are required",
    });
  }

  try {
    const result = await PropertyService.getPropertiesByPriceRange(minPrice, maxPrice);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "Properties retrieved successfully",
        data: result.properties,
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
      message: "Failed to retrieve properties by price range",
      error: error.message,
    });
  }
};

// Check property availability
export const checkPropertyAvailability = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({
      status: "400",
      message: "Both startDate and endDate parameters are required",
    });
  }

  try {
    const result = await PropertyService.checkPropertyAvailability(id, startDate, endDate);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "Availability checked successfully",
        data: {
          isAvailable: result.isAvailable,
          conflictingBookings: result.conflictingBookings,
        },
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
      message: "Failed to check property availability",
      error: error.message,
    });
  }
};