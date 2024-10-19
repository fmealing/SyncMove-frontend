"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMessage } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";

const MatchingPage = () => {
  // State to hold suggested partners and pagination details
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Function to fetch user profile based on token
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<{ id: string }>(token);
    const userId = decoded.id;

    try {
      const response = await axios.get(
        `http://localhost:5001/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserProfile(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  // Fetch suggested partners based on the user profile and current page
  const fetchPartners = async (page: number, userProfile: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5001/api/users/suggested-partners-pagination?page=${page}&limit=6`,
        {
          location: userProfile.location.coordinates, // Use user's location
          preferences: [
            userProfile.activityType,
            userProfile.fitnessGoals,
            userProfile.experienceLevel,
          ],
          includeAI: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPartners(response.data.partners);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Failed to fetch partners", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile and suggested partners when component mounts or page changes
  useEffect(() => {
    const fetchData = async () => {
      const profile = await fetchUserProfile();
      if (profile) {
        fetchPartners(currentPage, profile);
      }
    };
    fetchData();
  }, [currentPage]);

  // Handle pagination click
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-4 text-textPrimary">
        Find Your Workout Partner
      </h2>

      {loading ? (
        <p>Loading...</p> // Display a loading indicator
      ) : (
        <>
          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner: any, index: number) => (
              <div key={index} className="card card-side bg-base-100 shadow-lg">
                <figure className="w-1/3">
                  <img
                    src={partner.profilePicture || "/default-avatar.png"} // Default image if none provided
                    alt={partner.fullName}
                    className="object-cover h-[200px] w-[200px] rounded-full m-4 border-2 border-textPrimary"
                  />
                </figure>
                <div className="card-body w-2/3">
                  <h3 className="card-title text-textPrimary">
                    {partner.fullName}
                  </h3>
                  <p className="text-sm text-textSecondary">{partner.bio}</p>
                  <button className="flex gap-2 rounded-full bg-primary text-lightGray w-1/2 h-12 text-[20px] justify-center items-center hover:bg-primaryDark transition">
                    <FaMessage />
                    Connect
                  </button>
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

export default MatchingPage;
