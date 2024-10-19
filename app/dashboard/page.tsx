"use client";
import React, { useEffect, useState } from "react";
import { FaBell, FaEnvelope, FaUser, FaUserAstronaut } from "react-icons/fa";
import NavigationButton from "../components/dashboard/NavigationButton";
import PartnerCard from "../components/dashboard/PartnerCard";
import Section from "../components/dashboard/Section";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { fetchCityFromCoordinates } from "../utils/geoCoding";

// TODO: Replace this with dynamic loading
const connectedPartners = [
  {
    name: "Jane Doe",
    location: {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    },
    image:
      "https://www.shutterstock.com/image-vector/avatar-photo-default-user-icon-600nw-2345549599.jpg",
    bio: "Creative designer with a passion for collaboration.",
  },
  {
    name: "John Smith",
    location: {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    },
    image:
      "https://www.shutterstock.com/image-vector/avatar-photo-default-user-icon-600nw-2345549599.jpg",
    bio: "Frontend developer with a love for React.",
  },
  {
    name: "Alice Johnson",
    location: {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    },
    image:
      "https://www.shutterstock.com/image-vector/avatar-photo-default-user-icon-600nw-2345549599.jpg",
    bio: "UX designer with a focus on user research.",
  },
];

const Dashboard = () => {
  const [suggestedPartners, setSuggestedPartners] = useState([]);
  const [pendingPartners, setPendingPartners] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    // Fetch user profile first
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
        setUserProfile(userProfile);
        setUsername(userProfile.fullName);

        // Fetch the city from the coordinates

        const city = await fetchCityFromCoordinates(
          userProfile.location.coordinates[1],
          userProfile.location.coordinates[0]
        );
        setUserCity(city || "Unknown");

        // Fetch suggested partners after user data is available
        await fetchSuggestedPartners(userProfile);
        await fetchPendingPartners(id, token);
        setLoading(false); // Done loading once all data is fetched
      } catch (error) {
        console.error("Failed to fetch user profile: ", error);
        setLoading(false);
      }
    };

    // Fetch suggested partners
    const fetchSuggestedPartners = async (userProfile: any) => {
      // TODO: Replace any with actual type
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/suggested-partners",
          {
            location: userProfile.location.coordinates, // Use the user's actual location
            preferences: [
              userProfile.activityType,
              userProfile.fitnessGoals,
              userProfile.experienceLevel,
            ], // Use the user's preferences dynamically
            includeAI: false, // Decide if AI users should be included
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuggestedPartners(response.data);
      } catch (error) {
        console.error("Failed to fetch suggested partners: ", error);
      }
    };

    // Fetch pending partners
    const fetchPendingPartners = async (userId, token) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/pending-partners",
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPendingPartners(response.data);
      } catch (error) {
        console.error("Failed to fetch pending partners: ", error);
      }
    };

    fetchUserProfile(); // Start by fetching user profile
  }, []);

  if (loading) {
    return (
      <div className="text-h2 text-textPrimary justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-textPrimary font-primary text-h2 font-semibold">
        Welcome back, {username}!
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
        {suggestedPartners.map((partner, index) => {
          console.log(partner);
          return <PartnerCard key={index} {...partner} />;
        })}
      </Section>

      {/* Matched Partners */}
      <Section title="Matched Partners">
        {connectedPartners.map((partner, index) => (
          <PartnerCard
            key={index}
            fullName={partner.fullName}
            profilePicture={partner.profilePicture}
            bio={partner.bio}
          />
        ))}
      </Section>

      {/* Pending Partners */}
      <Section title="Pending Partners">
        {pendingPartners.map((partner, index) => (
          <PartnerCard
            key={index}
            fullName={partner.fullName}
            profilePicture={partner.profilePicture}
            bio={partner.bio}
          />
        ))}
      </Section>
    </div>
  );
};

export default Dashboard;
