import Link from "next/link";
import React from "react";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <div className="hero-background flex flex-col items-center justify-center mx-auto py-16">
      {/* Main Heading */}
      <div className="text-center text-lightGray text-5xl font-bold font-primary leading-[60px] mb-4">
        Find Your Perfect Workout Partner Today
      </div>

      {/* Subheading */}
      <div className="text-center text-lightGray text-lg font-normal font-primary leading-snug mb-8">
        Connect with fitness enthusiasts who match your goals and schedule
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 w-full items-center">
        {/* Get Started Button */}
        <div className="h-16 px-4 bg-primary rounded-full flex justify-center items-center gap-2 cursor-pointer">
          <Link
            href="/signup"
            className="flex justify-center items-center gap-2 "
          >
            <FaArrowRight className="w-5 h-5 text-lightGray" />
            <div className="text-center text-lightGray text-xl font-medium font-primary leading-[25px]">
              Get Started
            </div>
          </Link>
        </div>

        {/* Learn More Button */}
        <div className="h-12 px-4 bg-secondary rounded-full flex justify-center items-center gap-2 cursor-pointer">
          <Link
            href="/features"
            className="flex items-center justify-center gap-2"
          >
            <FaInfoCircle className="w-5 h-5 text-white" />
            <div className="text-center text-white text-base font-medium font-primary leading-tight">
              Learn More
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
