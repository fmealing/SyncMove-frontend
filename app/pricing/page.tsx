// Make the background a bit better. A bit plain right now.

"use client";
import Link from "next/link";
import React from "react";
import { FaCheck, FaStar } from "react-icons/fa";

const PricingPage: React.FC = () => {
  const freeFeatures = [
    "Find local workout partners",
    "Message and connect with partners",
    "Flexible scheduling options",
    "Access on all devices",
    "Privacy and data security",
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-8 bg-lightGray">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-10 max-w-2xl">
        <h1 className="text-h1 font-primary font-semibold text-textPrimary">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-textSecondary font-primary">
          SyncMove is completely free to use, giving you access to all features
          with no hidden costs.
        </p>
      </section>

      {/* Pricing Table */}
      <section className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 text-center space-y-6">
        <h2 className="text-h2 font-primary font-semibold text-primary">
          Free Plan
        </h2>
        <p className="text-lg text-textSecondary font-primary">
          Access all features without any cost. SyncMove is built to help you
          find workout partners easily.
        </p>

        <ul className="text-left space-y-4">
          {freeFeatures.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-textPrimary font-primary"
            >
              <FaCheck className="text-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Link href="/signup">
          <button className="bg-primary text-white font-primary text-lg px-8 py-3 rounded-full hover:bg-primaryDark transition mt-6">
            Get Started for Free
          </button>
        </Link>
      </section>

      {/* Future Premium Section */}
      <section className="text-center space-y-6 mt-[80px] max-w-2xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="bg-primary text-white p-4 rounded-full mb-4">
            <FaStar className="text-3xl" />
          </div>
          <h2 className="text-h2 font-primary font-semibold text-textPrimary">
            Interested in More?
          </h2>
        </div>
        <p className="text-lg text-textSecondary font-primary">
          We&apos;re exploring premium features to enhance your experience. Stay
          tuned for updates on exciting new capabilities!
        </p>
      </section>
    </div>
  );
};

export default PricingPage;
