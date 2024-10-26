"use client";
import React, { useState } from "react";
import Step1BasicInfo from "../components/onboarding/Step1BasicInfo";
import Step2FitnessPreferences from "../components/onboarding/Step2FitnessPreferences";
import Step3Availability from "../components/onboarding/Step3Availability";
import Step4ProfileCustomization from "../components/onboarding/Step4ProfileCustomisation";
import Step4Preferences from "../components/onboarding/Step4Preferences";
import OnboardingCompletion from "../components/onboarding/OnboardingCompletion";

const Onboarding = () => {
  // Track the current step and completed step count
  const [currentStep, setCurrentStep] = useState(1);

  // Progress to the next step
  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Render the component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo onComplete={goToNextStep} />;
      case 2:
        return <Step2FitnessPreferences onComplete={goToNextStep} />;
      case 3:
        return <Step3Availability onComplete={goToNextStep} />;
      // case 4:
      //   return <Step4ProfileCustomization onComplete={goToNextStep} />;
      case 4:
        return <Step4Preferences onComplete={goToNextStep} />;
      case 5:
        return <OnboardingCompletion />; // Final completion step
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-h2 font-bold font-primary text-textPrimary mb-6">
        Welcome to SyncMove Onboarding
      </h1>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {renderStep()}
      </div>
      <p className="mt-4 text-gray-500">Step {currentStep} of 5</p>
    </div>
  );
};

export default Onboarding;
