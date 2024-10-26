"use client";
import React, { useState } from "react";
import Step1BasicInfo from "../components/onboarding/Step1BasicInfo";
import Step2FitnessPreferences from "../components/onboarding/Step2FitnessPreferences";
import Step3Availability from "../components/onboarding/Step3Availability";
import Step4ProfileCustomization from "../components/onboarding/Step4ProfileCustomisation";
import Step4Preferences from "../components/onboarding/Step4Preferences";
import OnboardingCompletion from "../components/onboarding/OnboardingCompletion";
import Link from "next/link";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Progress to the next step
  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  // Render the component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo onComplete={goToNextStep} />;
      case 2:
        return <Step2FitnessPreferences onComplete={goToNextStep} />;
      case 3:
        return <Step3Availability onComplete={goToNextStep} />;
      case 4:
        return <Step4Preferences onComplete={goToNextStep} />;
      case 5:
        return <OnboardingCompletion />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-primary to-primaryDark pb-8">
      <h1 className="text-h2 font-bold text-white mt-10 mb-4">
        SyncMove Onboarding
      </h1>

      {/* Step Progress Bar */}
      <div className="w-full max-w-md mt-4">
        <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className={`absolute h-full bg-actionAmber transition-all duration-300`}
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
        <p className="text-center text-white mt-2">Step {currentStep} of 5</p>
      </div>

      {/* Card Style for Steps */}
      <div className="w-full max-w-lg mt-8 p-8 bg-white rounded-3xl shadow-lg">
        {renderStep()}
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-100">
        Need help?{" "}
        <Link href="/FAQ" className="underline text-actionAmber">
          Contact Support
        </Link>
      </p>
    </div>
  );
};

export default Onboarding;
