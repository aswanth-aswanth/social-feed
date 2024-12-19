import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FeedPage, LoginPage, RegisterPage, UserProfilePage, EditProfilePage, CreatePostPage, ResetPasswordPage } from "./pages";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { OAuthSuccess, AuthProvider } from "./components/auth";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
              <Route path="/create-post" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
