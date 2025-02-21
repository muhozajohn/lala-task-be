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
import authMiddleware from '../middlewares/auth';

const propertyRoute = express.Router();

propertyRoute.post("/", fileUpload.array("images"),authMiddleware, createProperty);
propertyRoute.get("/", getAllProperties);
propertyRoute.get("/location", getPropertiesByLocation);
propertyRoute.get("/price-range", getPropertiesByPriceRange);
propertyRoute.get("/:id", getPropertyById);
propertyRoute.put("/:id", fileUpload.array("images"),authMiddleware, updateProperty);
propertyRoute.patch("/:id", fileUpload.array("images"),authMiddleware, updateProperty);
propertyRoute.delete("/:id",authMiddleware, deleteProperty); 
propertyRoute.get("/:id/availability", checkPropertyAvailability);

export default propertyRoute;
