import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './components/LoginPage';
import CalendarView from './components/CalendarView';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    setUserToken(token); // Store the token
    setIsAuthenticated(true); // Update authentication state
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {!isAuthenticated ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <CalendarView
          //  userToken={userToken} 
           />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
// AIzaSyCuKRaAhDuVkDjG1GmwXGhDIB5QEosxIUg