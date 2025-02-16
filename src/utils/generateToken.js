import jwt from "jsonwebtoken";

const generateToken = (user) => {
  // Exclude sensitive information like password
  const { password, ...userData } = user;

  // Create token with user data
  return jwt.sign(
    { 
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      googleId: userData.googleId,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export default generateToken;