"use client";
import React, { useState } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  img: string;
}

const Messaging: React.FC = () => {
  // Define state with a type for selectedUser
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // Dummy Data for static version TODO: Replace with API call
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Alice Johnson",
      lastMessage: "See you tomorrow!",
      time: "2h ago",
      img: "/avatars/avatar-1.jpg",
    },
    {
      id: 2,
      name: "Bob Smith",
      lastMessage: "Let’s grab coffee!",
      time: "1d ago",
      img: "/avatars/avatar-2.jpg",
    },
    {
      id: 3,
      name: "Charlie Rose",
      lastMessage: "That sounds great!",
      time: "3d ago",
      img: "/avatars/avatar-3.jpg",
    },
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] p-4 space-x-6 bg-gray-50">
      {/* Left Section */}
      <div className="w-1/3 bg-lightGray rounded-lg shadow-lg p-4 space-y-4">
        <h2 className="text-2xl font-semibold text-textPrimary font-primary">
          Conversations
        </h2>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setSelectedUser(conversation.id)}
          >
            <img
              src={conversation.img}
              alt={conversation.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-textPrimary font-primary">
                {conversation.name}
              </h3>
              <p className="text-sm text-gray-500 font-primary">
                {conversation.lastMessage}
              </p>
            </div>
            <span className="text-xs text-gray-400 font-primary">
              {conversation.time}
            </span>
          </div>
        ))}
        <div className="divider"></div>
      </div>

      {/* Right Section: Messaging Area */}
      <div className="w-2/3 bg-lightGray rounded-lg shadow-lg p-6 flex flex-col justify-between">
        {/* Chat Header */}
        <h1 className="text-h2 font-primary font-semibold text-center text-textPrimary">
          {selectedUser
            ? "Chat with " +
              conversations.find((c) => c.id === selectedUser)?.name
            : "Start Chatting Now!"}
        </h1>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedUser ? (
            <div className="text-center text-gray-400 font-primary">
              Message history will appear here.
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 font-primary">
              <FaUserCircle className="text-6xl mb-4" />
              <p>Select a conversation to start chatting.</p>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex items-center border-t border-gray-300 pt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full py-2 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-primary font-primary text-textPrimary"
          />
          <button className="absolute right-6 text-primary">
            <FaPaperPlane size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
