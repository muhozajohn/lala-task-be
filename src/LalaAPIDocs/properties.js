export const propertyPaths = {
  "/api/properties": {
    get: {
      tags: ["Properties"],
      summary: "Get All Properties",
      description: "Get all property listings",
      responses: {
        200: {
          description: "All properties retrieved successfully",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    post: {
      tags: ["Properties"],
      summary: "Create Property",
      description: "Create a new property listing",
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                pricePerNight: {
                  type: "number",
                },
                location: {
                  type: "string",
                },
                images: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        required: true,
      },
      responses: {
        201: {
          description: "New property created successfully",
        },
        400: {
          description: "Bad Request",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
  "/api/properties/location": {
    get: {
      tags: ["Properties"],
      summary: "Get Properties by Location",
      description: "Get all properties in a specific location",
      parameters: [
        {
          name: "location",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "Location to search for properties",
        },
      ],
      responses: {
        200: {
          description: "Properties retrieved successfully",
        },
        404: {
          description: "No properties found in this location",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
  "/api/properties/price-range": {
    get: {
      tags: ["Properties"],
      summary: "Get Properties by Price Range",
      description: "Get all properties within a specified price range",
      parameters: [
        {
          name: "min",
          in: "query",
          required: true,
          schema: {
            type: "number",
          },
          description: "Minimum price per night",
        },
        {
          name: "max",
          in: "query",
          required: true,
          schema: {
            type: "number",
          },
          description: "Maximum price per night",
        },
      ],
      responses: {
        200: {
          description: "Properties retrieved successfully",
        },
        400: {
          description: "Invalid price range",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
  "/api/properties/{id}": {
    get: {
      tags: ["Properties"],
      summary: "Get Property by ID",
      description: "Get a property by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Property retrieved successfully",
        },
        404: {
          description: "Property not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    put: {
      tags: ["Properties"],
      summary: "Update Property",
      description: "Update an existing property",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                pricePerNight: {
                  type: "number",
                },
                location: {
                  type: "string",
                },
                images: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: "Property updated successfully",
        },
        400: {
          description: "Bad Request",
        },
        404: {
          description: "Property not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    patch: {
      tags: ["Properties"],
      summary: "Partially Update Property",
      description: "Partially update an existing property",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                pricePerNight: {
                  type: "number",
                },
                location: {
                  type: "string",
                },
                images: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: "Property updated successfully",
        },
        400: {
          description: "Bad Request",
        },
        404: {
          description: "Property not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    delete: {
      tags: ["Properties"],
      summary: "Delete Property",
      description: "Delete a property by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Property deleted successfully",
        },
        400: {
          description: "Bad Request",
        },
        404: {
          description: "Property not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
  "/api/properties/{id}/availability": {
    get: {
      tags: ["Properties"],
      summary: "Check Property Availability",
      description: "Check if a property is available for a specific date range",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "Property ID",
        },
        {
          name: "startDate",
          in: "query",
          required: true,
          schema: {
            type: "string",
            format: "date",
          },
          description: "Start date of the stay",
        },
        {
          name: "endDate",
          in: "query",
          required: true,
          schema: {
            type: "string",
            format: "date",
          },
          description: "End date of the stay",
        },
      ],
      responses: {
        200: {
          description: "Availability checked successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  available: {
                    type: "boolean",
                    description: "Whether the property is available for the specified dates",
                  },
                  conflictingDates: {
                    type: "array",
                    items: {
                      type: "string",
                      format: "date",
                    },
                    description: "List of dates that are already booked (if any)",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid date range",
        },
        404: {
          description: "Property not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
};