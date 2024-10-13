import React from "react";

interface PartnerCardProps {
  name: string;
  location: string;
  image: string;
  bio: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  name,
  location,
  image,
  bio,
}) => (
  <div className="card bg-base-100 shadow-lg">
    <figure>
      <img src={image} alt={name} className="w-full h-48 object-cover" />
    </figure>
    <div className="card-body">
      <h3 className="card-title text-textPrimary font-primary">{name}</h3>
      <p className="text-textPrimary font-primary">{location}</p>
      <p className="text-textPrimary font-primary">{bio}</p>
    </div>
  </div>
);

export default PartnerCard;
