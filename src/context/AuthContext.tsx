import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
} | null;

interface AuthContextType {
  user: User;
  isLoading: boolean;
  signIn: (username: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: () => {},
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking for a saved session or token
  useEffect(() => {
    const checkToken = async () => {
      // Simulate an async operation
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    checkToken();
  }, []);

  const signIn = (username: string) => {
    // Simulated account login
    setUser({
      id: 'dummy-123',
      name: username || 'Dummy Account',
    });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
