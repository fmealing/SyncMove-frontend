"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const OnboardingCompletion: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const markOnboardingComplete = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await axios.post(
          "http://localhost:5001/api/users/onboarding/complete",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Onboarding completed!");
        router.push("/dashboard"); // Redirect to the main dashboard
      } catch (error) {
        console.error("Failed to complete onboarding:", error);
        toast.error("Failed to complete onboarding. Please try again.");
      }
    };

    markOnboardingComplete();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h2 className="text-3xl font-bold font-primary text-textPrimary">
        Welcome to SyncMove!
      </h2>
      <p className="text-lg mt-4 font-primary text-textPrimary">
        You’re all set and ready to explore the platform.
      </p>
      <p className="text-lg mt-4 font-primary text-textPrimary">
        Redirecting to your dashboard...
      </p>
    </div>
  );
};

export default OnboardingCompletion;
