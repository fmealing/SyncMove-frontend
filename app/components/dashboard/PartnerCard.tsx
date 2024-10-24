import React, { useEffect, useState } from "react";
import { fetchCityFromCoordinates } from "@/app/utils/geoCoding";

interface PartnerCardProps {
  fullName: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  profilePicture: string;
  bio: string;
  matchScore?: number; // Optional
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  fullName,
  location,
  profilePicture,
  bio,
  matchScore,
}) => {
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    if (location && location.coordinates) {
      const [longitude, latitude] = location.coordinates;

      const fetchCity = async () => {
        const fetchedCity = await fetchCityFromCoordinates(latitude, longitude);
        setCity(fetchedCity || "Unknown");
      };

      fetchCity();
    }
  }, [location]);

  // Handle undefined matchScore
  const matchPercentage = matchScore !== undefined ? matchScore : "0";

  // Determine color based on match percentage
  const matchColor =
    matchScore !== undefined
      ? matchScore >= 0.75
        ? "bg-green-500"
        : matchScore >= 0.5
        ? "bg-yellow-500"
        : "bg-red-500"
      : "bg-gray-300"; // Default gray for undefined

  return (
    <div className="card bg-base-100 shadow-lg border border-gray-200 rounded-lg overflow-hidden">
      <figure>
        <img
          src={profilePicture}
          alt={fullName}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body p-6">
        <h3 className="card-title text-2xl font-semibold text-textPrimary">
          {fullName}
        </h3>
        {city && (
          <p className="text-textSecondary font-primary mb-2">
            Location: {city}
          </p>
        )}
        <p className="text-textPrimary font-primary mb-4">{bio}</p>

        {/* Match score with visual bar */}
        {matchScore !== undefined ? (
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-textPrimary">Match:</p>
            <div className="flex items-center">
              <div className="relative w-40 h-2 bg-gray-200 rounded-full mr-3">
                <div
                  className={`absolute h-full rounded-full ${matchColor}`}
                  style={{ width: `${matchPercentage}%` }}
                ></div>
              </div>
              <span className="text-lg font-bold text-textPrimary">
                {matchPercentage}%
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PartnerCard;
