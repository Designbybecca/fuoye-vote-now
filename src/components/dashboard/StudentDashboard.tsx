
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, User, Calendar, Clock, CheckCircle, Eye } from "lucide-react";
import VotingInterface from "@/components/voting/VotingInterface";

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
}

const StudentDashboard = ({ user, onLogout }: StudentDashboardProps) => {
  const [showVoting, setShowVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(user.hasVoted || false);

  // Mock election data
  const activeElections = [
    {
      id: 1,
      name: "2025 Student Union Government Election",
      description: "Vote for your student representatives",
      startDate: "2024-12-20",
      endDate: "2024-12-22",
      status: "active",
      positions: ["President", "Vice President", "Secretary", "Treasurer"]
    }
  ];

  const upcomingElections = [
    {
      id: 2,
      name: "Faculty of Sciences Election",
      description: "Faculty-specific representative election",
      startDate: "2024-12-25",
      endDate: "2024-12-26",
      status: "upcoming"
    }
  ];

  const handleVoteSubmitted = () => {
    setHasVoted(true);
    setShowVoting(false);
  };

  if (showVoting) {
    return (
      <VotingInterface 
        election={activeElections[0]}
        onBack={() => setShowVoting(false)}
        onVoteSubmitted={handleVoteSubmitted}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Vote className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FUOYE E-Vote</h1>
              <p className="text-sm text-gray-600">Student Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Matric Number: {user.matricNumber}
          </p>
        </div>

        {/* Active Elections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Elections</h2>
          {activeElections.length > 0 ? (
            <div className="grid gap-6">
              {activeElections.map((election) => (
                <Card key={election.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{election.name}</CardTitle>
                        <CardDescription className="text-base">
                          {election.description}
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">
                          Ends: December 22, 2024
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">
                          2 days remaining
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Positions:</p>
                      <div className="flex flex-wrap gap-2">
                        {election.positions.map((position) => (
                          <Badge key={position} variant="outline">
                            {position}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {hasVoted ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">You have voted in this election</span>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => setShowVoting(true)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Vote className="mr-2 h-4 w-4" />
                          Vote Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">No active elections at the moment.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Elections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Elections</h2>
          {upcomingElections.length > 0 ? (
            <div className="grid gap-4">
              {upcomingElections.map((election) => (
                <Card key={election.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{election.name}</CardTitle>
                        <CardDescription>
                          {election.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        Upcoming
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Starts: December 25, 2024</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-600">No upcoming elections scheduled.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
