import React from 'react';
import { useChatStore } from '../store/chatStore';
import { Lock, Shield } from 'lucide-react';
import { decryptMessage, getPrivateKey } from '../utils/encryption';

export const MessageList: React.FC = () => {
  const { messages, currentUser, selectedUser } = useChatStore();
  const privateKey = getPrivateKey();

  const filteredMessages = messages.filter((message) => {
    if (!selectedUser) return !message.recipientId;
    return (
      (message.sender === currentUser?.username && message.recipientId === selectedUser.id) ||
      (message.sender === selectedUser.username && message.recipientId === currentUser?.id)
    );
  });

  const getMessageContent = (message: typeof messages[0]): string => {
    if (!message.encrypted) return message.content;
    
    // Only decrypt if we're the recipient and have the private key
    if (message.recipientId === currentUser?.id && privateKey) {
      return decryptMessage(message.content, privateKey);
    }
    
    return message.content;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {filteredMessages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === currentUser?.username ? 'justify-end' : 'justify-start'
          } animate-slide-up`}
        >
          <div
            className={`max-w-[70%] rounded-2xl p-4 ${
              message.sender === currentUser?.username
                ? 'bg-gradient-to-r from-blue-400/20 to-indigo-400/20 text-white'
                : 'bg-[#3c3c3e] text-white'
            } glass-effect`}
          >
            <div className="flex items-center gap-2 text-sm opacity-75 mb-1">
              <span>{message.sender}</span>
              {message.encrypted && <Lock className="w-4 h-4 text-blue-400" />}
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <p className="break-words">{getMessageContent(message)}</p>
            <div className="text-xs opacity-75 mt-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};