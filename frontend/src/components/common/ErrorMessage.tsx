import React from "react";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
    {error}
  </div>
);

export default ErrorMessage;
