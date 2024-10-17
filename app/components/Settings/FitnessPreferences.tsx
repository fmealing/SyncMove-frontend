import React from "react";

type Props = {
  fitnessGoals: string[];
  preferredActivities: string[];
  activityLevels: Record<string, number>;
  toggleGoal: (goal: string) => void;
  toggleActivity: (activity: string) => void;
  setExperienceLevel: (activity: string, level: number) => void;
  preferredTime: Record<string, string[]>;
  toggleTime: (activity: string, time: string) => void;
};

const FitnessPreferences: React.FC<Props> = ({
  fitnessGoals,
  preferredActivities,
  activityLevels,
  toggleGoal,
  toggleActivity,
  setExperienceLevel,
  preferredTime,
  toggleTime,
}) => {
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
          {["Lose Weight", "Gain Muscle", "General Health", "Other"].map(
            (goal) => (
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
            )
          )}
        </div>
      </div>

      {/* Preferred Activities */}
      <div>
        <p className="text-lg text-textPrimary font-semibold mb-2 font-primary">
          Select Your Preferred Activities
        </p>
        <div className="flex flex-wrap gap-2">
          {["Weightlifting", "Running", "Yoga", "Other"].map((activity) => (
            <div key={activity} className="flex flex-col items-start">
              {/* Activity Button */}
              <button
                className={`px-4 py-2 rounded-full border font-primary ${
                  preferredActivities.includes(activity)
                    ? "bg-primary text-white"
                    : "border-secondary border-2 text-textPrimary"
                }`}
                onClick={() => toggleActivity(activity)}
              >
                {activity}
              </button>

              {/* Experience Level Buttons for Selected Activity */}
              {preferredActivities.includes(activity) && (
                <div className="mt-2 flex space-x-2">
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
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preferred Times */}
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
    </section>
  );
};

export default FitnessPreferences;
