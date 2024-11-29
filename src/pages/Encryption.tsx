import React from 'react';
import { Shield, Key, Lock, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from '../components/Link';

export const Encryption: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white p-8 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-12">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            <span className="hover:text-blue-400"> Back to Chat</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-12 h-12 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            How Our Encryption Works
          </h1>
        </div>

        <div className="space-y-8">
          <section className="bg-[#2c2c2e]/90 p-6 rounded-2xl glass-effect">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-semibold">Key Generation</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              When you log in, we generate a unique public-private key pair for your session. 
              The private key is stored securely in your browser's session storage and is never 
              transmitted to our servers or shared with other users.
            </p>
          </section>

          <section className="bg-[#2c2c2e]/90 p-6 rounded-2xl glass-effect">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-semibold">Message Encryption</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              When you send a private message, it's encrypted using the recipient's public key. 
              Only the intended recipient can decrypt the message using their private key. 
              This ensures that even if messages are intercepted, they cannot be read without 
              the corresponding private key.
            </p>
          </section>

          <section className="bg-[#2c2c2e]/90 p-6 rounded-2xl glass-effect">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-semibold">Session Security</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Each session generates new encryption keys, and all keys are cleared when you log out. 
              Messages are not stored on any server and exist only in the current session. 
              This ensures perfect forward secrecy and prevents message history from being 
              compromised.
            </p>
          </section>
        </div>
        <footer className="mt-12 text-center text-gray-500">
          @ Secure Chat 2024.
        </footer>
      </div>
    </div>
  );
};
