import React from "react";
import { FaMessage, FaRegCircleXmark } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import Link from "next/link";

interface MatchButtonsProps {
  partnerId: string;
  matchId: string | null;
  onShowLimitModal: () => void;
  onDeleteMatch: () => void;
}

const MatchButtons: React.FC<MatchButtonsProps> = ({
  partnerId,
  matchId,
  onShowLimitModal,
  onDeleteMatch,
}) => (
  <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
    <button
      onClick={onShowLimitModal}
      className="flex justify-center items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primaryDark"
    >
      <FaMessage /> Connect Now
    </button>
    <Link
      href={`/schedule-workout/${partnerId}`}
      className="flex items-center justify-center gap-2 border border-secondary text-secondary font-semibold px-8 py-4 rounded-full"
    >
      <FaCalendar /> Schedule Workout
    </Link>
    {matchId && (
      <button
        onClick={onDeleteMatch}
        className="flex justify-center items-center gap-2 bg-red-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-700"
      >
        <FaRegCircleXmark /> Delete Match
      </button>
    )}
  </div>
);

export default MatchButtons;
