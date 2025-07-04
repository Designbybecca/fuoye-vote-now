
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { candidateAPI, userAPI, statsAPI, User, Candidate, SystemStats } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useSystemStats = () => {
  return useQuery({
    queryKey: ['system-stats'],
    queryFn: statsAPI.getSystemStats,
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userAPI.getAll,
  });
};

export const useAllCandidates = () => {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: candidateAPI.getAll,
  });
};

export const useVerifyUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (userId: number) => userAPI.verify(userId),
    onSuccess: () => {
      toast({
        title: "User Verified",
        description: "User has been successfully verified.",
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (candidateData: Omit<Candidate, 'id'>) => candidateAPI.create(candidateData),
    onSuccess: () => {
      toast({
        title: "Candidate Added",
        description: "Candidate has been successfully added.",
      });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['elections'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Add Candidate",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCandidate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Candidate> }) => 
      candidateAPI.update(id, data),
    onSuccess: () => {
      toast({
        title: "Candidate Updated",
        description: "Candidate information has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['elections'] });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (candidateId: number) => candidateAPI.delete(candidateId),
    onSuccess: () => {
      toast({
        title: "Candidate Removed",
        description: "Candidate has been successfully removed.",
      });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['elections'] });
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    },
  });
};
