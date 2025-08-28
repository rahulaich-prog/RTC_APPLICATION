# RTC_APPLICATION
<img width="1919" height="1012" alt="Screenshot 2025-08-28 225517" src="https://github.com/user-attachments/assets/1e9f2932-dd10-4b95-9c90-a5db2715a2e2" />



Real-Time Chat Application
A modern, real-time chat application built with WebSocket technology, featuring a beautiful gradient UI and seamless communication between users.






🚀 Project Overview
This is a full-stack chat application that enables real-time messaging between users in chat rooms. The project demonstrates modern web development practices with a focus on user experience, real-time communication, and beautiful UI design.





🏗️ Architecture
Frontend (React + TypeScript + Tailwind CSS)
Framework: React 18 with TypeScript for type safety
Styling: Tailwind CSS with custom gradients and animations
State Management: React hooks (useState, useEffect, useRef)
Real-time Communication: WebSocket API
Backend (Node.js + TypeScript + WebSocket)
Runtime: Node.js with TypeScript
WebSocket Server: ws library for real-time bidirectional communication
Architecture: Event-driven messaging system








✨ Features
Core Functionality
Real-time Messaging: Instant message delivery using WebSocket connections
Room-based Chat: Users can join specific chat rooms (currently "red" room)
Connection Status: Visual indicator showing connection state
Message Timestamps: Each message displays the time it was sent
Auto-scroll: Messages container automatically scrolls to newest messages






UI/UX Features
Beautiful Gradient Design: Purple to pink gradient background with glassmorphism effects
Message Bubbles: Distinct styling for own messages vs. received messages
Smooth Animations: Fade-in animations for new messages and hover effects
Responsive Design: Works seamlessly on different screen sizes
Backdrop Blur: Modern glass-effect styling throughout the interface
Interactive Elements: Hover effects and active states on buttons





Technical Features
TypeScript Support: Full type safety across frontend and backend
WebSocket Connection Management: Automatic connection handling and reconnection
Message Deduplication: Prevents duplicate messages from appearing
Memory Management: Proper cleanup of WebSocket connections and event listeners




 Technology Stack
Frontend Technologies
- React 18
- TypeScript
- Tailwind CSS
- Vite (Build tool)
- WebSocket API



Backend Technologies
- Node.js
- TypeScript
- ws (WebSocket library)
- Real-time event handling

 Key Components
Frontend Components
Main App Component (App.tsx)
Message State Management: Handles message array with timestamps
WebSocket Connection: Manages connection to backend server
User Interface: Renders chat interface with messages and input
Event Handling: Keyboard and click event management



Message Flow
User types message in input field
Message is added to local state (appears immediately as "own" message)
Message is sent to WebSocket server
Server broadcasts to other users in the same room
Other users receive and display the message



Backend Components
WebSocket Server (index.ts)
Connection Management: Tracks users and their room assignments
Message Routing: Routes messages to users in the same room
Room System: Users can join specific chat rooms
Connection Cleanup: Removes disconnected users from memory

Message Protocol
// Join room message
{
  type: "join",
  payload: {
    roomId: "red"
  }
}

// Chat message
{
  type: "chat", 
  payload: {
    message: "Hello everyone!"
  }
}

  
