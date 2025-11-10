import React from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import SleepMasterCertificate from './components/SleepMasterCertificate';
import PublicProfilePage from './components/PublicProfilePage';
import { CHALLENGES } from './constants';
import { usePersistentState } from './hooks/usePersistentState';

const App: React.FC = () => {
  const [userName, setUserName] = usePersistentState<string | null>('userName', null);
  const [completedChallenges, setCompletedChallenges] = usePersistentState<string[]>('completedChallenges', []);
  const [hasSeen7DayCertificate, setHasSeen7DayCertificate] = usePersistentState<boolean>('hasSeen7DayCertificate', false);


  const handleLogin = (name: string) => {
    if (name.trim()) {
      setUserName(name.trim());
    }
  };

  const handleReset = () => {
    setUserName(null);
    setCompletedChallenges([]);
    setHasSeen7DayCertificate(false);
  };

  const toggleChallenge = (challengeId: string) => {
    const newCompletedChallenges = completedChallenges.includes(challengeId)
      ? completedChallenges.filter(id => id !== challengeId)
      : [...completedChallenges, challengeId];
    setCompletedChallenges(newCompletedChallenges);
  };

  const path = window.location.pathname;
  if (path.startsWith('/profile')) {
    return <PublicProfilePage />;
  }

  const completedCount = completedChallenges.length;
  const allChallengesCompleted = completedCount === CHALLENGES.length;
  const sevenChallengesCompleted = completedCount >= 7;

  const renderContent = () => {
    if (!userName) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    if (allChallengesCompleted) {
      return <SleepMasterCertificate userName={userName} onReset={handleReset} />;
    }

    if (sevenChallengesCompleted && !hasSeen7DayCertificate) {
      return (
        <Certificate 
          userName={userName} 
          onContinue={() => setHasSeen7DayCertificate(true)}
          onReset={handleReset} 
        />
      );
    }

    return (
      <Dashboard
        userName={userName}
        completedChallenges={completedChallenges}
        onToggleChallenge={toggleChallenge}
        onReset={handleReset}
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