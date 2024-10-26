"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import LoadingScreen from "../components/LoadingScreen";

const calculateAge = (dob: string) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const Matching = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedGender, setSelectedGender] = useState("any"); // Default to search for any gender

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<{ id: string }>(token);
      const userId = decoded.id;

      const response = await axios.get(
        `http://localhost:5001/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const profile = response.data;
      const age = calculateAge(profile.dob);
      setUserProfile({ ...profile, age });
      return { ...profile, age };
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  const fetchMatchScores = async (userProfile: any) => {
    try {
      const response = await axios.post("http://127.0.0.1:5001/match", {
        location: userProfile.location.coordinates,
        preferences: [
          userProfile.activityType,
          userProfile.fitnessGoals,
          userProfile.experienceLevel,
          userProfile.age,
        ],
        includeAI: false,
      });

      return response.data.matches;
    } catch (error) {
      console.error("Error calculating match score: ", error);
      return [];
    }
  };

  const fetchPartners = async (page: number, userProfile: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const partnersResponse = await axios.post(
        `http://localhost:5001/api/users/suggested-partners-pagination?page=${page}&limit=6`,
        {
          location: userProfile.location.coordinates,
          preferences: [
            userProfile.activityType,
            userProfile.fitnessGoals,
            userProfile.experienceLevel,
            userProfile.age,
          ],
          gender: selectedGender !== "any" ? selectedGender : undefined, // Include gender filter if specified
          includeAI: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const matchScores = await fetchMatchScores(userProfile);

      const partnersWithScores = partnersResponse.data.partners.map(
        (partner: any) => {
          const match = matchScores.find(
            (match: any) => match.user_id === partner._id
          );
          return {
            ...partner,
            matchScore: match
              ? `${(match.score * (90 / 72)).toFixed(1)}%`
              : "N/A",
          };
        }
      );

      setPartners(partnersWithScores);
      setTotalPages(partnersResponse.data.totalPages);
      setCurrentPage(partnersResponse.data.currentPage);
    } catch (error) {
      console.error("Failed to fetch partners", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const profile = await fetchUserProfile();
      if (profile) {
        fetchPartners(currentPage, profile);
      }
    };
    fetchData();
  }, [currentPage, selectedGender]); // Re-fetch partners if gender preference changes

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-textPrimary">
        Find Your Workout Partner
      </h2>

      {/* Gender Filter */}
      <div className="flex justify-between items-center mb-6">
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
      </div>

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner: any, index: number) => (
              <div key={index} className="card card-side bg-base-100 shadow-lg">
                <figure className="w-1/3">
                  <img
                    src={partner.profilePicture || "/default-avatar.png"}
                    alt={partner.fullName}
                    className="object-cover h-[200px] w-[200px] rounded-full m-4 border-2 border-textPrimary"
                  />
                </figure>
                <div className="card-body w-2/3">
                  <h3 className="card-title text-textPrimary font-primary">
                    {partner.fullName}
                  </h3>
                  <p className="text-sm text-textSecondary font-primary">
                    {partner.bio}
                  </p>
                  <p className="text-base text-textPrimary font-primary">
                    Activity: {partner.activityType}
                  </p>
                  <p className="text-base text-textPrimary font-primary">
                    Match Score: {partner.matchScore}
                  </p>
                  <Link
                    href={`/partnerProfile/${partner._id}?matchScore=${partner.matchScore}`}
                  >
                    <button className="flex gap-2 rounded-full bg-primary text-lightGray w-1/2 h-12 text-[20px] justify-center items-center hover:bg-primaryDark transition">
                      <FaMessage />
                      Connect
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 bg-gray-200 text-gray-600 rounded-l-lg hover:bg-gray-300 transition ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 transition ${
                  currentPage === page
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 bg-gray-200 text-gray-600 rounded-r-lg hover:bg-gray-300 transition ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Matching;
