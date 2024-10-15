import React from "react";
import {
  FaBell,
  FaDumbbell,
  FaEnvelope,
  FaUser,
  FaUserAstronaut,
} from "react-icons/fa";
import NavigationButton from "../components/dashboard/NavigationButton";
import PartnerCard from "../components/dashboard/PartnerCard";
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

const connectedPartners = [
  {
    name: "Jane Doe",
    location: "London, UK",
    image: "/avatars/avatar-2.jpg",
    bio: "Creative designer with a passion for collaboration.",
  },
  {
    name: "John Smith",
    location: "New York, USA",
    image: "/avatars/avatar-3.jpg",
    bio: "Frontend developer with a love for React.",
  },
  {
    name: "Alice Johnson",
    location: "Paris, France",
    image: "/avatars/avatar-4.jpg",
    bio: "UX designer with a focus on user research.",
  },
];

const pendingPartners = [
  {
    name: "Jane Doe",
    location: "London, UK",
    image: "/avatars/avatar-5.jpg",
    bio: "Creative designer with a passion for collaboration.",
  },
  {
    name: "Florian Mealing",
    location: "New York, USA",
    image: "/avatars/avatar-developer.jpg",
    bio: "Frontend developer with a love for React.",
  },
  {
    name: "Alice Johnson",
    location: "Paris, France",
    image: "/avatars/avatar-4.jpg",
    bio: "UX designer with a focus on user research.",
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
        <NavigationButton
          label="matching"
          Icon={FaUserAstronaut}
          href="/matching"
        />
      </div>

      {/* Suggested Partners */}
      <Section title="Suggested Partners">
        {suggestedPartners.map((partner, index) => (
          <PartnerCard key={index} {...partner} />
        ))}
      </Section>

      {/* Matched Partners */}
      <Section title="Matched Partners">
        {connectedPartners.map((partner, index) => (
          <PartnerCard key={index} {...partner} />
        ))}
      </Section>

      {/* Pending Partners */}
      <Section title="Pending Partners">
        {pendingPartners.map((partner, index) => (
          <PartnerCard key={index} {...partner} />
        ))}
      </Section>
    </div>
  );
};

export default Dashboard;
