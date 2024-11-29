import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { ChatInput } from './components/ChatInput';
import { MessageList } from './components/MessageList';
import { UserList } from './components/UserList';
import { Header } from './components/Header';
import { useChatStore } from './store/chatStore';
import './styles/animations.css';
import { Encryption } from './pages/Encryption'; // Ensure this path is correct

function App() {
  const currentUser = useChatStore((state) => state.currentUser);
  const [isUserListOpen, setIsUserListOpen] = useState(true);

  const toggleUserList = () => setIsUserListOpen((prev) => !prev);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsUserListOpen(false); // Close the sidebar when route changes
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-[#1c1c1e] text-white">
        {isUserListOpen && <UserList toggleUserList={toggleUserList} />}
        <div className="flex-1 flex flex-col main-content">
          <Header toggleUserList={toggleUserList} isUserListOpen={isUserListOpen} />
          <main className="flex-1 flex flex-col bg-[#1c1c1e]">
            <Routes>
              <Route path="/" element={<><MessageList /><ChatInput /></>} />
              <Route path="/encryption" element={<Encryption />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
