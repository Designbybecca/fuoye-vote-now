
import axios from 'axios';

// Configure axios defaults
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: number;
  matricNumber: string;
  fullName: string;
  email: string;
  role: 'student' | 'admin';
  isVerified: boolean;
  hasVoted?: boolean;
}

export interface Election {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'closed';
  positions: string[];
  totalVotes?: number;
  totalVoters?: number;
  turnout?: string;
}

export interface Candidate {
  id: number;
  name: string;
  matricNumber: string;
  position: string;
  party: string;
  photo?: string;
  manifesto: string;
  electionId: number;
  votes?: number;
  percentage?: number;
}

export interface VotePayload {
  votes: Record<string, number>; // position -> candidateId
}

export interface SystemStats {
  totalElections: number;
  activeElections: number;
  totalVoters: number;
  totalVotes: number;
}

// Authentication endpoints
export const authAPI = {
  login: async (credentials: { matricNumber: string; password: string }) => {
    const response = await api.post('/login/', credentials);
    return response.data;
  },

  register: async (userData: {
    fullName: string;
    matricNumber: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/register/', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/logout/');
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/user/');
    return response.data;
  },

  verify: async (token: string) => {
    const response = await api.post('/verify/', { token });
    return response.data;
  },
};

// Election endpoints
export const electionAPI = {
  getAll: async (): Promise<Election[]> => {
    const response = await api.get('/elections/');
    return response.data;
  },

  getById: async (id: number): Promise<Election> => {
    const response = await api.get(`/elections/${id}/`);
    return response.data;
  },

  getCandidates: async (electionId: number): Promise<Candidate[]> => {
    const response = await api.get(`/elections/${electionId}/candidates/`);
    return response.data;
  },

  submitVote: async (electionId: number, votes: VotePayload) => {
    const response = await api.post(`/elections/${electionId}/vote/`, votes);
    return response.data;
  },

  getResults: async (electionId: number) => {
    const response = await api.get(`/elections/${electionId}/results/`);
    return response.data;
  },
};

// Candidate endpoints (Admin)
export const candidateAPI = {
  getAll: async (): Promise<Candidate[]> => {
    const response = await api.get('/candidates/');
    return response.data;
  },

  create: async (candidateData: Omit<Candidate, 'id'>) => {
    const response = await api.post('/candidates/', candidateData);
    return response.data;
  },

  getById: async (id: number): Promise<Candidate> => {
    const response = await api.get(`/candidates/${id}/`);
    return response.data;
  },

  update: async (id: number, candidateData: Partial<Candidate>) => {
    const response = await api.put(`/candidates/${id}/`, candidateData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/candidates/${id}/`);
    return response.data;
  },
};

// User/Voter endpoints (Admin)
export const userAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users/');
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
  },

  verify: async (id: number) => {
    const response = await api.post(`/users/${id}/verify/`);
    return response.data;
  },

  deactivate: async (id: number) => {
    const response = await api.post(`/users/${id}/deactivate/`);
    return response.data;
  },
};

// Dashboard/Stats endpoints
export const statsAPI = {
  getSystemStats: async (): Promise<SystemStats> => {
    const response = await api.get('/stats/');
    return response.data;
  },

  getLogs: async () => {
    const response = await api.get('/logs/');
    return response.data;
  },

  createLog: async (logData: { action: string; details?: string }) => {
    const response = await api.post('/logs/', logData);
    return response.data;
  },
};

export default api;
