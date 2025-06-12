import axios from "axios";
import { toast } from "react-hot-toast";

const upgradePlan = async (planType: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.post(
      "https://syncmove-backend.onrender.com/api/users/upgrade-plan",
      { planType },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Plan upgraded successfully!");
  } catch (error) {
    console.error("Failed to upgrade plan: ", error);
    toast.error("Failed to upgrade plan. Please try again.");
  }
};

export default upgradePlan;
