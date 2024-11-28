import React from 'react';
import { Shield, ChevronRight, ChevronLeft } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const Header: React.FC<{ toggleUserList: () => void; isUserListOpen: boolean }> = ({
  toggleUserList,
  isUserListOpen,
}) => {
  const { currentUser, selectedUser } = useChatStore();

  return (
    <header className="header bg-[#2c2c2e]/90 glass-effect border-b border-[#3c3c3e] fixed top-0 left-0 w-full z-10">
      <div className="w-full px-0 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-2 pl-2"> {/* Use padding-left (pl-2) for slight breathing room */}
            {/* Toggle Button */}
            <button
              onClick={toggleUserList}
              className="toggle-button p-2 rounded-lg bg-[#3c3c3e] text-gray-400 hover:bg-[#4c4c4e]"
            >
              {isUserListOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>

            {/* Secure Chat Title */}
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Secure Chat
              </h1>
              <span className="text-sm text-gray-400">- Logged in as: {currentUser?.username}</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-gray-400 pr-4"> {/* Right-side padding for consistent spacing */}
            {selectedUser ? (
              <span>Chatting with {selectedUser.username}</span>
            ) : (
              <span>Public Channel</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

