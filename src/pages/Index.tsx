
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, Shield, Users, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import LoginDialog from "@/components/auth/LoginDialog";
import RegisterDialog from "@/components/auth/RegisterDialog";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Mock login function - in real app, this would connect to backend
  const handleLogin = (credentials: any) => {
    // Mock authentication
    if (credentials.matricNumber === "admin" && credentials.password === "admin123") {
      setUser({ role: "admin", name: "Election Admin", matricNumber: "admin" });
    } else if (credentials.matricNumber && credentials.password) {
      setUser({ 
        role: "student", 
        name: "John Doe", 
        matricNumber: credentials.matricNumber,
        hasVoted: false 
      });
    }
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If user is logged in, show appropriate dashboard
  if (user) {
    if (user.role === "admin") {
      return <AdminDashboard user={user} onLogout={handleLogout} />;
    } else {
      return <StudentDashboard user={user} onLogout={handleLogout} />;
    }
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FUOYE E-Vote?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with security, accessibility, and transparency in mind to ensure every vote counts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Secure & Safe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  End-to-end encryption and secure authentication ensure your vote remains private and protected.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">User Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Intuitive interface designed for all students, accessible on both mobile and desktop devices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Real-time Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View live election statistics and get instant results when voting concludes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete audit trail and transparent processes ensure election integrity and trustworthiness.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple steps to cast your vote</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-gray-600">Create your account using your FUOYE matriculation number and email address.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Vote</h3>
              <p className="text-gray-600">Browse candidates, read their manifestos, and cast your vote securely.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Results</h3>
              <p className="text-gray-600">View real-time results and celebrate democratic participation.</p>
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
