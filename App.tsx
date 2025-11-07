import React from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import PublicProfilePage from './components/PublicProfilePage';
import { CHALLENGES } from './constants';

// Custom hook para manejar la persistencia del estado en localStorage.
function usePersistentState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null) return initialValue;
      try {
        return JSON.parse(storedValue);
      } catch {
        return storedValue as unknown as T;
      }
    } catch (error) {
      console.error(`Error al leer la clave “${key}” de localStorage:`, error);
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error al establecer la clave “${key}” en localStorage:`, error);
    }
  }, [key, state]);

  return [state, setState];
}

const App: React.FC = () => {
  const [userName, setUserName] = usePersistentState<string | null>('sleepChallengeUser', null);
  const [completedChallenges, setCompletedChallenges] = usePersistentState<string[]>('sleepChallengeCompleted', []);

  // Simple enrutador del lado del cliente
  const { pathname } = window.location;

  if (pathname.startsWith('/public/')) {
    const encodedData = pathname.substring('/public/'.length);
    try {
      const decodedJson = atob(encodedData);
      const publicData = JSON.parse(decodedJson);
      // Valida que los datos decodificados tengan la estructura esperada
      if (publicData && typeof publicData.name === 'string' && Array.isArray(publicData.completed)) {
        return <PublicProfilePage data={publicData} />;
      }
    } catch (error) {
      console.error("Error al decodificar los datos del perfil público:", error);
      // Redirige a la página principal si el enlace está corrupto o es inválido
       window.location.href = '/';
       return null;
    }
  }

  // --- Lógica principal de la aplicación ---
  const handleLogin = (name: string) => {
    if (name.trim()) {
      setUserName(name.trim());
      setCompletedChallenges([]);
    }
  };

  const handleLogout = () => {
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
