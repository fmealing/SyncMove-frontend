"use client";
import React, { useState } from "react";
import Step1 from "../components/onboarding/Step1";
import Step2 from "../components/onboarding/Step2";
import Step3 from "../components/onboarding/Step3";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);

  const goNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto p-4">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="w-full">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center w-full mt-6 gap-4">
        {/* Back Button */}
        <button
          className="h-12 px-4 rounded-md border-2 border-[#ffa500] flex justify-center items-center gap-2 text-[#ffa500] text-lg font-bold font-['Montserrat']"
          onClick={goBack}
          disabled={step === 1}
        >
          <FaArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Next or Finish Button */}
        <button
          className="h-12 px-4 bg-[#007bff] rounded-md flex justify-center items-center gap-2 text-[#f7f7f7] text-lg font-medium font-['Montserrat']"
          onClick={goNext}
        >
          Next
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
