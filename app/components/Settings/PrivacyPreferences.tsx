import React from "react";

type Props = {
  visibility: string;
  shareLocation: boolean;
  shareActivity: boolean;
  setVisibility: (visibility: string) => void;
  setShareLocation: (checked: boolean) => void;
  setShareActivity: (checked: boolean) => void;
};

const PrivacyPreferences: React.FC<Props> = ({
  visibility,
  shareLocation,
  shareActivity,
  setVisibility,
  setShareLocation,
  setShareActivity,
}) => {
  return (
    <section id="privacy" className="space-y-4">
      <h2 className="text-h2 font-semibold text-textPrimary font-primary">
        Privacy Preferences
      </h2>

      {/* Visibility */}
      <div className="space-y-2">
        <label className="text-lg text-textPrimary font-primary font-semibold">
          Visibility
        </label>
        <select
          className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-primary text-textPrimary font-primary"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="Public">Public</option>
          <option value="Friends">Friends</option>
          <option value="Private">Private</option>
        </select>
      </div>

      {/* Share Location and Share Activity Checkboxes */}
      <div className="space-y-2">
        {[
          {
            label: "Share Location",
            checked: shareLocation,
            onChange: setShareLocation,
          },
          {
            label: "Share Activity",
            checked: shareActivity,
            onChange: setShareActivity,
          },
        ].map(({ label, checked, onChange }) => (
          <label
            key={label}
            className="flex items-center gap-2 cursor-pointer text-textPrimary"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary rounded-full"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
            />
            {label}
          </label>
        ))}
      </div>
    </section>
  );
};

export default PrivacyPreferences;
