import React from "react";
import { FaMessage } from "react-icons/fa6";

// Dummy Data for static version TODO: Replace with API call
const workoutPartners = [
  {
    name: "Anna Lee",
    age: 28,
    distance: "5 miles away",
    image: "/avatars/avatar-1.jpg",
    description: "Yoga enthusiast looking for a like-minded workout partner.",
  },
  {
    name: "Mike Johnson",
    age: 32,
    distance: "10 miles away",
    image: "/avatars/avatar-2.jpg",
    description:
      "Weightlifting coach interested in strength training partners.",
  },
  {
    name: "Sarah Brown",
    age: 29,
    distance: "2 miles away",
    image: "/avatars/avatar-3.jpg",
    description: "Runner and cyclist seeking a partner for morning runs.",
  },
  {
    name: "Tom Duke",
    age: 29,
    distance: "2 miles away",
    image: "/avatars/avatar-4.jpg",
    description: "Fitness instructor looking for a gym buddy.",
  },
];

const MatchingPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-4 text-textPrimary">
        Find Your Workout Partner
      </h2>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <label className="mr-2 text-textPrimary">Filter by:</label>
          <select className="select select-bordered w-40 text-textPrimary">
            <option>Default</option>
            <option>Distance</option>
            <option>Activity Type</option>
            <option>Availability</option>
          </select>
        </div>
        <div>
          <label className="mr-2 text-textPrimary">Sort by:</label>
          <select className="select select-bordered w-40 text-textPrimary">
            <option>Nearest</option>
            <option>Most Active</option>
            <option>Recently Joined</option>
          </select>
        </div>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workoutPartners.map((partner, index) => (
          <div key={index} className="card card-side bg-base-100 shadow-lg">
            <figure className="w-1/3">
              <img
                src={partner.image}
                alt={partner.name}
                className="object-cover h-[200px] w-[200px] rounded-full m-4 border-2 border-textPrimary"
              />
            </figure>
            <div className="card-body w-2/3">
              <h3 className="card-title text-textPrimary">{partner.name}</h3>
              <p className="text-sm text-textSecondary">
                {partner.age} years old • {partner.distance}
              </p>
              <p className="py-2 text-textPrimary">{partner.description}</p>
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
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l-lg hover:bg-gray-300 active:bg-gray-400 transition">
          «
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition">
          1
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400 transition">
          2
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400 transition">
          3
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r-lg hover:bg-gray-300 active:bg-gray-400 transition">
          »
        </button>
      </div>
    </div>
  );
};

export default MatchingPage;
