export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  encrypted: boolean;
  recipientId?: string;
}

export interface User {
  id: string;
  username: string;
  publicKey: string;
}