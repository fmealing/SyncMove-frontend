import axios from "axios";

export const fetchNotifications = async (token: string) => {
  const response = await axios.get(
    "https://syncmove-backend.onrender.com/api/notifications",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.data;
};

export const deleteNotification = async (id: string, token: string) => {
  await axios.delete(
    `https://syncmove-backend.onrender.com/api/notifications/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const acceptMatch = async (matchId: string, token: string) => {
  await axios.put(
    `https://syncmove-backend.onrender.com/api/match/${matchId}/accept`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const declineMatch = async (matchId: string, token: string) => {
  await axios.put(
    `https://syncmove-backend.onrender.com/api/match/${matchId}/decline`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
