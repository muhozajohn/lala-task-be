export const bookingPaths = {
    "/api/bookings": {
      get: {
        tags: ["Bookings"],
        summary: "Get All Bookings",
        description: "Get all bookings",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "All bookings retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Bookings"],
        summary: "Create Booking",
        description: "Create a new booking",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  propertyId: {
                    type: "string",
                  },
                  checkIn: {
                    type: "string",
                    format: "date-time",
                  },
                  checkOut: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New booking created successfully",
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
    "/api/bookings/{id}": {
      get: {
        tags: ["Bookings"],
        summary: "Get Booking by ID",
        description: "Get a booking by ID",
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
            description: "Booking retrieved successfully",
          },
          404: {
            description: "Booking not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Bookings"],
        summary: "Update Booking",
        description: "Update an existing booking",
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
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  checkIn: {
                    type: "string",
                    format: "date-time",
                  },
                  checkOut: {
                    type: "string",
                    format: "date-time",
                  },
                  status: {
                    type: "string",
                    enum: ["PENDING", "CONFIRMED", "CANCELED"],
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Booking updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Booking not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Bookings"],
        summary: "Delete Booking",
        description: "Delete a booking by ID",
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
            description: "Booking deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Booking not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  };