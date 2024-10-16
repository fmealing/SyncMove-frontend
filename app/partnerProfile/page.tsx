import React from "react";
import { FaAward, FaHeartbeat, FaClock } from "react-icons/fa";

const PartnerProfile = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Bio Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Image and Basic Info */}
        <div className="md:w-1/3 flex flex-col items-center space-y-4  pt-16 pl-16">
          <img
            src="/avatars/avatar-1.jpg"
            alt="Profile"
            className="w-80 h-80 rounded-full object-cover border-2 border-textPrimary"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-textPrimary font-primary">
              Jane Do
            </h2>
            <p className="text-textSecondary font-primary">
              28 years old • 5 miles away
            </p>
          </div>
        </div>

        {/* Right Side: Bio and Fitness Goals */}
        <div className="md:w-2/3 space-y-6 pt-16 pr-16">
          {/* Bio */}
          <div>
            <h3 className="text-h3 font-semibold text-textPrimary font-primary">
              Bio
            </h3>
            <div className="divider"></div>
            <p className="text-textPrimary font-primary text-lg mb-6">
              Passionate fitness enthusiast who loves outdoor activities and
              meeting new workout partners. Enjoys a mix of cardio and strength
              training.
            </p>
          </div>

          {/* Fitness Goals */}
          <div>
            <h3 className="text-h3 font-semibold text-textPrimary font-primary">
              Fitness Goals
            </h3>
            <div className="divider"></div>
            <ul className="list-disc pl-5 space-y-1 text-textPrimary font-primary text-lg">
              <li>Complete a half marathon</li>
              <li>Improve squat to 100kg</li>
              <li>Build overall endurance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Activity Preference Section */}
        <div className="space-y-6 p-8 bg-gray-50 rounded-lg shadow-lg">
          <h3 className="text-h2 font-semibold text-textPrimary font-primary text-center">
            Activity Preference
          </h3>
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-8 justify-items-center">
            <button className="flex items-center justify-center w-[300px] h-[80px] rounded-full border-4 border-gradient-to-r from-red-400 to-red-600 text-primary text-h3 font-primary gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
              <FaHeartbeat className="text-red-500 text-2xl" />
              <span>Running</span>
            </button>

            <button className="flex items-center justify-center w-[300px] h-[80px] rounded-full border-4 border-gradient-to-r from-yellow-400 to-yellow-600 text-primary text-h3 font-primary gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
              <FaAward className="text-yellow-500 text-2xl" />
              <span>Intermediate</span>
            </button>

            <button className="flex items-center justify-center w-[300px] h-[80px] rounded-full border-4 border-gradient-to-r from-blue-400 to-blue-600 text-primary text-h3 font-primary gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
              <FaHeartbeat className="text-blue-500 text-2xl" />
              <span>Weightlifting</span>
            </button>

            <button className="flex items-center justify-center w-[300px] h-[80px] rounded-full border-4 border-gradient-to-r from-green-400 to-green-600 text-primary text-h3 font-primary gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
              <FaAward className="text-green-500 text-2xl" />
              <span>Advanced</span>
            </button>
          </div>
        </div>

        {/* Availability Section */}
        <div className="space-y-6 flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-gray-800 font-primary text-center">
            Availability
          </h3>
          <div className="divider w-full"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Card 1 */}
            <div className="flex items-center justify-start gap-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white w-[280px] h-[120px] rounded-lg shadow-lg p-4 transition transform hover:scale-105">
              <div className="bg-white rounded-full p-3 flex items-center justify-center">
                <FaClock className="text-blue-600 text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-primary">
                  Mornings
                </span>
                <span className="text-lg text-gray-200 font-primary">
                  Running
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-center justify-start gap-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white w-[280px] h-[120px] rounded-lg shadow-lg p-4 transition transform hover:scale-105">
              <div className="bg-white rounded-full p-3 flex items-center justify-center">
                <FaClock className="text-purple-600 text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-primary">
                  Evenings
                </span>
                <span className="text-lg text-gray-200 font-primary">
                  Weightlifting
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
