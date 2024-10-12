// TO IMPLEMENT
// h1 that says Welcome back, [username]
// 3 primary navigation buttons (Notifications, Messages, Profile Settings)
// Suggested Partners section
//  - heading that says "Suggested Partners" and a button that says "View All"
//  - 3 cards with partner information (name, location, image and bio)
// Your activities section
//  - heading that says "Your Activities" and a button that says "View All"
//  - 3 cards with activity information (name, location and description)
import React from "react";
import { FaDumbbell } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const suggestedPartners = [
  {
    name: "Jane Doe",
    location: "London, UK",
    image: "/avatars/avatar-1.jpg",
    bio: "Creative designer with a passion for collaboration.",
  },
  {
    name: "John Smith",
    location: "New York, USA",
    image: "/avatars/avatar-4.jpg",
    bio: "Frontend developer with a love for React.",
  },
  {
    name: "Alice Johnson",
    location: "Paris, France",
    image: "/avatars/avatar-3.jpg",
    bio: "UX designer with a focus on user research.",
  },
];

const activities = [
  {
    name: "Running",
    location: "London, UK",
    description: "Join me for a morning run in Hyde Park.",
  },
  {
    name: "Yoga",
    location: "New York, USA",
    description: "Relax and unwind with a yoga session in Central Park.",
  },
  {
    name: "Cycling",
    location: "Paris, France",
    description: "Explore the city on two wheels with a cycling tour.",
  },
];

const Dashboard = () => {
  const username = "Florian Mealing"; // TODO: Replace with actual username

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-textPrimary font-primary text-h2 font-semibold">
        Welcome back, {username}
      </h1>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 max-w-56">
        <button className="font-primary flex gap-2 rounded-full bg-primary text-lightGray px-4 py-2 text-[18px] items-center justify-center">
          <FaGear />
          Notifications
        </button>
        <button className="font-primary flex gap-2 rounded-full bg-primary text-lightGray px-4 py-2 text-[18px] items-center justify-center">
          <FaGear />
          Messages
        </button>
        <button className="font-primary flex gap-2 rounded-full bg-primary text-lightGray px-4 py-2 text-[18px] items-center justify-center">
          <FaGear />
          Profile Settings
        </button>
      </div>

      {/* Suggested Partners Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-textPrimary font-primary">
            Suggested Partners
          </h2>
          <button className="btn btn-link font-primary">View All</button>
        </div>
        <div className="grid grid-cold-1 md:grid-cols-3 gap-4">
          {suggestedPartners.map((partner, index) => (
            <div key={index} className="card bg-base-100 shadow-lg">
              <figure>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-48 object-cover" // TODO: make this one work
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-textPrimary font-primary">
                  {partner.name}
                </h3>
                <p className="text-textPrimary font-primary">
                  {partner.location}
                </p>
                <p className="text-textPrimary font-primary">{partner.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Your Activities Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-textPrimary font-primary">
            Your Activities
          </h2>
          <button className="btn btn-link font-primary">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-textPrimary font-primary">
                  <FaDumbbell fill="#007bff" className="w-8 h-8" />
                  {activity.name}
                </h3>
                <p className="text-textSecondary font-primary">
                  {activity.location}
                </p>
                <p className="text-textPrimary font-primary">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
