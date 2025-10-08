import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginProps {
  onLogin: (userData: { name: string; role: string }) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication - replace with real authentication
    setTimeout(() => {
      if (email && password) {
        const userData = {
          name: email.split('@')[0],
          role: email.includes('admin') ? 'Administrator' : 'Researcher'
        };
        onLogin(userData);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1646800185549-368ebff81b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZWwlMjBmaXNoJTIwdW5kZXJ3YXRlciUyMHJlc2VhcmNofGVufDF8fHx8MTc1OTYyNDI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Eel research"
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
            </div>
            <CardTitle>Eel Classification System</CardTitle>
            <CardDescription>
              Sign in to access the eel monitoring and classification platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="researcher@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p>researcher@example.com / admin@example.com</p>
              <p>Any password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}