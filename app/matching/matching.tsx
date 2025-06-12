"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import LoadingScreen from "../components/LoadingScreen";
import PartnerCard from "../components/matching/PartnerCard";
import Pagination from "../components/matching/Pagination";
import { calculateAge } from "../utils/helpers";
import SEO from "../components/SEO";

const Matching: React.FC = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedGender, setSelectedGender] = useState("any");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const profile = await fetchUserProfile();
      if (profile) fetchPartners(currentPage, profile);
    };
    fetchData();
  }, [currentPage, selectedGender]);

  // Step 1: Update fetchUserProfile to include connections array
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode<{ id: string }>(token);
      const response = await axios.get(
        `https://syncmove-backend.onrender.com/api/users/${decoded.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const profile = response.data;
      profile.age = calculateAge(profile.dob);
      setUserProfile(profile);
      return profile;
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  // Step 2: Filter out partners who are already connected before setting state
  const fetchPartners = async (page: number, profile: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://syncmove-backend.onrender.com/api/users/suggested-partners-pagination?page=${page}&limit=6`,
        {
          location: profile.location.coordinates,
          preferences: [
            profile.activityType,
            profile.fitnessGoals,
            profile.experienceLevel,
            profile.age,
          ],
          gender: selectedGender !== "any" ? selectedGender : undefined,
          includeAI: false,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Filter out partners whose IDs are in the user's connections array
      const filteredPartners = response.data.partners.filter(
        (partner: any) => !profile.connections.includes(partner._id)
      );

      console.log("Fetched partners:", filteredPartners);
      setPartners(filteredPartners);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch partners", error);
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Find Your Workout Partner | SyncMove Matching"
        description="Connect with workout partners near you through SyncMove's Matching page. Filter by gender, interests, and availability to find the ideal fitness buddy."
        keywords="workout partner, fitness buddy, SyncMove, matching, fitness partner, gender filter"
      />
      <div className="p-6 space-y-8 min-h-screen">
        <h2 className="text-3xl font-bold mb-4 text-textPrimary">
          Find Your Workout Partner
        </h2>
        <label className="text-lg font-semibold text-textPrimary">
          Filter by Gender:
        </label>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="border border-textSecondary rounded-lg px-4 py-2 text-textPrimary"
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
        </select>

        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Matching;
