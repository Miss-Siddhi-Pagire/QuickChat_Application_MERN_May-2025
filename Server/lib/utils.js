// Import the jsonwebtoken library to work with JWTs (signing, verifying, etc.)
import jwt from "jsonwebtoken";

// Function to generate a JWT token using the user's ID
export const generateToken = (userId) => {
    
    // Create (sign) a new token with the user's ID as payload
    // The token is signed using a secret key from your .env file
    // 'expiresIn: "7d"' means the token will expire in 7 days
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
