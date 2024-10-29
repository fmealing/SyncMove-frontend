"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Verify = () => {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying...");
  const email = "florian@syncmove.co.uk"; // TODO: Get email from query params

  useEffect(() => {
    console.log("Fetching verification...");

    const verifyEmail = async () => {
      try {
        console.log("Sending verification request...");
        await axios.get(
          `http://localhost:5001/api/email/verify?email=${email}`
        );
        console.log("Verification successful!");
        setStatus("Verification successful! Redirecting to onboarding...");
        toast.success("Your account has been verified!");
        setTimeout(() => {
          console.log("Redirecting to onboarding...");
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
