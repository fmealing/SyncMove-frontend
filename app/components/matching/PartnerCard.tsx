import React from "react";
import Link from "next/link";
import { FaMessage } from "react-icons/fa6";

const PartnerCard: React.FC<{ partner: any }> = ({ partner }) => (
  <div className="card card-side bg-base-100 shadow-lg">
    <figure className="w-1/3">
      <img
        src={partner.profilePicture || "/default-avatar.png"}
        alt={partner.fullName}
        className="object-cover h-[200px] w-[200px] rounded-full m-4 border-2 border-textPrimary"
      />
    </figure>
    <div className="card-body w-2/3">
      <h3 className="card-title text-textPrimary font-primary">
        {partner.fullName}
      </h3>
      <p className="text-sm text-textSecondary font-primary">{partner.bio}</p>
      <p className="text-base text-textPrimary font-primary">
        Activity: {partner.activityType}
      </p>
      <p className="text-base text-textPrimary font-primary">
        Match Score: {partner.matchScore}
      </p>
      <Link
        href={`/partnerProfile/${partner._id}?matchScore=${partner.matchScore}`}
      >
        <button className="flex gap-2 rounded-full bg-primary text-lightGray w-1/2 h-12 text-[20px] justify-center items-center hover:bg-primaryDark transition">
          <FaMessage /> Connect
        </button>
      </Link>
    </div>
  </div>
);

export default PartnerCard;
