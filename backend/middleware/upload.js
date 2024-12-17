const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();
console.log("cloudinary", process.env.CLOUDINARY_CLOUD_NAME);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "social_app",
    allowed_formats: ["jpg", "jpeg", "png", "gif","webp", "mp4", "mov"],
    resource_type: "auto",
  },
});

// Create multer upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 80 * 1024 * 1024, // 10MB limit
  },
});

module.exports = {
  upload,
  cloudinary,
};
