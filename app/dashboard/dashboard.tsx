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
import LoadingScreen from "../components/LoadingScreen";
import ActivityCard from "../components/dashboard/ActivityCard";

// Define types
interface Partner {
  fullName: string;
  profilePicture: string;
  bio: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  matchScore: number;
  _id: string;
  gender: string;
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
  dob: string;
  gender: string;
}

// Calculate age from date of birth
const calculateAge = (dob: string) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const Dashboard = () => {
  const [suggestedPartners, setSuggestedPartners] = useState<Partner[]>([]);
  const [pendingPartners, setPendingPartners] = useState<Partner[]>([]);
  const [matchedPartners, setMatchedPartners] = useState<Partner[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        await fetchUserProfile(token);
      } catch (error) {
        console.error("Token validation failed:", error);
        window.location.href = "/login";
      }
    };

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

        const age = calculateAge(userProfile.dob);

        const city = await fetchCityFromCoordinates(
          userProfile.location.coordinates[1],
          userProfile.location.coordinates[0]
        );
        setUserCity(city || "Unknown");

        await fetchSuggestedPartners(userProfile, age);
        await fetchPendingPartners(id, token);
        await fetchMatchedPartners(id, token);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile: ", error);
        setLoading(false);
      }
    };

    const fetchSuggestedPartners = async (
      userProfile: UserProfile,
      age: number | null
    ) => {
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
              age,
            ],
            includeAI: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Sort the suggested partners by match score and select the top 3
        const sortedPartners = response.data
          .sort((a: Partner, b: Partner) => b.matchScore - a.matchScore)
          .slice(0, 3);

        setSuggestedPartners(sortedPartners);
      } catch (error) {
        console.error("Failed to fetch suggested partners: ", error);
      }
    };

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

    const fetchMatchedPartners = async (userId: string, token: string) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/matched-partners",
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

    checkAuthAndRedirect();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-6 space-y-8 min-h-screen">
      <h1 className="text-textPrimary font-primary text-h2 font-semibold">
        Welcome back, {username}!
      </h1>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 max-w-56 pb-10">
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
      {suggestedPartners.length > 0 ? (
        <div>
          <Section title="Top 3 Suggested Partners">
            {suggestedPartners.map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </Section>
          {/* Callout to explore more partners */}
          <div className="mt-4 text-center">
            <p className="text-base text-gray-600 font-primary">
              Looking for more options? Visit the{" "}
              <Link href="/matching">
                <div className="text-primary font-semibold hover:underline">
                  Matching page
                </div>
              </Link>{" "}
              to filter by gender and find partners who best meet your
              preferences!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center space-y-4 p-10">
          <img
            src="/svg/chatting-illustration.svg"
            alt="No Suggested Partners"
            className="w-1/3 md:w-1/4"
          />
          <p className="text-lg text-textPrimary font-primary">
            No Suggested Partners. Complete onboarding in Settings
          </p>
        </div>
      )}

      {/* Debugging button */}
      {/* <button
        onClick={() => console.log(userProfile)}
        className="text-lg font-primary px-4 py-2 text-white bg-primary rounded-full"
      >
        Debugging button. Delete later.
      </button> */}

      {/* This is where the activities go */}
      <ActivityCard />

      {/* Matched Partners */}
      {matchedPartners.length > 0 && (
        <Section title="Matched Partners">
          {matchedPartners.map((partner, index) => (
            <PartnerCard
              key={index}
              fullName={partner.fullName}
              profilePicture={partner.profilePicture}
              bio={partner.bio}
              location={partner.location}
              _id={partner._id}
              gender={partner.gender}
            />
          ))}
        </Section>
      )}

      {/* Pending Partners */}
      {pendingPartners.length > 0 && (
        <Section title="Pending Partners">
          {pendingPartners.map((partner, index) => (
            <PartnerCard
              key={index}
              fullName={partner.fullName}
              profilePicture={partner.profilePicture}
              bio={partner.bio}
              location={partner.location}
              _id={partner._id}
              gender={partner.gender}
            />
          ))}
        </Section>
      )}
    </div>
  );
};

export default Dashboard;
