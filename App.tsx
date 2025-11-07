import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import { CHALLENGES } from './constants';
import { onAuthStateChange, logout } from './services/authService';
import { getUserProgress, updateUserProgress } from './services/firestoreService';
import type { User } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const progress = await getUserProgress(firebaseUser.uid);
        setCompletedChallenges(progress);
      } else {
        setUser(null);
        setCompletedChallenges([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    // El listener onAuthStateChange se encargará de actualizar el estado
  };

  const toggleChallenge = async (challengeId: string) => {
    if (!user) return;

    const newCompletedChallenges = completedChallenges.includes(challengeId)
      ? completedChallenges.filter(id => id !== challengeId)
      : [...completedChallenges, challengeId];
    
    setCompletedChallenges(newCompletedChallenges); // Actualización optimista de la UI
    await updateUserProgress(user.uid, newCompletedChallenges);
  };
  
  const allChallengesCompleted = completedChallenges.length === CHALLENGES.length;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-slate-400">Cargando...</div>
        </div>
      );
    }

    if (!user) {
      return <LoginScreen />;
    }

    if (allChallengesCompleted) {
      return <Certificate userName={user.displayName || 'Héroe del Sueño'} onReset={handleLogout} />;
    }

    return (
      <Dashboard
        user={user}
        completedChallenges={completedChallenges}
        onToggleChallenge={toggleChallenge}
        onLogout={handleLogout}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;