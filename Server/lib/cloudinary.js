// Import Cloudinary v2 and rename it as 'cloudinary' for use
import { v2 as cloudinary } from "cloudinary";

// Configure cloudinary with your account details using environment variables
cloudinary.config({
    // Your Cloudinary cloud name from your account
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    // Your Cloudinary public API key
    api_key: process.env.CLOUDINARY_API_KEY,

    // Your Cloudinary secret key (⚠️ make sure there's no typo in the env variable name)
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the configured cloudinary instance so you can use it in other files
export default cloudinary;
