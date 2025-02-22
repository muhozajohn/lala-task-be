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


  // Schema for property creation
  const propertySchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    pricePerNight: Joi.number().required().positive(),
    location: Joi.string().required().min(3).max(100),
    images: Joi.array().items(Joi.string().uri()).min(1).default([]),
    amenities: Joi.array().items(Joi.string()).min(1).default([]),
    houseRules: Joi.array().items(Joi.string()).min(1).default([]),
    maxGuests: Joi.number().required().min(1),  
    bathrooms: Joi.number().required().min(1), 
    bedrooms: Joi.number().required().min(1), 
  });
  

// Schema for property updates (all fields optional)
const propertyUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(1000),
  pricePerNight: Joi.number().positive(),
  location: Joi.string().min(3).max(100),
  images: Joi.array().items(Joi.string().uri()).min(1),
  amenities: Joi.array().items(Joi.string()).min(1),
  houseRules: Joi.array().items(Joi.string()).min(1),
  maxGuests: Joi.number().min(1),
  bathrooms: Joi.number().min(1),
  bedrooms: Joi.number().min(1),

}).min(1);
 // Require at least one field to be present

export const validateProperty = (propertyData) => {
  return propertySchema.validate(propertyData);
};

export const validatePropertyUpdate = (propertyData) => {
  return propertyUpdateSchema.validate(propertyData);
};



const bookingSchema = Joi.object({
  checkIn: Joi.date().iso().greater('now').required().messages({
    'date.base': 'Check-in must be a valid date.',
    'date.greater': 'Check-in date must be in the future.',
    'any.required': 'Check-in date is required.',
  }),

  checkOut: Joi.date().iso().greater(Joi.ref('checkIn')).required().messages({
    'date.base': 'Check-out must be a valid date.',
    'date.greater': 'Check-out must be after the check-in date.',
    'any.required': 'Check-out date is required.',
  }),

  status: Joi.string()
    .valid('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED')
    .required()
    .messages({
      'any.only': 'Status must be one of PENDING, CONFIRMED, CANCELLED, or COMPLETED.',
      'any.required': 'Booking status is required.',
    }),

  numberOfNights: Joi.number().integer().min(1).required().messages({
    'number.base': 'Number of nights must be a valid number.',
    'number.integer': 'Number of nights must be an integer.',
    'number.min': 'Number of nights must be at least 1.',
    'any.required': 'Number of nights is required.',
  }),

  numberOfGuests: Joi.number().integer().min(1).required().messages({
    'number.base': 'Number of guests must be a valid number.',
    'number.integer': 'Number of guests must be an integer.',
    'number.min': 'Number of guests must be at least 1.',
    'any.required': 'Number of guests is required.',
  }),

  totalPrice: Joi.number().positive().required().messages({
    'number.base': 'Total price must be a valid number.',
    'number.positive': 'Total price must be a positive number.',
    'any.required': 'Total price is required.',
  }),
});

// Function to validate booking data
export const validateBooking = (bookingData) => {
  return bookingSchema.validate(bookingData, { abortEarly: false });
};
