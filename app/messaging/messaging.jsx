"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import SEO from "../components/SEO";

const Messaging = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [userId, setUserId] = useState(null); // Store user ID
  const [userFullName, setUserFullName] = useState(""); // Store user full name
  const [socket, setSocket] = useState(null); // Store the socket connection

  // Get the user ID from the JWT token and initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);

      // Fetch the user's fullName from the API or local storage
      axios
        .get(
          `https://syncmove-backend.onrender.com/api/users/${decodedToken.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => setUserFullName(response.data.fullName));

      // Initialize Socket.io client
      const newSocket = io("https://syncmove-backend.onrender.com", {
        auth: { token },
      });
      setSocket(newSocket);

      // Cleanup the socket connection on component unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  // Fetch Conversations
  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        "https://syncmove-backend.onrender.com/api/conversations",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setConversations(response.data);
      console.log("Conversations", response.data);
    } catch (error) {
      console.error("Failed to fetch conversations", error);
    }
  };

  // Fetch Messages for a Conversation
  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(
        `https://syncmove-backend.onrender.com/api/messages/${conversationId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessages(response.data);
      console.log("Messages", response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  // Trigger fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser);
    }
  }, [selectedUser]);

  // Fetch conversations when the component loads
  useEffect(() => {
    fetchConversations();
  }, []);

  // Handle Send Message
  const handleSendMessage = () => {
    if (!messageContent.trim() || !socket || !selectedUser || !userId) return;

    socket.emit("sendMessage", {
      matchId: selectedUser, // Assuming conversationId is the same as matchId
      receiverId: selectedUser, // Use actual receiverId logic
      content: messageContent,
    });

    // Add the message locally for instant feedback with user's fullName
    setMessages([
      ...messages,
      {
        sender: { _id: userId, fullName: userFullName }, // Attach fullName here
        content: messageContent,
        timestamp: new Date(),
      },
    ]);
    setMessageContent(""); // Clear input
  };

  return (
    <>
      <SEO
        title="SyncMove Messaging | Connect with Your Workout Partners"
        description="Chat with your workout partners on SyncMove to schedule workouts, discuss goals, and stay motivated together."
        keywords="SyncMove messaging, workout partner chat, fitness connection, schedule workout, workout communication"
      />
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
              messages.length ? (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message ${
                      msg.sender._id === userId ? "sent" : "received"
                    }`}
                  >
                    <p className="text-textPrimary text-lg font-semibold font-primary">
                      {msg.sender.fullName}
                    </p>
                    <p className="text-textPrimary font-primary">
                      {msg.content}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 font-primary">
                  No messages yet.
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 font-primary">
                <FaUserCircle className="text-6xl mb-4" />
                <p>Select a conversation to start chatting.</p>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex items-center border-t border-gray-300 pt-4 relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full py-2 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-primary font-primary text-textPrimary"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Send message on Enter key
            />
            <button
              className="absolute right-6 text-primary"
              onClick={handleSendMessage}
            >
              <FaPaperPlane size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messaging;
