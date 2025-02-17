import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUserProfile,
  updateUserRole,
  createOrLoginUserWithGoogle,
  getUserProperties,
  getUserBookings,
} from '../controllers/users.controller';
import fileUpload from '../utils/multer';
import authMiddleware from '../middlewares/auth';



const userRoute = express.Router();

// Create a new user with email and password
userRoute.post('/', fileUpload.single('file'), createUser);

// Create or login user with Google OAuth
userRoute.post('/google', createOrLoginUserWithGoogle);

// Login user with email and password
userRoute.post('/auth', fileUpload.single('file'), loginUser);

// Get all users
userRoute.get('/', getAllUsers);

// Get a single user by ID
userRoute.get('/:id', getUserById);

// Update user profile
userRoute.put('/:id', fileUpload.single('file'), updateUserProfile);
userRoute.patch('/:id', fileUpload.single('file'), updateUserProfile);

// Update user role
userRoute.patch('/:id/role', updateUserRole);

// Delete user
userRoute.delete('/:id', deleteUser);

// Get user's properties (for hosts)
userRoute.get('/:id/properties',authMiddleware, getUserProperties);

// Get user's bookings (for renters)
userRoute.get('/:id/bookings',authMiddleware, getUserBookings);

export default userRoute;