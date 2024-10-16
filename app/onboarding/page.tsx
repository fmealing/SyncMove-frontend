"use client";
import React, { useState } from "react";
import Step1 from "../components/onboarding/Step1";
import Step2 from "../components/onboarding/Step2";
import Step3 from "../components/onboarding/Step3";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [userId] = useState("670fde1aa9cfbad6c7e0aa4b");
  const [userData, setUserData] = useState({
    activityType: "",
    experienceLevel: 0,
  });

  const goNext = () => {
    if (step === 1) {
      handleSubmitStep1();
    } else if (step === 2) {
      handleSubmitStep2();
    } else {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleStep1Data = (activityType: string, experienceLevel: number) => {
    setUserData({ activityType, experienceLevel });
  };

  const handleStep2Data = (goal: string) => {
    setFitnessGoal(goal);
  };

  const handleSubmitStep1 = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          activityType: userData.activityType,
          experienceLevel: userData.experienceLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStep(step + 1);
    } catch (error) {
      console.error("Failed to submit Step 1 data:", error);
    }
  };

  const handleSubmitStep2 = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          fitnessGoals: fitnessGoal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStep(step + 1); // Proceed to Step 3
    } catch (error) {
      console.error("Failed to submit Step 2 data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto p-4 min-h-screen">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="w-full">
        {step === 1 && <Step1 onSubmit={handleStep1Data} />}
        {step === 2 && <Step2 onSubmit={handleStep2Data} />}
        {step === 3 && <Step3 />}
      </div>

      {/* Navigation Buttons */}
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
