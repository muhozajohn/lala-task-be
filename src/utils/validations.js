import Joi from "joi";

// Schema for user creation
const userSchema = Joi.object({
    email: Joi.string().email().required(), 
    name: Joi.string().required().min(3).max(50), 
    password: Joi.string().required().min(6).max(50), 
    role: Joi.string().valid('RENTER', 'HOST').default('RENTER'), 
    googleId: Joi.string().optional(), 
  });
  
  export const validateUser = (userData) => {
    return userSchema.validate(userData);
  };
// Schema for user login by email
const userLoginSchema = Joi.object({
    email: Joi.string().email().required(), 
    password: Joi.string().required().min(6).max(50), 
  });
  
  export const validateUserLogin = (userData) => {
    return userLoginSchema.validate(userData);
  };


  // Schema for Google OAuth user creation
const googleUserSchema = Joi.object({
    email: Joi.string().email().required(), 
    name: Joi.string().required().min(3).max(50),
    googleId: Joi.string().required(), 
    role: Joi.string().valid('RENTER', 'HOST').default('RENTER'), 
  });
  
  export const validateGoogleUser = (userData) => {
    return googleUserSchema.validate(userData);
  };


  // Schema for user update
const userUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(), 
    email: Joi.string().email().optional(), 
    password: Joi.string().min(6).max(50).optional(), 
  });
  
  export const validateUserUpdate = (userData) => {
    return userUpdateSchema.validate(userData);
  };