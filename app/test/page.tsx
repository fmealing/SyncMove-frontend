"use client";
import React, { useEffect, useState } from "react";
import { fetchCityFromCoordinates } from "../utils/geoCoding";

const page = () => {
  const lat = 40.7128;
  const lon = -74.006;

  // State to store the fetched city
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const getCity = async () => {
      const cityName = await fetchCityFromCoordinates(lat, lon);
      setCity(cityName || "City not found");
    };

    getCity();
  }, []);

  return (
    <div>
      <h1 className="text-h1 text-textPrimary font-primary">Test Page</h1>
      <p className="text-h3 text-textPrimary font-primary">City: {city}</p>
    </div>
  );
};

export default page;
