
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, Shield, Users, BarChart3, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import LoginDialog from "@/components/auth/LoginDialog";
import RegisterDialog from "@/components/auth/RegisterDialog";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { user, isLoading, login, logout } = useAuth();

  const handleLogin = async (credentials: { matricNumber: string; password: string }) => {
    try {
      await login(credentials);
      setShowLogin(false);
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading FUOYE E-Vote...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, show appropriate dashboard
  if (user) {
    if (user.role === "admin") {
      return <AdminDashboard user={user} onLogout={handleLogout} />;
    } else {
      return <StudentDashboard user={user} onLogout={handleLogout} />;
    }
  }

  // Show landing page for non-authenticated users
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
              <p className="text-sm text-gray-600">Digital Democracy Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setShowLogin(true)}>
              Login
            </Button>
            <Button onClick={() => setShowRegister(true)}>
              Register to Vote
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Federal University Oye-Ekiti
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Secure Digital Voting for
            <span className="text-blue-600 block">Student Elections</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience the future of student democracy with our secure, transparent, and accessible e-voting platform designed specifically for FUOYE students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowRegister(true)}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowLogin(true)}>
              Already Registered? Login
            </Button>
          </div>
        </div>
      </section>

      {/* API Integration Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive E-Voting System</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with robust backend integration for seamless election management and real-time data processing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Secure Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  JWT-based authentication with email verification and secure session management for all users.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Real-time Elections</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Live election data, candidate management, and instant vote processing with comprehensive API integration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive dashboard with real-time statistics, voter turnout tracking, and detailed reporting.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Admin Control</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete election lifecycle management with candidate verification, user approval, and audit trails.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Endpoints Showcase */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Robust Backend Integration</h2>
            <p className="text-gray-600">Powered by comprehensive RESTful API endpoints</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• User Registration & Login</li>
                  <li>• Email Verification</li>
                  <li>• Session Management</li>
                  <li>• Secure Logout</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Vote className="h-5 w-5 mr-2 text-blue-600" />
                  Elections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Live Election Data</li>
                  <li>• Candidate Management</li>
                  <li>• Secure Vote Submission</li>
                  <li>• Real-time Results</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                  Administration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• User Verification</li>
                  <li>• System Statistics</li>
                  <li>• Activity Logs</li>
                  <li>• Data Export</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple steps to participate in digital democracy</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Verify</h3>
              <p className="text-gray-600">Create your account using your FUOYE matriculation number and verify through email.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Vote</h3>
              <p className="text-gray-600">View active elections, read candidate manifestos, and cast your vote securely.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Results</h3>
              <p className="text-gray-600">Monitor election progress and view comprehensive results with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Vote className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">FUOYE E-Vote</span>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering student democracy through secure digital voting
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Federal University Oye-Ekiti. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Dialogs */}
      <LoginDialog 
        open={showLogin} 
        onOpenChange={setShowLogin}
        onLogin={handleLogin}
      />
      <RegisterDialog 
        open={showRegister} 
        onOpenChange={setShowRegister}
      />
    </div>
  );
};

export default Index;
