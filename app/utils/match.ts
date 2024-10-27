import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001/api/match";

export const deleteMatch = async (matchId: string) => {
  console.log("matchId", matchId);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.delete(`${BASE_URL}/${matchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Match deleted successfully");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      if (statusCode === 403) {
        toast.error("You are not authorized to delete this match");
      } else if (statusCode === 404) {
        toast.error("Match not found");
      } else {
        toast.error("Failed to delete match. Please try again.");
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

// Utility function to get matchId between logged-in user and partner
export const getMatchId = async (partnerId: string, token: any) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/match/find/${partnerId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.matchId; // Return matchId if found
  } catch (error) {
    console.error("Error checking for match:", error);
    return null; // Return null if no match is found or on error
  }
};
