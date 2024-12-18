import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../contexts/authStore";
import ErrorMessage from "../common/ErrorMessage";

interface RegisterFormProps {
  error: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage error={error} />}

      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition disabled:bg-gray-300"
      >
        Create account
      </button>

      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-gray-500">Already have an account?</span>
        <Link to="/login" className="text-black hover:text-gray-600">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
