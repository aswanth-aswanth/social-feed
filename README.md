# Social Media Platform

A modern social media application built with React, Node.js, and Express, featuring  feeds, video support, and Google authentication.

## Features

- **User Authentication**

  - Email/Password registration and login
  - Google OAuth integration
  - Password reset functionality

- **Social Media Feed**

  - Text, image, and video posts
  - Multi-image upload support
  - Camera integration for photo capture
  - Infinite scrolling (20 posts per batch)

- **Media Handling**

  - Automatic video playback in viewport
  - Image optimization
  - Cloudinary integration for media storage

- **User Profiles**

  - Customizable profile pictures
  - Bio and personal information
  - "My Posts" section

- **Sharing**

  - Cross-platform post sharing
  - Social media integration

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- TailwindCSS
- Zustand (State Management)
- React Router v7
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Passport.js
- JWT Authentication
- Cloudinary
- Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Google OAuth credentials

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/aswanth-aswanth/social-feed.git
```

 

1. **Backend Setup**

 

```bash
cd backend
npm install
```

 

Create a `.env` file in the backend directory with the following variables:

 

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/your_database

# Authentication
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Email Configuration
SMTP_USER=your_email_username
SMTP_PASS=your_email_password
SMTP_FROM=noreply@yourdomain.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=http://localhost:5173

# Server Configuration
PORT=5000
```

 

1. **Frontend Setup**

 

```bash
cd frontend
npm install
```

 

Create a `.env` file in the frontend directory:

 

```env
VITE_API_URL=http://localhost:5000
```

 

## Running the Application

 

1. **Start MongoDB**

   - If using local MongoDB:

   ```bash
   mongod
   ```

   - Or use MongoDB Atlas connection string in your `.env`

2. **Start the Backend Server**

 

```bash
cd backend
npm run dev
```

 

The backend will start on `http://localhost:5000`

 

1. **Start the Frontend Development Server**

 

```bash
cd frontend
npm run dev
```

 

The frontend will start on `http://localhost:5173`

 

## Environment Variables Guide

 

### Backend Environment Variables

 

- `MONGODB_URI`: Your MongoDB connection string

  - Local: `mongodb://localhost:27017/your_database`
  - Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/your_database`

- `JWT_SECRET`: Secret key for JWT token generation

  - Example: Generate a secure random string

- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`:

  - Obtain from Google Cloud Console
  - Required for Google OAuth authentication

- `SMTP_*` variables:

  - For email functionality (password reset, notifications)
  - Can use Gmail SMTP or other providers

- `CLOUDINARY_*` variables:

  - Required for image and video uploads
  - Obtain from Cloudinary dashboard

- `FRONTEND_URL`:

  - Development: `http://localhost:5173`
  - Production: Your frontend domain

 

### Frontend Environment Variables

 

- `VITE_API_URL`: Backend API URL 
  - Development: `http://localhost:5000`
  - Production: Your backend API domain

 

## Development Workflow

 

1. **Backend Development**

 

```bash
cd backend
npm run dev
```

 

- Runs with nodemon for auto-reloading
- Watch for changes in the terminal

 

1. **Frontend Development**

 

```bash
cd frontend
npm run dev
```

 

- Vite dev server with HMR
- Watch for changes in the browser

 

1. **Building for Production**

 

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd backend
npm start
```

 

## Common Setup Issues

 

1. **MongoDB Connection**

   - Ensure MongoDB is running locally
   - Check connection string format
   - Verify network access if using Atlas

2. **Cloudinary Setup**

   - Verify API credentials
   - Check upload preset configuration
   - Ensure proper CORS settings

3. **Google OAuth**

   - Add authorized redirect URIs in Google Console
   - Verify client ID and secret
   - Check callback URL configuration

4. **CORS Issues**

   - Verify FRONTEND_URL in backend .env
   - Check API_URL in frontend .env
   - Ensure ports match configuration

 

## Development Tips

 

- Use `console.log` in backend routes for debugging
- Check browser console for frontend errors
- Use React DevTools for component debugging
- Monitor MongoDB queries using Compass
- Use Cloudinary dashboard to manage uploads

 

Let me know if you need any clarification or have questions about specific parts of the setup!

 