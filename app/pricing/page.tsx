// This will have to be worked on in the future. Right now, it is just a placeholder since this is just the MVP

"use client";
import React, { useState } from "react";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const PricingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const handleUpgradeClick = async (planType: string) => {
    try {
      // Call backend API to upgrade user’s plan immediately
      await axios.post(
        "http://localhost:5001/api/users/upgrade-plan",
        { planType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
          },
        }
      );

      // After upgrading, redirect to Stripe checkout
      if (planType === "growth") {
        window.location.href = "https://buy.stripe.com/5kAdUD92K2Gc2EUdQR";
      } else if (planType === "pro") {
        window.location.href = "https://buy.stripe.com/dR62bVdj094A4N2eUW";
      }
    } catch (error) {
      console.error("Failed to upgrade plan:", error);
      toast.error("Failed to upgrade plan. Please try again.");
    }
  };

  const freeFeatures = [
    "Connect with up to 10 people",
    "Message and connect with partners",
    "Flexible scheduling options",
    "Privacy and data security",
  ];

  const freeMissingFeatures = [
    "Priority support",
    "Exclusive content and resources",
    "Unlimited connections",
    "Early access to new features",
  ];

  const growthFeatures = [
    "Connect with up to 30 people",
    "Message and connect with partners",
    "Flexible scheduling options",
    "Privacy and data security",
    "Priority support",
    "Exclusive content and resources",
  ];

  const proFeatures = [
    "Unlimited connections",
    "Message and connect with partners",
    "Flexible scheduling options",
    "Privacy and data security",
    "Exclusive content and resources",
    "Premium support",
    "Early access to new features",
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-12 max-w-4xl">
        <h1 className="text-h1 font-primary font-semibold text-textPrimary">
          Flexible, One-Time Payments for Every Stage
        </h1>
        <p className="text-lg text-textSecondary font-primary">
          Choose the plan that fits your goals—no subscriptions, no surprises.
        </p>
      </section>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Starter Plan */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-6 border border-gray-200 transition-transform transform hover:scale-105">
          <div className="border-2 border-primary text-primary py-1 px-4 rounded-full text-sm uppercase font-bold text-['Roboto']">
            Free Plan
          </div>
          <h2 className="text-h2 font-primary font-semibold text-gray-700">
            Starter Plan
          </h2>
          <p className="text-xl font-bold text-gray-900">£0 - One-Time</p>
          <p className="text-gray-500">Best for new users</p>

          {/* Included Features */}
          <ul className="space-y-4 text-left">
            {freeFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-textPrimary font-primary"
              >
                <FaCheck className="text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Missing Features */}
          <ul className="space-y-4 text-left">
            {freeMissingFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-gray-400 font-primary"
              >
                <FaTimes className="text-red-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          <Link href="/signup">
            <button className="bg-primary text-white font-primary text-lg px-8 py-3 rounded-full hover:bg-primaryDark transition mt-6">
              Get Started for Free
            </button>
          </Link>
        </div>

        {/* Growth Plan - Most Popular */}
        <div className="relative bg-white rounded-lg shadow-lg p-8 text-center space-y-6 border border-actionAmber transform scale-105 hover:scale-110 transition-transform highlight-1">
          <div className="bg-actionAmber text-white py-1 px-4 rounded-full text-sm uppercase font-bold font-['Roboto']">
            Most Popular
          </div>
          <h2 className="text-h2 font-primary font-semibold text-primary">
            Growth Plan
          </h2>
          <p className="text-xl font-bold text-gray-900">
            <span className="line-through text-gray-400">£35</span> £25 -
            One-Time
          </p>
          <p className="text-gray-500">Perfect for active users</p>

          {/* Growth Features */}
          <ul className="space-y-4 text-left">
            {growthFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-textPrimary font-primary"
              >
                <FaCheck className="text-success mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleUpgradeClick("growth")}
            className="bg-actionAmber text-white font-primary text-lg px-8 py-3 rounded-full hover:bg-yellow-500 transition mt-6"
          >
            Unlock Full Potential
          </button>
          {/* Floating Badge */}
          <div className="absolute -top-5 -right-5 bg-actionRed text-white py-1 px-2 rounded-full text-xs font-bold font-['Roboto']">
            Best Value!
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-6 border border-primary transition-transform transform hover:scale-105 highlight-2">
          <div className="border-2 border-blue-500 text-blue-500 py-1 px-4 rounded-full text-sm uppercase font-bold">
            Pro Plan
          </div>
          <h2 className="text-h2 font-primary font-semibold text-textPrimary">
            Pro Plan
          </h2>
          <p className="text-xl font-bold text-gray-900">
            <span className="line-through text-gray-400">£70</span> £50 -
            One-Time
          </p>
          <p className="text-gray-500">Ideal for power users</p>

          {/* Pro Features */}
          <ul className="space-y-4 text-left">
            {proFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-textPrimary font-primary"
              >
                <FaCheck className="text-success mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleUpgradeClick("pro")}
            className="bg-primary text-white font-primary text-lg px-8 py-3 rounded-full hover:bg-primaryDark transition mt-6"
          >
            Go Pro
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <section className="text-center space-y-6 mt-16 max-w-2xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="bg-primary text-white p-4 rounded-full mb-4">
            <FaStar className="text-3xl" />
          </div>
          <h2 className="text-h2 font-primary font-semibold text-textPrimary">
            Why Choose SyncMove?
          </h2>
        </div>
        <p className="text-lg text-textSecondary font-primary">
          No hidden fees, no recurring charges. You pay once, enjoy forever.
        </p>
      </section>
    </div>
  );
};

export default PricingPage;
