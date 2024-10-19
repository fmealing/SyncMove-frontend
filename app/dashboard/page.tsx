// PLAN
// 1. Identify Dynamic Data Points
// - User Data
// - Suggested Partners
// - Connected Partners
// - Pending Partners
// 2. API Endpoints
// - User Data Endpoint (to fetch the user's profile by ID from token)
// - Suggested Partners Endpoint
// - Connected Partners Endpoint
// - Pending Partners Endpoint
// 3. Plan the Data Fetching
// - fetch user data to dynamically populate the username in the welcome message
// - fetch the suggested, connected, and pending partners and update the state to populate each section
// 4. Create State Variables
// - User data
// - Suggested Partners
// - Connected Partners
// - Pending Partners

"use client";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const connectedPartners = [
  {
    name: "Jane Doe",
    location: {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    },
    image: "/avatars/avatar-2.jpg",
    bio: "Creative designer with a passion for collaboration.",
  },
  {
    name: "John Smith",
    location: {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    },
    image: "/avatars/avatar-3.jpg",
    bio: "Frontend developer with a love for React.",
  },
  {
    name: "Alice Johnson",
    location: {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    },
    image: "/avatars/avatar-4.jpg",
    bio: "UX designer with a focus on user research.",
  },
];

const Dashboard = () => {
  const [suggestedPartners, setSuggestedPartners] = useState([]);
  const [pendingPartners, setPendingPartners] = useState([]);

  useEffect(() => {
    // Fetch suggested partners
    const fetchSuggestedPartners = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const decoded = jwtDecode(token);
      const id = decoded.id;

      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/suggested-partners",
          {
            location: [-73.856077, 40.848447], // Hardcoded location for now
            preferences: ["running", "endurance", 3], // Hardcoded preferences for now
            includeAI: false, // Hardcoded AI inclusion for now
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Properly include the token in headers
            },
          }
        );
        setSuggestedPartners(response.data);
      } catch (error) {
        console.error("Failed to fetch suggested partners: ", error);
      }
    };

    // Fetch pending partners
    const fetchPendingPartners = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token", token);

        if (!token) {
          console.log("No token found");
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        console.log("Fetching pending partners");
        const response = await axios.post(
          "http://localhost:5001/api/users/pending-partners",
          {
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Properly include the token in headers
            },
          }
        );
        console.log("Pending partners", response.data);
        setPendingPartners(response.data);
      } catch (error) {
        console.error("Failed to fetch pending partners: ", error);
      }
    };

    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);
      const id = decoded.id;

      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userProfile = response.data;
        setUsername(userProfile.fullName);
      } catch (error) {
        console.error("Failed to fetch user profile: ", error);
      }
    };

    fetchSuggestedPartners();
    fetchPendingPartners();
    fetchUserProfile();
  }, []);

  const [username, setUsername] = useState("");

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
