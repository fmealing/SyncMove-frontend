import React, { useEffect, useState } from "react";
import { fetchCityFromCoordinates } from "@/app/utils/geoCoding";

interface PartnerCardProps {
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  image: string;
  bio: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  name,
  location,
  image,
  bio,
}) => {
  const [longitude, latitude] = location.coordinates;
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchCity = async () => {
      const city = await fetchCityFromCoordinates(latitude, longitude);
      setCity(city);
    };

    fetchCity();
  });

  return (
    <div className="card bg-base-100 shadow-lg">
      <figure>
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-textPrimary font-primary">{name}</h3>
        <p className="text-textPrimary font-primary">
          Location: {city ? city : "Unknown"}
        </p>
        <p className="text-textPrimary font-primary">{bio}</p>
      </div>
    </div>
  );
};

export default PartnerCard;
