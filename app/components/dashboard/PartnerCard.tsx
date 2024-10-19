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
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  fullName,
  location,
  profilePicture,
  bio,
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

  return (
    <div className="card bg-base-100 shadow-lg">
      <figure>
        <img
          src={profilePicture}
          alt={fullName}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-textPrimary font-primary">{fullName}</h3>
        {city && (
          <p className="text-textSecondary font-primary">
            Location: {city ? city : "Unknown"}
          </p>
        )}
        <p className="text-textPrimary font-primary">{bio}</p>
      </div>
    </div>
  );
};

export default PartnerCard;
