import { create } from 'zustand';
import { Message, User } from '../types/chat';
import { generateKeyPair, encryptMessage } from '../utils/encryption';

interface ChatState {
  messages: Message[];
  currentUser: User | null;
  users: User[];
  selectedUser: User | null;
  initialize: (username: string) => void;
  logout: () => void;
  addMessage: (content: string, recipientId?: string) => void;
  selectUser: (user: User | null) => void;
  fetchMessages: (userId: string, contactId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentUser: null,
  users: [],  // Initially empty, will be populated dynamically
  selectedUser: null,
  initialize: (username) => {
    const { publicKey, privateKey } = generateKeyPair();  // Generates keys using CryptoJS
    const user: User = {
      id: crypto.randomUUID(),
      username,
      publicKey,
    };
    sessionStorage.setItem('privateKey', privateKey);  // Store private key in sessionStorage for decryption later
    set((state) => ({
      currentUser: user,
      users: [...state.users, user],  // Add the new user to the list of users
    }));
  },
  logout: () => {
    sessionStorage.removeItem('privateKey');  // Clear private key on logout
    set((state) => ({
      currentUser: null,
      selectedUser: null,
      messages: [],
      users: state.users.filter((user) => user.id !== state.currentUser?.id),  // Remove the logged-out user from the list
    }));
  },
  addMessage: (content, recipientId) => {
    set((state) => {
      const encrypted = !!recipientId;  // Check if message should be encrypted
      const recipient = state.users.find((u) => u.id === recipientId);

      let processedContent = content;  // Default to plain text message
      if (encrypted && recipient) {
        processedContent = encryptMessage(content, recipient.publicKey);  // Encrypt the message with the recipient's public key
      }

      const newMessage: Message = {
        id: crypto.randomUUID(),
        sender: state.currentUser?.username || 'Anonymous',
        content: processedContent,
        timestamp: Date.now(),
        encrypted,
        recipientId,
      };

      return {
        messages: [
          ...state.messages,
          newMessage,
        ],
      };
    });
  },
  selectUser: (user) => set({ selectedUser: user }),
  fetchMessages: (userId, contactId) => {
    set((state) => {
      const chatHistory = state.messages.filter(
        (msg: Message) => (msg.sender === userId && msg.recipientId === contactId) || 
                          (msg.sender === contactId && msg.recipientId === userId)
      );

      return { messages: chatHistory };
    });
  },
}));
