import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import Loading from "../common/Loading";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { initializeAuth, initialized } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!initialized) return <Loading />;
  return <>{children}</>;
};

export default AuthProvider;
