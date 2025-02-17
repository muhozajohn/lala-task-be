import express from 'express';
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  getPropertiesByLocation,
  getPropertiesByPriceRange,
  checkPropertyAvailability
} from '../controllers/property.controller';
import fileUpload from '../utils/multer';

const propertyRoute = express.Router();

propertyRoute.post("/", fileUpload.array("images"), createProperty);
propertyRoute.get("/", getAllProperties);
propertyRoute.get("/location", getPropertiesByLocation);
propertyRoute.get("/price-range", getPropertiesByPriceRange);
propertyRoute.get("/:id", getPropertyById);
propertyRoute.put("/:id", fileUpload.array("images"), updateProperty);
propertyRoute.patch("/:id", fileUpload.array("images"), updateProperty);
propertyRoute.delete("/:id", deleteProperty); 
propertyRoute.get("/:id/availability", checkPropertyAvailability);

export default propertyRoute;
