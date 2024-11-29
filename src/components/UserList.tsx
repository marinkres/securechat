import React from 'react';
import { Users, UserCircle, LogOut, Lock } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { Link } from './Link';
import { User } from '../types/chat'; // Make sure to import User type

export const UserList: React.FC<{ toggleUserList?: () => void }> = ({ toggleUserList }) => {
  const { users, currentUser, selectedUser, selectUser, logout, fetchMessages } = useChatStore();

  const handleSelectUser = (user: User | null) => {
    selectUser(user);
    if (currentUser && user) {
      fetchMessages(currentUser.id, user.id);
    } else if (currentUser && !user) {
      fetchMessages(currentUser.id, 'everyone'); // Fetch messages for the public channel or everyone
    }
  };

  return (
    <div className="relative transition-all duration-300 flex flex-col w-72 bg-[#2c2c2e]/90 glass-effect border-r border-[#3c3c3e]">
      {/* Users Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Users</h2>
        </div>

        

        <div className="space-y-2">
          <button
            onClick={() => handleSelectUser(null)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
              !selectedUser ? 'bg-blue-400/20 text-blue-400' : 'text-gray-400 hover:bg-[#3c3c3e]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Everyone</span>
          </button>

          {users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  selectedUser?.id === user.id
                    ? 'bg-blue-400/20 text-blue-400'
                    : 'text-gray-400 hover:bg-[#3c3c3e]'
                }`}
              >
                <UserCircle className="w-4 h-4" />
                <span>{user.username}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto p-4 border-t border-[#3c3c3e] space-y-4">
      <div className="text-gray-400 mb-4">
          Logged in as: <strong>{currentUser?.username}</strong>
        </div>
        {/* Learn More */}
        <div className="text-sm text-gray-400 flex items-start gap-2">
          <Lock className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
          <div>
            Messages are end-to-end encrypted.{' '}
            <Link to="/encryption">Learn how it works →</Link>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#3c3c3e] transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
