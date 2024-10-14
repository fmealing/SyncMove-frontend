import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const FinalCTA: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-white py-16">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-textPrimary font-primary mb-8 text-center">
        Ready to Find Your Perfect Workout Partner?
      </h2>

      {/* Sign Up Button */}
      <button className="flex items-center px-8 py-4 bg-primary text-white rounded-full text-lg font-bold font-secondary transition duration-300 hover:bg-opacity-90">
        <Link href="/signup" className="flex items-center justify-center">
          <span className="mr-3">Sign Up Now</span>
          <FaArrowRight className="w-5 h-5" />
        </Link>
      </button>
    </div>
  );
};

export default FinalCTA;
