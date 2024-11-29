import React, { useEffect, useState } from 'react';
import { Login } from './components/Login';
import { ChatInput } from './components/ChatInput';
import { MessageList } from './components/MessageList';
import { UserList } from './components/UserList';
import { Header } from './components/Header';
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

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-[#1c1c1e] text-white">
      {isUserListOpen && <UserList toggleUserList={toggleUserList} />}
      <div className="flex-1 flex flex-col main-content">
        <Header toggleUserList={toggleUserList} isUserListOpen={isUserListOpen} />
        <main className="flex-1 flex flex-col bg-[#1c1c1e]">
          <MessageList />
          <ChatInput />
        </main>
      </div>
    </div>
  );
}

export default App;
