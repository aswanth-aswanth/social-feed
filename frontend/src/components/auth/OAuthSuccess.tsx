import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Loading from "../common/Loading";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleOAuthSuccess } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      handleOAuthSuccess(token)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, handleOAuthSuccess]);

  return <Loading />;
};

export default OAuthSuccess;
