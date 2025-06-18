
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, BarChart3, Trophy, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ElectionResultsProps {
  onBack: () => void;
}

const ElectionResults = ({ onBack }: ElectionResultsProps) => {
  // Mock results data
  const electionInfo = {
    name: "2025 Student Union Government Election",
    totalVotes: 234,
    totalVoters: 1500,
    turnout: "15.6%",
    status: "completed"
  };

  const results = {
    "President": [
      { name: "John Adebayo", party: "Progressive Students Alliance", votes: 145, percentage: 65.9 },
      { name: "Sarah Ogundimu", party: "United Students Movement", votes: 75, percentage: 34.1 }
    ],
    "Vice President": [
      { name: "Michael Taiwo", party: "Progressive Students Alliance", votes: 132, percentage: 60.3 },
      { name: "Grace Adeyemi", party: "United Students Movement", votes: 87, percentage: 39.7 }
    ]
  };

  const chartData = Object.entries(results).flatMap(([position, candidates]) =>
    candidates.map(candidate => ({
      position,
      name: candidate.name,
      votes: candidate.votes,
      percentage: candidate.percentage
    }))
  );

  const pieColors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="bg-blue-600 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Election Results</h1>
              <p className="text-sm text-gray-600">{electionInfo.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800">
              Completed
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Election Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Election Results</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Votes Cast</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{electionInfo.totalVotes}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registered Voters</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{electionInfo.totalVoters.toLocaleString()}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Voter Turnout</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{electionInfo.turnout}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Positions</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Object.keys(results).length}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Vote Distribution</CardTitle>
              <CardDescription>Votes received by each candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>President Race Overview</CardTitle>
              <CardDescription>Vote share percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results.President}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="votes"
                    >
                      {results.President.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="space-y-8">
          {Object.entries(results).map(([position, candidates]) => (
            <Card key={position}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Trophy className="mr-2 h-6 w-6 text-yellow-600" />
                  {position}
                </CardTitle>
                <CardDescription>
                  Total votes: {candidates.reduce((sum, c) => sum + c.votes, 0)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidates
                    .sort((a, b) => b.votes - a.votes)
                    .map((candidate, index) => (
                      <div key={candidate.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {index === 0 && (
                              <Trophy className="h-5 w-5 text-yellow-600" />
                            )}
                            <div>
                              <h3 className="font-semibold text-lg">{candidate.name}</h3>
                              <p className="text-sm text-gray-600">{candidate.party}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">{candidate.votes}</p>
                            <p className="text-sm text-gray-600">{candidate.percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                        <Progress value={candidate.percentage} className="h-2" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectionResults;
