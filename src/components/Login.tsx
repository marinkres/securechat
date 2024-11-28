import React, { useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { Shield } from 'lucide-react';
import '../styles/animations.css';
import { Link } from './Link';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const initialize = useChatStore((state) => state.initialize);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      initialize(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1c1e] text-white">
      <div className="max-w-md w-full space-y-8 p-8 rounded-2xl animate-slide-up glass-effect bg-[#2c2c2e]/40">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-blue-400" />
          <h2 className="mt-6 text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Secure Chat
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Privacy focused messaging platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none rounded-xl relative block w-full px-4 py-3 bg-[#3c3c3e] border-0 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="Enter your username"
              maxLength={20}
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
          >
            Join Securely
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-400">
          <p className="inline-block">
            Messages are end-to-end encrypted.<br />
            <span className="text-blue-400 hover:text-blue-500 underline">
              <Link to="/encryption">
                Learn how it works →
              </Link>
            </span>
          </p>
        </div>
        <footer className="mt-12 text-center text-gray-500">
          @ Secure Chat 2024
        </footer>
      </div>
    </div>
  );
};
