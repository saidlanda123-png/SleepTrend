import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import { CHALLENGES } from './constants';

// Custom hook para manejar la persistencia del estado en localStorage.
// Centraliza la lógica de lectura/escritura, haciendo el componente más limpio y la persistencia más robusta.
function usePersistentState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null) {
        return initialValue;
      }
      // Intenta parsear como JSON. Si falla, asume que es un string crudo
      // por retrocompatibilidad con el formato antiguo del nombre de usuario.
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

  useEffect(() => {
    try {
      // Ahora siempre guarda como un string JSON para mayor consistencia.
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

  const handleLogin = (name: string) => {
    if (name.trim()) {
      // Si un nuevo usuario inicia sesión, o el mismo "reinicia", se resetea el progreso.
      setUserName(name.trim());
      setCompletedChallenges([]);
    }
  };

  const handleLogout = () => {
    // El hook usePersistentState se encargará de limpiar el localStorage
    // cuando el estado se establezca a sus valores iniciales.
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