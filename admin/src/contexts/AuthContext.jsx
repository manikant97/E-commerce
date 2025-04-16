import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // For now, using a simple login with hardcoded credentials
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Hardcoded admin credentials for now
      if (email === 'admin@example.com' && password === 'admin123') {
        const userData = {
          email,
          role: 'admin',
          name: 'Admin User'
        };
        setUser(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  // Check for existing session
  useState(() => {
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
