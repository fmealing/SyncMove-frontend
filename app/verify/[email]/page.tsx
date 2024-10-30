"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Verify = () => {
  const router = useRouter();
  const params = useParams();
  const email = decodeURIComponent(
    Array.isArray(params.email) ? params.email[0] : params.email
  );
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!email) {
      setStatus("No email found. Please check the verification link.");
      return;
    }

    const verifyEmail = async () => {
      console.log("Email:", email);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/email/verify?email=${email}`
        );

        // const token = response.data.token;
        // localStorage.setItem("token", token); // Store token in localStorage

        setStatus("Verification successful! Redirecting to onboarding...");
        toast.success("Your account has been verified!");

        setTimeout(() => {
          router.push("/onboarding");
        }, 3000);
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("Verification failed. Please try again.");
        toast.error("Verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [router, email]);

  return (
    <div className="min-h-screen">
      <h1 className="text-h1 font-primary text-textPrimary">{status}</h1>
      <p className="text-lg font-primary text-textPrimary">Please wait...</p>
    </div>
  );
};

export default Verify;
