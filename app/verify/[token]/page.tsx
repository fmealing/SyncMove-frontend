"use client"; // Add this at the top to enable client-side behavior

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams for query params
import axios from "axios";
import toast from "react-hot-toast";

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search params
  const token = searchParams.get("token"); // Extract token from URL
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          await axios.get(
            `http://localhost:5001/api/email/verify?token=${token}`
          );
          setStatus("Verification successful! Redirecting to onboarding...");
          toast.success("Your account has been verified!");
          setTimeout(() => {
            router.push("/onboarding");
          }, 3000);
        } catch (error) {
          setStatus("Verification failed. Token may be invalid or expired.");
          toast.error("Verification failed. Please try again.");
        }
      };

      verifyEmail();
    }
  }, [token, router]);

  return (
    <div className="verification-page min-h-screen">
      <h1 className="text-h1 font-primary text-textPrimary">{status}</h1>
      <p className="text-lg font-primary text-textPrimary">Please wait...</p>
    </div>
  );
};

export default Verify;
