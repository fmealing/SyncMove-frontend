import React from "react";
import { FaDumbbell } from "react-icons/fa";

interface ActivityCardProps {
  name: string;
  location: string;
  description: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  name,
  location,
  description,
}) => (
  <div className="card bg-base-100 shadow-lg">
    <div className="card-body">
      <h3 className="card-title text-textPrimary font-primary flex items-center gap-2">
        <FaDumbbell fill="#007bff" className="w-8 h-8" />
        {name}
      </h3>
      <p className="text-textSecondary font-primary">{location}</p>
      <p className="text-textPrimary font-primary">{description}</p>
    </div>
  </div>
);

export default ActivityCard;
