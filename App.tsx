
import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import { CHALLENGES } from './constants';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedName = localStorage.getItem('sleepChallengeUser');
      const storedCompleted = localStorage.getItem('sleepChallengeCompleted');
      if (storedName) {
        setUserName(storedName);
      }
      if (storedCompleted) {
        setCompletedChallenges(JSON.parse(storedCompleted));
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    } finally {
      setIsAppReady(true);
    }
  }, []);

  useEffect(() => {
    if (userName) {
      try {
        localStorage.setItem('sleepChallengeUser', userName);
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
    }
  }, [userName]);

  useEffect(() => {
    if (isAppReady) {
      try {
        localStorage.setItem('sleepChallengeCompleted', JSON.stringify(completedChallenges));
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
    }
  }, [completedChallenges, isAppReady]);
  

  const handleLogin = (name: string) => {
    if (name.trim()) {
      setUserName(name.trim());
      setCompletedChallenges([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sleepChallengeUser');
    localStorage.removeItem('sleepChallengeCompleted');
    setUserName(null);
    setCompletedChallenges([]);
  };

  const toggleChallenge = (challengeId: string) => {
    setCompletedChallenges(prev =>
      prev.includes(challengeId)
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };
  
  const allChallengesCompleted = completedChallenges.length === CHALLENGES.length;

  if (!isAppReady) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <div className="text-2xl font-bold text-cyan-400">Cargando...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {!userName ? (
          <LoginScreen onLogin={handleLogin} />
        ) : allChallengesCompleted ? (
          <Certificate userName={userName} onReset={handleLogout} />
        ) : (
          <Dashboard
            userName={userName}
            completedChallenges={completedChallenges}
            onToggleChallenge={toggleChallenge}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default App;
