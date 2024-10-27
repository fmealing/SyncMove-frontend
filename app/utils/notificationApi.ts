import axios from "axios";

export const fetchNotifications = async (token: string) => {
  const response = await axios.get("http://localhost:5001/api/notifications", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export const deleteNotification = async (id: string, token: string) => {
  await axios.delete(`http://localhost:5001/api/notifications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const acceptMatch = async (matchId: string, token: string) => {
  await axios.put(
    `http://localhost:5001/api/match/${matchId}/accept`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const declineMatch = async (matchId: string, token: string) => {
  await axios.put(
    `http://localhost:5001/api/match/${matchId}/decline`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
