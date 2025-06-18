
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Vote, User, Shield } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (credentials: { matricNumber: string; password: string }) => void;
}

const LoginDialog = ({ open, onOpenChange, onLogin }: LoginDialogProps) => {
  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ matricNumber, password });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Vote className="h-6 w-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Welcome Back</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to your FUOYE E-Vote account
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="matricNumber">Matriculation Number</Label>
            <Input
              id="matricNumber"
              placeholder="e.g., CSC/2020/001"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="text-center text-sm text-gray-600">Demo Accounts:</div>
          <div className="grid gap-2">
            <Card className="p-3">
              <CardContent className="p-0">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <div className="text-sm">
                    <div className="font-medium">Student: Any matric number</div>
                    <div className="text-gray-600">Password: any password</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-3">
              <CardContent className="p-0">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <div className="text-sm">
                    <div className="font-medium">Admin: admin</div>
                    <div className="text-gray-600">Password: admin123</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
