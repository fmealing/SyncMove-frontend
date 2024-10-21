"use client";
import React, { useEffect, useState } from "react";
import { FaBell, FaEnvelope, FaUser, FaUserAstronaut } from "react-icons/fa";
import NavigationButton from "../components/dashboard/NavigationButton";
import PartnerCard from "../components/dashboard/PartnerCard";
import Section from "../components/dashboard/Section";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { fetchCityFromCoordinates } from "../utils/geoCoding";
import Link from "next/link";

// Define types
interface Partner {
  fullName: string;
  profilePicture: string;
  bio: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
}

interface UserProfile {
  fullName: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  activityType: string;
  fitnessGoals: string;
  experienceLevel: number;
}

const Dashboard = () => {
  const [suggestedPartners, setSuggestedPartners] = useState<Partner[]>([]);
  const [pendingPartners, setPendingPartners] = useState<Partner[]>([]);
  const [matchedPartners, setMatchedPartners] = useState<Partner[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    // Function to check token and redirect if invalid
    const checkAuthAndRedirect = async () => {
      const token = localStorage.getItem("token");

      // If no token found, redirect to the login page
      if (!token) {
        window.location.href = "/login"; // Redirect to the login page
        return;
      }

      try {
        // Decode the token to check expiration
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        // If token is expired, redirect to the login page
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token"); // Clear invalid token
          window.location.href = "/login"; // Redirect to the login page
          return;
        }

        // Fetch user profile and proceed
        await fetchUserProfile(token);
      } catch (error) {
        console.error("Token validation failed:", error);
        window.location.href = "/login"; // Redirect to the login page
      }
    };

    // Fetch user profile
    const fetchUserProfile = async (token: string) => {
      const decoded = jwtDecode<{ id: string }>(token);
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
        const userProfile: UserProfile = response.data;
        setUserProfile(userProfile);
        setUsername(userProfile.fullName);

        // Fetch the city from the coordinates
        const city = await fetchCityFromCoordinates(
          userProfile.location.coordinates[1],
          userProfile.location.coordinates[0]
        );
        setUserCity(city || "Unknown");

        // Fetch suggested, pending, and matched partners after user data is available
        await fetchSuggestedPartners(userProfile);
        await fetchPendingPartners(id, token);
        await fetchMatchedPartners(id, token);
        setLoading(false); // Done loading once all data is fetched
      } catch (error) {
        console.error("Failed to fetch user profile: ", error);
        setLoading(false);
      }
    };

    // Fetch suggested partners
    const fetchSuggestedPartners = async (userProfile: UserProfile) => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/suggested-partners",
          {
            location: userProfile.location.coordinates,
            preferences: [
              userProfile.activityType,
              userProfile.fitnessGoals,
              userProfile.experienceLevel,
            ],
            includeAI: false,
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
    const fetchPendingPartners = async (userId: string, token: string) => {
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

    // Fetch matched partners
    const fetchMatchedPartners = async (userId: string, token: string) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/matched-partners", // Assuming this is a valid endpoint
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMatchedPartners(response.data);
      } catch (error) {
        console.error("Failed to fetch matched partners: ", error);
      }
    };

    // Check authentication and fetch data
    checkAuthAndRedirect();
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
      <Link href="/matching">
        <Section title="Suggested Partners">
          {suggestedPartners.map((partner, index) => (
            <PartnerCard key={index} {...partner} />
          ))}
        </Section>
      </Link>

      {/* Matched Partners */}
      <Section title="Matched Partners">
        {matchedPartners.map((partner, index) => (
          <PartnerCard
            key={index}
            fullName={partner.fullName}
            profilePicture={partner.profilePicture}
            bio={partner.bio}
            location={partner.location}
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
            location={partner.location}
          />
        ))}
      </Section>
    </div>
  );
};

export default Dashboard;
