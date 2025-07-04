
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { electionAPI, Election, Candidate, VotePayload } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useElections = () => {
  return useQuery({
    queryKey: ['elections'],
    queryFn: electionAPI.getAll,
  });
};

export const useElection = (id: number) => {
  return useQuery({
    queryKey: ['election', id],
    queryFn: () => electionAPI.getById(id),
    enabled: !!id,
  });
};

export const useElectionCandidates = (electionId: number) => {
  return useQuery({
    queryKey: ['election-candidates', electionId],
    queryFn: () => electionAPI.getCandidates(electionId),
    enabled: !!electionId,
  });
};

export const useElectionResults = (electionId: number) => {
  return useQuery({
    queryKey: ['election-results', electionId],
    queryFn: () => electionAPI.getResults(electionId),
    enabled: !!electionId,
  });
};

export const useSubmitVote = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ electionId, votes }: { electionId: number; votes: VotePayload }) =>
      electionAPI.submitVote(electionId, votes),
    onSuccess: (data, variables) => {
      toast({
        title: "Vote Submitted Successfully!",
        description: "Thank you for participating in the democratic process.",
      });
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['elections'] });
      queryClient.invalidateQueries({ queryKey: ['election', variables.electionId] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      toast({
        title: "Vote Submission Failed",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    },
  });
};
