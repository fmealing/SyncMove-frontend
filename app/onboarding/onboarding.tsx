"use client";
import React, { useEffect, useState } from "react";
import Step1 from "../components/onboarding/Step1";
import Step2 from "../components/onboarding/Step2";
import Step3 from "../components/onboarding/Step3";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({
    activityType: "",
    experienceLevel: 0,
    location: { lat: 0, lon: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const decoded = jwtDecode<{ id: string }>(token);
      setUserId(decoded.id);

      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${decoded.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, []);

  const goNext = () => {
    if (step === 1) {
      handleSubmitStep1();
    } else if (step === 2) {
      handleSubmitStep2(fitnessGoal);
    } else {
      handleSubmitStep3();
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitStep1 = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          activityType: userData.activityType,
          experienceLevel: userData.experienceLevel,
          location: {
            type: "Point",
            coordinates: [userData.location.lon, userData.location.lat],
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStep(step + 1);
    } catch (error) {
      console.error("Failed to submit Step 1 data:", error);
    }
  };

  const handleSubmitStep2 = async (goal: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          fitnessGoals: goal,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStep(3); // Move to Step 3 after API call success
    } catch (error) {
      console.error("Failed to submit Step 2 data:", error);
    }
  };

  const handleSubmitStep3 = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          availability: {
            date: selectedDate, // Ensure selectedDate is formatted as needed
            timeOfDay: [selectedTime],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Navigate to the dashboard or complete the onboarding process
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Failed to submit Step 3 data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto p-4 min-h-screen">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="w-full">
        {/* In the Onboarding component: */}
        {step === 1 && (
          <Step1 userId={userId} goToNextStep={() => setStep(2)} />
        )}
        {step === 2 && <Step2 onSubmit={handleSubmitStep2} />}
        {step === 3 && (
          <Step3 setDate={setSelectedDate} setTime={setSelectedTime} />
        )}
      </div>

      <div className="flex justify-center w-full mt-6 gap-4">
        <button
          className="h-12 px-4 rounded-md border-2 border-[#ffa500] flex justify-center items-center gap-2 text-[#ffa500] text-lg font-bold font-['Montserrat']"
          onClick={goBack}
          disabled={step === 1}
        >
          <FaArrowLeft className="w-5 h-5" />
          Back
        </button>

        <button
          className="h-12 px-4 bg-[#007bff] rounded-md flex justify-center items-center gap-2 text-[#f7f7f7] text-lg font-medium font-['Montserrat']"
          onClick={goNext}
        >
          {step < 3 ? "Next" : "Finish"}
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
