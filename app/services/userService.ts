// This has to be changed as well

import axios from "axios";
import { UserProfile, Partner } from "@/types/types";
import { calculateAge } from "../utils/helpers";

const API_URL = "http://localhost:5001/api/users";

export const fetchUserProfile = async (
  id: string,
  token: string
): Promise<UserProfile> => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchSuggestedPartners = async (
  userProfile: UserProfile,
  token: string
) => {
  const age = calculateAge(userProfile.dob);
  const response = await axios.post(
    `${API_URL}/suggested-partners`,
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
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const suggestedPartners = response.data
    .filter(
      (partner: Partner) => !userProfile.connections.includes(partner._id)
    )
    .sort((a: Partner, b: Partner) => b.matchScore - a.matchScore)
    .slice(0, 3);

  return suggestedPartners;
};

export const fetchPendingPartners = async (userId: string, token: string) => {
  const response = await axios.post(
    `${API_URL}/pending-partners`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const fetchMatchedPartners = async (userId: string, token: string) => {
  const response = await axios.post(
    `${API_URL}/matched-partners`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
