import { validateUser, validateUserLogin, validateUserUpdate } from "../utils/validations";
import * as UserService from "../services/users.service";

// Create a new user with email and password
export const createUser = async (req, res) => {
  const { error, value } = validateUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userResponse = await UserService.createUserWithEmail(value);

    if (userResponse.success) {
      return res.status(201).json({
        status: "201",
        message: userResponse.message,
        data: userResponse.user,
      });
    } else {
      return res.status(400).json({
        status: "400",
        message: userResponse.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to create user",
      error: error.message,
    });
  }
};

// Login user with email and password
export const loginUser = async (req, res) => {
  const { error, value } = validateUserLogin(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userResponse = await UserService.loginWithEmail(value);

    if (userResponse.success) {
      return res.status(200).json({
        status: "200",
        message: userResponse.message,
        token: userResponse.token,
        data: userResponse.user,
      });
    } else {
      return res.status(401).json({
        status: "401",
        message: userResponse.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to login",
      error: error.message,
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await UserService.getAllUsers();

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "Users retrieved successfully",
        data: result.users,
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
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UserService.getUserById(id);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: result.message,
        data: result.user,
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
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const result = await UserService.updateUserRole(id, role);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: result.message,
        data: result.user,
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
      message: "Failed to update user role",
      error: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { error, value } = validateUserUpdate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const result = await UserService.updateUserProfile(id, value);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: result.message,
        data: result.user,
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
      message: "Failed to update user profile",
      error: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UserService.deleteUser(id);

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
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// Get user's properties (for hosts)
export const getUserProperties = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UserService.getUserProperties(id);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "User properties retrieved successfully",
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
      message: "Failed to retrieve user properties",
      error: error.message,
    });
  }
};

// Get user's bookings (for renters)
export const getUserBookings = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UserService.getUserBookings(id);

    if (result.success) {
      return res.status(200).json({
        status: "200",
        message: "User bookings retrieved successfully",
        data: result.bookings,
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
      message: "Failed to retrieve user bookings",
      error: error.message,
    });
  }
};



// Create or login user with Google OAuth

export const createOrLoginUserWithGoogle = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Google token is required" });
  }

  try {
    const userResponse = await  UserService.createUserWithGoogle(token);

    if (userResponse.success) {
      return res.status(201).json({
        status: "201",
        message: userResponse.message,
        data: userResponse.user,
        token: userResponse.token, 
      });
    } else {
      return res.status(400).json({
        status: "400",
        message: userResponse.message,
      });
    }
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      status: "500",
      message: "Failed to create or login user with Google",
      error: error.message,
    });
  }
};