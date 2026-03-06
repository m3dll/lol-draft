import React, { useState, useCallback } from 'react';
import { Player, Role, TeamMatchup } from './types';
import { ROLE_ORDER, MOCK_NAMES } from './constants';
import { shuffleArray, getRandomItems } from './utils/random';
import { PlayerInputForm } from './components/PlayerInputForm';
import { TeamBoard } from './components/TeamBoard';
import { DuelMode } from './components/DuelMode';

export type AppMode = '5v5' | 'duel-select' | '1v1' | '2v2';

function App() {
  const [mode, setMode] = useState<AppMode>('5v5');
  const [playerNames, setPlayerNames] = useState<string[]>(Array(10).fill(''));
  const [matchup, setMatchup] = useState<TeamMatchup | null>(null);

  const fillDummyNames = useCallback(() => {
    const randomNames = getRandomItems<string>(MOCK_NAMES, 10);
    setPlayerNames(randomNames);
  }, []);

  const generateMatchup = useCallback(() => {
    const validNames: string[] = playerNames.map(n => n.trim()).filter(n => n !== '');
    if (validNames.length !== 10) return; // Guard clause, though button should be disabled

    // 1. Shuffle players
    const shuffledPlayers = shuffleArray<string>(validNames);

    // 2. Split into two teams of 5
    const blueNames = shuffledPlayers.slice(0, 5);
    const redNames = shuffledPlayers.slice(5, 10);

    // 3. Assign random roles
    const generateTeamWithRoles = (names: string[]): Player[] => {
      const shuffledRoles = shuffleArray<Role>([...ROLE_ORDER]);
      return names.map((name, index) => ({
        id: `player-${name}-${Date.now()}-${index}`,
        name,
        role: shuffledRoles[index]
      }));
    };

    setMatchup({
      blueTeam: generateTeamWithRoles(blueNames),
      redTeam: generateTeamWithRoles(redNames)
    });
  }, [playerNames]);

  const handleReset = () => {
    setMatchup(null);
    setPlayerNames(Array(10).fill(''));
  };

  const getTitle = () => {
    switch (mode) {
      case '1v1': return 'Duel 1v1';
      case '2v2': return 'Duel 2v2';
      case 'duel-select': return 'Mode Duel';
      default: return '5v5 Generator';
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0a1428] to-transparent pointer-events-none z-0 opacity-50"></div>
      
      <header className="py-12 relative z-10 text-center">
        <h1 
          className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] cursor-pointer hover:scale-105 transition-transform inline-block"
          onClick={() => setMode('5v5')}
          title="Retour à l'accueil"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] via-[#c8aa6e] to-[#785a28]">
            {getTitle()}
          </span>
        </h1>
        <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent mb-2"></div>
        <p className="text-[#a09b8c] tracking-widest text-sm uppercase">Générateur de customs pour les zgeg</p>
      </header>

      <main className="flex-1 relative z-10 px-4 pb-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        {mode === '5v5' ? (
          !matchup ? (
            <div className="w-full max-w-4xl animate-[fadeIn_0.5s_ease-out]">
              <PlayerInputForm 
                players={playerNames} 
                setPlayers={setPlayerNames}
                onGenerate={generateMatchup}
                onFillDummy={fillDummyNames}
              />
            </div>
          ) : (
            <TeamBoard 
              blueTeam={matchup.blueTeam} 
              redTeam={matchup.redTeam}
              onReset={handleReset}
              onReroll={generateMatchup}
            />
          )
        ) : (
          <DuelMode mode={mode} setMode={setMode} />
        )}
      </main>

      {/* Mode Switch Button (Bottom Left) */}
      {mode === '5v5' ? (
        <button 
          onClick={() => setMode('duel-select')}
          className="fixed bottom-6 left-6 z-50 bg-[#010a13]/80 border border-[#c8aa6e] text-[#c8aa6e] px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#c8aa6e]/20 hover:text-[#f0e6d2] transition-colors shadow-[0_0_15px_rgba(200,170,110,0.2)]"
        >
          Mode Duel
        </button>
      ) : (
        <button 
          onClick={() => setMode('5v5')}
          className="fixed bottom-6 left-6 z-50 bg-[#010a13]/80 border border-[#c8aa6e] text-[#c8aa6e] px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#c8aa6e]/20 hover:text-[#f0e6d2] transition-colors shadow-[0_0_15px_rgba(200,170,110,0.2)] flex items-center gap-2"
        >
          <span>←</span> Accueil 5v5
        </button>
      )}

      {/* Tailwind custom animations config inline for simplicity */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}

export default App;