import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { sanitizeInput } from '../utils/sanitizer';

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false); // Track sending state
  const { addMessage, selectedUser } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() && !isSending) {
      setIsSending(true); // Disable the button temporarily
      try {
        const sanitizedMessage = sanitizeInput(message);
        await addMessage(sanitizedMessage, selectedUser?.id); // Wait for backend confirmation
        setMessage(''); // Clear the input only on success
      } catch (error) {
        console.error('Failed to send message:', error);
        // Optional: Display an error message to the user
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-[#2c2c2e]/90 glass-effect border-t border-[#3c3c3e]"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${selectedUser ? selectedUser.username : 'everyone'}...`}
          className="flex-1 px-4 py-3 bg-[#3c3c3e] rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200"
          maxLength={500}
          disabled={isSending} // Prevent typing while sending
        />
        <button
          type="submit"
          className={`p-3 rounded-xl transition-all duration-200 ${
            isSending ? 'bg-[#3c3c3e] cursor-not-allowed' : 'hover:bg-[#3c3c3e]'
          }`}
          disabled={isSending} // Disable button during send
        >
          <Send className={`w-5 h-5 ${isSending ? 'text-gray-500' : 'text-blue-400'}`} />
        </button>
      </div>
    </form>
  );
};
