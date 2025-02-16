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
  };