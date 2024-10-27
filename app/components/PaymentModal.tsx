"use client";
import React from "react";
import { FaRocket } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

interface PaymentModalProps {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planName: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  showModal,
  onClose,
  onConfirm,
  planName,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center space-y-4">
        <h2 className="text-xl font-semibold font-primary text-gray-700">
          Upgrade to {planName}
        </h2>
        <p className="text-textSecondary font-primary">
          This feature requires a one-time payment. Please confirm to proceed.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-textPrimary font-primary border border-textPrimary rounded-full hover:bg-gray-300 transition"
          >
            <FaRegCircleXmark /> Not Now Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary border border-textPrimary font-primary text-white rounded-full hover:bg-primaryDark transition"
          >
            <FaRocket className="animate-bounce" />
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
