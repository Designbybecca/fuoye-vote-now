
// Mock authentication service for demo purposes
export interface MockUser {
  id: number;
  matricNumber: string;
  fullName: string;
  email: string;
  role: 'student' | 'admin';
  isVerified: boolean;
  hasVoted?: boolean;
}

const mockUsers: MockUser[] = [
  {
    id: 1,
    matricNumber: 'admin',
    fullName: 'System Administrator',
    email: 'admin@fuoye.edu.ng',
    role: 'admin',
    isVerified: true,
  },
  // Any matriculation number will work for students
];

export const mockAuthService = {
  login: async (credentials: { matricNumber: string; password: string }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Admin login
    if (credentials.matricNumber === 'admin' && credentials.password === 'admin123') {
      const user = mockUsers[0];
      return {
        token: 'mock-admin-token',
        user,
      };
    }

    // Any other matric number works for students (demo mode)
    if (credentials.matricNumber && credentials.password) {
      const user: MockUser = {
        id: 2,
        matricNumber: credentials.matricNumber,
        fullName: 'Demo Student',
        email: `${credentials.matricNumber}@student.fuoye.edu.ng`,
        role: 'student',
        isVerified: true,
        hasVoted: false,
      };
      
      return {
        token: 'mock-student-token',
        user,
      };
    }

    throw new Error('Invalid credentials');
  },

  register: async (userData: {
    fullName: string;
    matricNumber: string;
    email: string;
    password: string;
  }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      message: 'Registration successful! Please check your email to verify your account.',
      user: {
        id: 3,
        matricNumber: userData.matricNumber,
        fullName: userData.fullName,
        email: userData.email,
        role: 'student' as const,
        isVerified: false,
      }
    };
  },

  getCurrentUser: async (): Promise<MockUser> => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      return JSON.parse(userData);
    }
    
    throw new Error('Not authenticated');
  },

  logout: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Logged out successfully' };
  }
};
