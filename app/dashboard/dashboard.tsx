"use client";
import React, { useEffect, useState } from "react";
import { FaBell, FaEnvelope, FaUser, FaUserAstronaut } from "react-icons/fa";
import NavigationButton from "../components/dashboard/NavigationButton";
import PartnerCard from "../components/dashboard/PartnerCard";
import Section from "../components/dashboard/Section";
import SEO from "../components/SEO";
import LoadingScreen from "../components/LoadingScreen";
import ActivityCard from "../components/dashboard/ActivityCard";
import { jwtDecode } from "jwt-decode";
import { Partner, UserProfile } from "@/types/types";
import { fetchCityFromCoordinates } from "../utils/geoCoding";
import {
  fetchUserProfile,
  fetchSuggestedPartners,
  fetchPendingPartners,
  fetchMatchedPartners,
} from "../services/userService";
import Link from "next/link";

const Dashboard: React.FC = () => {
  const [suggestedPartners, setSuggestedPartners] = useState<Partner[]>([]);
  const [pendingPartners, setPendingPartners] = useState<Partner[]>([]);
  const [matchedPartners, setMatchedPartners] = useState<Partner[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const decoded = jwtDecode<{ id: string; exp: number }>(token);
        if (decoded.exp < Math.floor(Date.now() / 1000)) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        const profile = await fetchUserProfile(decoded.id, token);
        setUserProfile(profile);
        setUsername(profile.fullName);

        const city = await fetchCityFromCoordinates(
          profile.location.coordinates[1],
          profile.location.coordinates[0]
        );
        setUserCity(city || "Unknown");

        setSuggestedPartners(await fetchSuggestedPartners(profile, token));
        setPendingPartners(await fetchPendingPartners(decoded.id, token));
        setMatchedPartners(await fetchMatchedPartners(decoded.id, token));

        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <SEO
        title="SyncMove Dashboard | Manage Your Fitness Connections"
        description="Access your personalized dashboard on SyncMove to view matched partners, connect with fitness enthusiasts, and track activities."
        keywords="SyncMove, dashboard, fitness connections, workout partners"
      />
      <div className="p-6 space-y-8 min-h-screen">
        <h1 className="text-textPrimary font-primary text-h2 font-semibold">
          Welcome back, {username}!
        </h1>
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
            label="Matching"
            Icon={FaUserAstronaut}
            href="/matching"
          />
        </div>
        <Section title="Top 3 Suggested Partners">
          {suggestedPartners.map((partner, index) => (
            <PartnerCard key={index} {...partner} />
          ))}
        </Section>
        <Link href="/matching" className="mt-4 text-center">
          <p className="text-base text-gray-600 font-primary">
            Looking for more options? Visit the{" "}
            <span className="text-primary font-semibold">Matching page</span> to
            find partners who best meet your preferences, <br /> including
            gender filters for a comfortable workout experience.
          </p>
        </Link>

        <ActivityCard />
        {matchedPartners.length > 0 && (
          <Section title="Matched Partners">
            {matchedPartners.map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </Section>
        )}
        {pendingPartners.length > 0 && (
          <Section title="Pending Partners">
            {pendingPartners.map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </Section>
        )}
      </div>
    </>
  );
};

export default Dashboard;
