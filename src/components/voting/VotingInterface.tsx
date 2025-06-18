
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Vote, Eye, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VotingInterfaceProps {
  election: any;
  onBack: () => void;
  onVoteSubmitted: () => void;
}

const VotingInterface = ({ election, onBack, onVoteSubmitted }: VotingInterfaceProps) => {
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  // Mock candidates data
  const candidates = {
    "President": [
      {
        id: "p1",
        name: "John Adebayo",
        matricNumber: "CSC/2021/001",
        party: "Progressive Students Alliance",
        photo: "/placeholder.svg",
        manifesto: "Bringing positive change to student life through better facilities and representation."
      },
      {
        id: "p2",
        name: "Sarah Ogundimu",
        matricNumber: "ENG/2021/045",
        party: "United Students Movement",
        photo: "/placeholder.svg",
        manifesto: "Fighting for affordable education and improved student welfare."
      }
    ],
    "Vice President": [
      {
        id: "vp1",
        name: "Michael Taiwo",
        matricNumber: "SCI/2021/078",
        party: "Progressive Students Alliance",
        photo: "/placeholder.svg",
        manifesto: "Supporting academic excellence and student development programs."
      },
      {
        id: "vp2",
        name: "Grace Adeyemi",
        matricNumber: "ART/2021/023",
        party: "United Students Movement",
        photo: "/placeholder.svg",
        manifesto: "Promoting inclusivity and diversity in student governance."
      }
    ]
  };

  const handleVoteChange = (position: string, candidateId: string) => {
    setVotes(prev => ({ ...prev, [position]: candidateId }));
  };

  const handleSubmitVote = () => {
    const totalPositions = election.positions.length;
    const votedPositions = Object.keys(votes).length;

    if (votedPositions === 0) {
      toast({
        title: "No Votes Selected",
        description: "Please select at least one candidate to vote for.",
        variant: "destructive"
      });
      return;
    }

    setShowConfirmation(true);
  };

  const confirmVote = () => {
    // Mock vote submission
    toast({
      title: "Vote Submitted Successfully!",
      description: "Thank you for participating in the democratic process.",
    });
    onVoteSubmitted();
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Vote className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Confirm Your Vote</CardTitle>
            <CardDescription>
              Please review your selections before submitting your vote.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(votes).map(([position, candidateId]) => {
              const positionCandidates = candidates[position as keyof typeof candidates];
              const selectedCandidate = positionCandidates?.find(c => c.id === candidateId);
              
              return selectedCandidate ? (
                <div key={position} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{position}</p>
                    <p className="text-blue-600">{selectedCandidate.name}</p>
                    <p className="text-sm text-gray-600">{selectedCandidate.party}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              ) : null;
            })}
            
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
                className="flex-1"
              >
                Back to Voting
              </Button>
              <Button 
                onClick={confirmVote}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Submit Vote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="bg-blue-600 p-2 rounded-lg">
              <Vote className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Voting</h1>
              <p className="text-sm text-gray-600">{election.name}</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            Active Election
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cast Your Vote</h1>
          <p className="text-gray-600">
            Select one candidate for each position. You can skip positions if you choose not to vote for them.
          </p>
        </div>

        <div className="space-y-8">
          {election.positions.map((position: string) => {
            const positionCandidates = candidates[position as keyof typeof candidates] || [];
            
            return (
              <Card key={position} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="text-xl">{position}</CardTitle>
                  <CardDescription className="text-blue-100">
                    Select one candidate for this position
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup
                    value={votes[position] || ""}
                    onValueChange={(value) => handleVoteChange(position, value)}
                    className="space-y-4"
                  >
                    {positionCandidates.map((candidate) => (
                      <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <RadioGroupItem value={candidate.id} id={candidate.id} />
                          <Label htmlFor={candidate.id} className="flex-1 cursor-pointer">
                            <div className="flex items-start space-x-4">
                              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-600">
                                  {candidate.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                                <p className="text-sm text-gray-600">{candidate.matricNumber}</p>
                                <Badge variant="outline" className="mt-1">{candidate.party}</Badge>
                                <p className="mt-2 text-sm text-gray-700">{candidate.manifesto}</p>
                              </div>
                            </div>
                          </Label>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Full Manifesto
                          </Button>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            onClick={handleSubmitVote}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            <Vote className="mr-2 h-5 w-5" />
            Submit Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotingInterface;
