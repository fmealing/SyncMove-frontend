import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const FitnessPreferences: React.FC = () => {
  const [fitnessGoals, setFitnessGoals] = useState<string[]>([]);
  const [preferredActivities, setPreferredActivities] = useState<string[]>([]);
  const [activityLevels, setActivityLevels] = useState<Record<string, number>>({
    Weightlifting: 1,
    Running: 1,
    Yoga: 1,
    generalFitness: 1,
  });
  const [preferredTime, setPreferredTime] = useState<Record<string, string[]>>({
    Weightlifting: [],
    Running: [],
    Yoga: [],
    generalFitness: [],
  });

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user is not authenticated");
          return;
        }

        const decodedToken: { id: string } = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;

        setFitnessGoals(data.fitnessGoals ? [data.fitnessGoals] : []);
        setPreferredActivities([data.activityType]);
        setActivityLevels({ [data.activityType]: data.experienceLevel });
        setPreferredTime({ [data.activityType]: data.availability.timeOfDay });
      } catch (error) {
        console.error("Failed to fetch user preferences:", error);
        toast.error("Failed to fetch user preferences");
      }
    };

    fetchUserPreferences();
  }, []);

  const savePreferences = async () => {
    try {
      const token = localStorage.getItem("token");

      // Check if token is present
      if (!token) {
        console.error("No token found, user is not authenticated");
        return;
      }

      const decodedToken: { id: string } = jwtDecode(token);
      const userId = decodedToken.id;

      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          activityType: preferredActivities[0],
          experienceLevel: activityLevels[preferredActivities[0]] || 1,
          fitnessGoals: fitnessGoals[0] || "",
          availability: {
            timeOfDay: preferredTime[preferredActivities[0]] || [],
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Preferences saved successfully");
      toast.success("Preferences saved successfully");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      toast.error("Failed to save preferences");
    }
  };

  const toggleGoal = (goal: string) => {
    setFitnessGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [goal]
    );
  };

  const toggleActivity = (activity: string) => {
    setPreferredActivities((prev) =>
      prev.includes(activity) ? [] : [activity]
    );
  };

  const setExperienceLevel = (activity: string, level: number) => {
    setActivityLevels((prev) => ({
      ...prev,
      [activity]: level,
    }));
  };

  const toggleTime = (activity: string, time: string) => {
    setPreferredTime((prev) => {
      // Get the current times for the activity or set it as an empty array if undefined
      const currentTimes = prev[activity] || [];

      // Check if the time already exists
      const timeExists = currentTimes.includes(time);

      // Update the times based on whether the time is already present
      const updatedTimes = timeExists
        ? currentTimes.filter((t) => t !== time) // Remove the time if it exists
        : [...currentTimes, time]; // Add the time if it doesn't exist

      // Return the updated state
      return {
        ...prev,
        [activity]: updatedTimes,
      };
    });
  };

  return (
    <section id="preferences" className="space-y-4">
      <h2 className="text-h2 font-semibold text-textPrimary font-primary">
        Fitness Preferences
      </h2>
      <div>
        <p className="text-lg text-textPrimary font-semibold mb-2 font-primary">
          Select Your Fitness Goals
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Lose Weight",
            "Gain Muscle",
            "General Health",
            "General Fitness",
          ].map((goal) => (
            <button
              key={goal}
              className={`px-4 py-2 rounded-full border font-primary ${
                fitnessGoals.includes(goal)
                  ? "bg-primary text-white"
                  : "border-secondary border-2 text-textPrimary"
              }`}
              onClick={() => toggleGoal(goal)}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-lg text-textPrimary font-semibold mb-2 font-primary">
          Select Your Preferred Activities
        </p>
        <div className="flex flex-wrap gap-2">
          {["Weightlifting", "Running", "Yoga", "Other"].map((activity) => (
            <button
              key={activity}
              className={`px-4 py-2 rounded-full border font-primary ${
                preferredActivities.includes(activity)
                  ? "bg-primary text-white"
                  : "border-secondary border-2 text-textPrimary"
              }`}
              onClick={() => toggleActivity(activity)}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>
      {preferredActivities.map((activity) => (
        <div key={activity} className="mt-2 flex space-x-2">
          <p className="text-sm text-textSecondary font-primary mr-2">
            Experience Level:
          </p>
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setExperienceLevel(activity, level)}
              className={`w-8 h-8 rounded-full ${
                activityLevels[activity] === level
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      ))}
      {preferredActivities.map((activity) => (
        <div key={activity} className="space-y-2 mt-4">
          <p className="text-lg text-textSecondary font-medium mb-2 font-primary">
            Preferred Times for {activity}
          </p>
          <div className="flex flex-wrap gap-2">
            {["Morning", "Afternoon", "Evening"].map((time) => (
              <button
                key={time}
                className={`px-4 py-2 rounded-full border ${
                  preferredTime[activity]?.includes(time)
                    ? "bg-primary text-white"
                    : "border-secondary border-2 text-textPrimary"
                }`}
                onClick={() => toggleTime(activity, time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={savePreferences}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark transition"
      >
        Save Preferences
      </button>
    </section>
  );
};

export default FitnessPreferences;
