export const userPaths = {
    "/api/users": {
      post: {
        tags: ["Users"],
        summary: "Create User",
        description: "Create a new user with email and password",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                    enum: ["RENTER", "HOST"],
                  }
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New user created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      get: {
        tags: ["Users"],
        summary: "Get All Users",
        description: "Get all users (both renters and hosts)",
        responses: {
          200: {
            description: "All users retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/users/google": {
      post: {
        tags: ["Users"],
        summary: "Google OAuth",
        description: "Create or login user with Google OAuth",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                    description: "Google OAuth token",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          201: {
            description: "New user created successfully",
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
    "/api/users/auth": {
      post: {
        tags: ["Users"],
        summary: "User Login",
        description: "Login user with email and password",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  file: {
                    type: "string",
                    format: "binary",
                    description: "User avatar image",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User logged in successfully",
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
    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get User by ID",
        description: "Get a user by ID",
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
            description: "User retrieved successfully",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update User Profile",
        description: "Update user profile information",
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
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User profile updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Update User Profile",
        description: "Update user profile information (partial update)",
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
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },

                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User profile updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete User",
        description: "Delete a user by ID",
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
            description: "User deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/users/{id}/role": {
      patch: {
        tags: ["Users"],
        summary: "Update User Role",
        description: "Update user role (RENTER or HOST)",
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
                  role: {
                    type: "string",
                    enum: ["RENTER", "HOST"],
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User role updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/users/{id}/properties": {
      get: {
        tags: ["Users"],
        summary: "Get User Properties",
        description: "Get all properties owned by a host user",
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
            description: "User properties retrieved successfully",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/users/{id}/bookings": {
      get: {
        tags: ["Users"],
        summary: "Get User Bookings",
        description: "Get all bookings made by a renter user",
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
            description: "User bookings retrieved successfully",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  };