
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockAuthService, MockUser } from '@/services/mockAuth';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: MockUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { matricNumber: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const isAuthenticated = !!user;

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const userData = await mockAuthService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Auth initialization failed:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { matricNumber: string; password: string }) => {
    try {
      const response = await mockAuthService.login(credentials);
      
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response.user));
        setUser(response.user);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${response.user.fullName}!`,
        });
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      await mockAuthService.register(userData);
      
      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await mockAuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await mockAuthService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      await logout();
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
