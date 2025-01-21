import React from 'react';
import { Calendar } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

interface LoginPageProps {
  onLogin: (token: string) => void; // Update to accept token
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const handleLoginSuccess = (response: any) => {
    const credential = response.credential; // Get the Google token
    onLogin(credential); // Pass token to parent
  };

  const handleLoginError = () => {
    console.error('Google Login Failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Calendar className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Access your Google Calendar events in one place</p>
        </div>

        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Securely access and manage your calendar events</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
