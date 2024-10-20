"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      // Redirect to the homepage if token is missing
      if (!token) {
        router.push("/");
        return;
      }

      try {
        // Decode and check expiration of the token
        const decoded = jwtDecode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        // If token is expired, redirect to the homepage
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          router.push("/");
          return;
        }

        // If token is valid, mark the user as authenticated
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/"); // Redirect on any error
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Loading state while checking authentication
  }

  // Render children only if the user is authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default AuthWrapper;
