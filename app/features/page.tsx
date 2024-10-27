"use client";
import Link from "next/link";
import React from "react";
import {
  FaSearch,
  FaDumbbell,
  FaUserFriends,
  FaClock,
  FaMobileAlt,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import SEO from "../components/SEO";

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <FaSearch />,
      title: "Find Local Partners",
      description:
        "Discover workout partners near you based on location, interests, and activity preferences.",
    },
    {
      icon: <FaDumbbell />,
      title: "Activity Variety",
      description:
        "Whether you’re into weightlifting, running, yoga, or more, find partners for any workout style.",
    },
    {
      icon: <FaUserFriends />,
      title: "Connect with Ease",
      description:
        "Message and schedule workouts with partners directly through the app.",
    },
    {
      icon: <FaClock />,
      title: "Flexible Scheduling",
      description:
        "Set your availability and let SyncMove match you with partners who share the same workout times.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Friendly",
      description:
        "Access SyncMove on the go with our fully responsive design, optimized for mobile devices.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Privacy & Security",
      description:
        "Your data is protected with top-notch security measures to ensure privacy and confidentiality.",
    },
  ];

  return (
    <>
      <SEO
        title="Features of SyncMove | Find Your Workout Partner"
        description="Explore the top features of SyncMove, designed to help you find the perfect workout partner and achieve your fitness goals."
        keywords="SyncMove, workout partner, fitness, gym buddy, workout app, fitness partner, connect with fitness enthusiasts"
      />
      <div className="flex flex-col items-center w-full min-h-screen p-8 bg-lightGray">
        {/* Hero Section */}
        <section className="text-center space-y-4 mb-10 max-w-2xl">
          <h1 className="text-h1 font-primary font-semibold text-textPrimary">
            Discover Workout Partners with SyncMove
          </h1>
          <p className="text-lg text-textSecondary font-primary">
            SyncMove helps you find the perfect gym buddy. Connect, train, and
            achieve your fitness goals together!
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center space-y-4"
            >
              <div className="text-primary text-5xl">{feature.icon}</div>
              <h2 className="text-h3 font-primary font-semibold text-textPrimary">
                {feature.title}
              </h2>
              <p className="text-textSecondary font-primary">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* How It Works Section */}
        <section className="w-full max-w-4xl text-center space-y-4 mt-16">
          <h2 className="text-h2 font-primary font-semibold text-textPrimary">
            How It Works
          </h2>
          <p className="text-lg text-textSecondary font-primary">
            SyncMove makes it easy to connect with fitness enthusiasts in three
            simple steps:
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8 mt-8">
            {["Create a Profile", "Find Partners", "Schedule Workouts"].map(
              (step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 space-y-4 w-full md:w-1/3"
                >
                  <h3 className="text-h3 font-primary font-semibold text-primary">
                    Step {index + 1}
                  </h3>
                  <p className="text-textPrimary font-primary">{step}</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full text-center mt-16 flex items-center justify-center">
          <Link href="/signup">
            <button className="bg-primary text-white font-primary text-lg px-8 py-3 rounded-full hover:bg-primaryDark transition flex justify-center items-center">
              <FaCheckCircle className="mr-2" />
              Get Started with SyncMove
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default FeaturesPage;
