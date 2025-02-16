import express from "express";
import { serve, setup } from "swagger-ui-express";
import { userPaths } from "./users.js";
import { propertyPaths } from "./properties.js";
import { bookingPaths } from "./bookings.js";

const docrouter = express.Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "LaLa Rental Booking API",
    version: "1.0.0",
    description: "Documentation for LaLa Rental Booking Platform API.",
  },
  basePath: "/",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "Users",
      description: "Operations related to Users (Renters and Hosts)",
    },
    {
      name: "Properties",
      description: "Operations related to Property listings",
    },
    {
      name: "Bookings",
      description: "Operations related to Booking reservations",
    },
  ],
  paths: {
    ...userPaths,
    ...propertyPaths,
    ...bookingPaths,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "Authorization",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;