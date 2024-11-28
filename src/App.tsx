import React, { useEffect, useState } from 'react';
import { Login } from './components/Login';
import { ChatInput } from './components/ChatInput';
import { MessageList } from './components/MessageList'; // Ensure this is imported
import { UserList } from './components/UserList';
import { Header } from './components/Header';
import { Encryption } from './pages/Encryption';
import { useChatStore } from './store/chatStore';
import './styles/animations.css';

function App() {
  const currentUser = useChatStore((state) => state.currentUser);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isUserListOpen, setIsUserListOpen] = useState(true);

  const toggleUserList = () => setIsUserListOpen((prev) => !prev);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  if (currentPath === '/encryption') {
    return <Encryption />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-[#1c1c1e] text-white">
      {isUserListOpen && <UserList toggleUserList={toggleUserList} />}
      <div className="flex-1 flex flex-col">
        <Header
          toggleUserList={toggleUserList}
          isUserListOpen={isUserListOpen}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '60px', backgroundColor: 'rgba(44, 44, 46, 0.9)', zIndex: 10, borderBottom: '1px solid #3c3c3e' }}
        />
        <main className="flex-1 flex flex-col bg-[#1c1c1e]" style={{ paddingTop: '60px' }}>
          <MessageList /> {/* Reverting to directly use MessageList */}
          <ChatInput />
        </main>
      </div>
    </div>
  );
}

export default App;
