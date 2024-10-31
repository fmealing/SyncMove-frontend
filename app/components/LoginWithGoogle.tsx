import React from "react";

const LoginWithGoogle = () => {
  const handleLogin = () => {
    // Redirect the user to the Google OAuth route on the backend
    window.location.href = "http://localhost:5001/api/auth/callback/google";
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full max-w-md h-12 px-4 rounded-full border-2 border-textPrimary flex justify-center items-center gap-2 mb-4 hover:bg-actionAmber/5 transition"
    >
      <img src="/svg/google-logo.svg" alt="Google Logo" className="w-12 h-12" />
      <span className="font-primary text-center text-textPrimary text-base font-medium leading-tight hover:text-lg transition duration-500">
        Login with Google
      </span>
    </button>
  );
};

export default LoginWithGoogle;
