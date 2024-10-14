import React from "react";
import { FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import NavigationButton from "../components/dashboard/NavigationButton";
import PartnerCard from "../components/dashboard/PartnerCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import Section from "../components/dashboard/Section";

const suggestedPartners = [
  {
    name: "Jane Doe",
    location: "London, UK",
    image: "/avatars/avatar-1.jpg",
    bio: "Creative designer with a passion for collaboration.",
  },
  {
    name: "John Smith",
    location: "New York, USA",
    image: "/avatars/avatar-4.jpg",
    bio: "Frontend developer with a love for React.",
  },
  {
    name: "Alice Johnson",
    location: "Paris, France",
    image: "/avatars/avatar-3.jpg",
    bio: "UX designer with a focus on user research.",
  },
];

const activities = [
  {
    name: "Running",
    location: "London, UK",
    description: "Join me for a morning run in Hyde Park.",
  },
  {
    name: "Yoga",
    location: "New York, USA",
    description: "Relax and unwind with a yoga session in Central Park.",
  },
  {
    name: "Cycling",
    location: "Paris, France",
    description: "Explore the city on two wheels with a cycling tour.",
  },
];

const Dashboard = () => {
  const username = "Florian Mealing"; // TODO: Replace with actual username

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-textPrimary font-primary text-h2 font-semibold">
        Welcome back, {username}
      </h1>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 max-w-56">
        <NavigationButton
          label="Notifications"
          Icon={FaBell}
          href="/notifications"
        />
        <NavigationButton
          label="Messages"
          Icon={FaEnvelope}
          href="/messaging"
        />
        <NavigationButton
          label="Profile Settings"
          Icon={FaUser}
          href="/settings"
        />
      </div>

      <Section title="Suggested Partners">
        {suggestedPartners.map((partner, index) => (
          <PartnerCard key={index} {...partner} />
        ))}
      </Section>

      <Section title="Your Activities">
        {activities.map((activity, index) => (
          <ActivityCard key={index} {...activity} />
        ))}
      </Section>
    </div>
  );
};

export default Dashboard;
