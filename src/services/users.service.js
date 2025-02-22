import bcrypt from 'bcrypt';
import { PrismaClient, UserRole } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import generateToken from "../utils/generateToken";

const prisma = new PrismaClient();
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  redirectUri: process.env.CALL_BACK_URL,
});

// Create or login user with Google OAuth
export const createUserWithGoogle = async (googletoken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: googletoken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // If user exists, generate a token and return the user
      const token = generateToken(existingUser);
      return {
        success: true,
        message: "User logged in successfully",
        user: existingUser,
        token,
      };
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        googleId,
        role: UserRole.RENTER, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Generate token for the new user
    const token = generateToken(newUser);

    return {
      success: true,
      message: "User created successfully",
      user: newUser,
      token,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};


// Create a new user with email and password
export const createUserWithEmail = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email: userData.email }
    });

    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email:userData.email,
        name:userData.name,
        password: hashedPassword,
        role: userData.role || UserRole.RENTER,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    });

    return { 
      success: true, 
      message: "User created successfully", 
      user: newUser 
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        properties: true,
        bookings: true
      }
    });
    return { success: true, users };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get a single user by ID
export const getUserById = async (userId) => {
  try {
    const id = parseInt(userId);
    
    if (isNaN(id)) {
      return { success: false, message: "Invalid user ID format" };
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        properties: true,
        bookings: {
          include: {
            property: true
          }
        }
      }
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Update user role
export const updateUserRole = async (userId, role) => {
  try {
    const id = parseInt(userId);
    
    if (isNaN(id)) {
      return { success: false, message: "Invalid user ID format" };
    }

    const user = await prisma.user.findUnique({ 
      where: { id }
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (!['RENTER', 'HOST'].includes(role)) {
      return { success: false, message: "Invalid role. Must be either RENTER or HOST" };
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role,
        updatedAt: new Date()
      }
    });

    return { 
      success: true, 
      message: "User role updated successfully", 
      user: updatedUser 
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const id = parseInt(userId);
    
    if (isNaN(id)) {
      return { success: false, message: "Invalid user ID format" };
    }

    const user = await prisma.user.findUnique({ 
      where: { id }
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: userData.name || user.name,
        email: userData.email || user.email,
        updatedAt: new Date()
      }
    });

    return { 
      success: true, 
      message: "User profile updated successfully", 
      user: updatedUser 
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Delete user with cascade
export const deleteUser = async (userId) => {
  try {
    const id = parseInt(userId);
    
    if (isNaN(id)) {
      return { success: false, message: "Invalid user ID format" };
    }

    const user = await prisma.user.findUnique({ 
      where: { id }
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Delete user and all related data (Prisma will handle cascading)
    await prisma.user.delete({ 
      where: { id }
    });

    return { 
      success: true, 
      message: "User and all related data deleted successfully" 
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get user's properties (for hosts)
export const getUserProperties = async (userId) => {
  try {
    const id = parseInt(userId);
    
 
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        properties: {
          include: {
            bookings: true
          }
        }
      }
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.role !== 'HOST') {
      return { success: false, message: "User is not a host" };
    }

    return { 
      success: true, 
      properties: user.properties 
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};

// Get user's bookings (for renters)
export const getUserBookings = async (userId) => {
  try {
    const id = parseInt(userId);
    
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            property: true
          }
        }
      }
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.role !== 'RENTER') {
      return { success: false, message: "User is not a renter" };
    }

    return { 
      success: true, 
      bookings: user.bookings 
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};


// Login user by email
export const loginWithEmail = async (userData) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { email: userData.email } 
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid password" };
    }

    // Generate token with user data
    const token = generateToken(user);

    return {
      success: true,
      message: "Login successful",
      token,
    };
  } catch (error) {
    console.error("Service Error:", error);
    return { success: false, message: error.message };
  }
};