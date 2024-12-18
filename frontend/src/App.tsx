// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/FeedPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserProfile from "./pages/UserProfilePage";
import EditProfile from "./pages/EditProfilePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import CreatePostPage from "./pages/CreatePostPage";
import OAuthSuccess from "./components/auth/OAuthSuccess";
import AuthProvider from "./components/auth/AuthProvider";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/oauth-success" element={<OAuthSuccess />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
