// Define a type for a conversation
export interface Conversation {
  id: string; // Assuming you're using MongoDB ObjectId or string-based ID
  name: string;
  lastMessage: string;
  time: string;
  img: string;
}

// Define a type for messages
export interface Message {
  sender: string; // The ID of the sender
  receiver: string; // The ID of the receiver
  content: string; // Message content
  timestamp: Date; // Message timestamp
}

// Define a type for users
export interface User {
  id: string;
  fullName: string;
  profilePicture: string;
}

// Define a type for socket events
export interface SocketEvents {
  sendMessage: (data: {
    matchId: string;
    receiverId: string;
    content: string;
  }) => void;
  receiveMessage: (message: Message) => void;
}
