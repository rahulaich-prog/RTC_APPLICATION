import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    //{ text: "Welcome to the chat room! 👋", isOwn: false, timestamp: new Date() },
    //{ text: "Start chatting with others!", isOwn: false, timestamp: new Date() }
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    
    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }));
    };

    ws.onmessage = (event) => {
      const newMessage = {
        text: event.data,
        isOwn: false,
        timestamp: new Date()
      };
      setMessages(m => [...m, newMessage]);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = () => {
      setIsConnected(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const message = inputRef.current?.value?.trim();
    if (!message || !wsRef.current) return;

    // Add own message to chat
    const newMessage = {
      text: message,
      isOwn: true,
      timestamp: new Date()
    };
    setMessages(m => [...m, newMessage]);

    // Send to server
    wsRef.current.send(JSON.stringify({
      type: "chat",
      payload: {
        message: message
      }
    }));

    // Clear input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col'>
      {/* Header */}
      <div className='bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-bold'>💬</span>
          </div>
          <div>
            <h1 className='text-white font-semibold text-lg'>Chat Room</h1>
            <p className='text-white/70 text-xs'>Room: Red</p>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className='text-white/80 text-sm'>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`message-bubble max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
              message.isOwn 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-white/90 backdrop-blur-sm text-gray-800'
            }`}>
              <p className='text-sm leading-relaxed'>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isOwn ? 'text-white/70' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='bg-white/10 backdrop-blur-md border-t border-white/20 p-4'>
        <div className='flex space-x-3 max-w-4xl mx-auto'>
          <input
            ref={inputRef}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-white/90 backdrop-blur-sm border-0 rounded-full px-6 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg transition-all duration-200"
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-lg ${
              isConnected
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 active:scale-95'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            <span className='flex items-center space-x-2'>
              <span>Send</span>
              <span>🚀</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App