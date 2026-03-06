import React, { useState, useCallback } from 'react';
import { Player, Duel1v1Matchup, Duel2v2Matchup, Role } from '../types';
import { MOCK_NAMES, CHAMPION_CLASSES, BOTLANE_CHAMPIONS, RoleIcon } from '../constants';
import { shuffleArray, getRandomItems } from '../utils/random';
import { HextechButton } from './HextechButton';
import { AppMode } from '../App';

interface DuelModeProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

export const DuelMode: React.FC<DuelModeProps> = ({ mode, setMode }) => {
  const [players1v1, setPlayers1v1] = useState<string[]>(['', '']);
  const [players2v2, setPlayers2v2] = useState<string[]>(['', '', '', '']);
  
  const [matchup1v1, setMatchup1v1] = useState<Duel1v1Matchup | null>(null);
  const [matchup2v2, setMatchup2v2] = useState<Duel2v2Matchup | null>(null);

  const fillDummy1v1 = () => setPlayers1v1(getRandomItems(MOCK_NAMES, 2));
  const fillDummy2v2 = () => setPlayers2v2(getRandomItems(MOCK_NAMES, 4));

  const generate1v1 = useCallback(() => {
    const validNames = players1v1.map(n => n.trim()).filter(n => n !== '');
    if (validNames.length !== 2) return;

    // Pick a random class
    const classes = Object.keys(CHAMPION_CLASSES) as (keyof typeof CHAMPION_CLASSES)[];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const champsInClass = CHAMPION_CLASSES[randomClass];
    
    const selectedChamps = getRandomItems(champsInClass, 2);
    const shuffledPlayers = shuffleArray(validNames);

    setMatchup1v1({
      player1: { id: `p1-${Date.now()}`, name: shuffledPlayers[0], champion: selectedChamps[0] },
      player2: { id: `p2-${Date.now()}`, name: shuffledPlayers[1], champion: selectedChamps[1] }
    });
  }, [players1v1]);

  const generate2v2 = useCallback(() => {
    const validNames = players2v2.map(n => n.trim()).filter(n => n !== '');
    if (validNames.length !== 4) return;

    const shuffledPlayers = shuffleArray(validNames);
    
    // Assign roles: 0 and 1 are blue team, 2 and 3 are red team
    // 0 is ADC, 1 is Support for Blue
    // 2 is ADC, 3 is Support for Red
    
    const blueTeam: Player[] = [
      { id: `b1-${Date.now()}`, name: shuffledPlayers[0], role: Role.ADC },
      { id: `b2-${Date.now()}`, name: shuffledPlayers[1], role: Role.SUPPORT }
    ];
    
    const redTeam: Player[] = [
      { id: `r1-${Date.now()}`, name: shuffledPlayers[2], role: Role.ADC },
      { id: `r2-${Date.now()}`, name: shuffledPlayers[3], role: Role.SUPPORT }
    ];

    setMatchup2v2({ blueTeam, redTeam });
  }, [players2v2]);

  const resetDuel = () => {
    setMatchup1v1(null);
    setMatchup2v2(null);
  };

  if (mode === 'duel-select') {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 hextech-border shadow-2xl shadow-black/50 backdrop-blur-sm animate-fade-in text-center">
        <h2 className="text-4xl text-[#c8aa6e] mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Sélectionnez le mode de Duel</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <HextechButton variant="primary" onClick={() => setMode('1v1')} className="text-2xl px-12 py-6">
            Duel 1v1
          </HextechButton>
          <HextechButton variant="primary" onClick={() => setMode('2v2')} className="text-2xl px-12 py-6">
            Duel 2v2
          </HextechButton>
        </div>
        <div className="mt-12">
          <HextechButton variant="secondary" onClick={() => setMode('5v5')}>
            Retour au 5v5
          </HextechButton>
        </div>
      </div>
    );
  }

  if (mode === '1v1') {
    if (!matchup1v1) {
      return (
        <div className="w-full max-w-2xl mx-auto p-8 hextech-border shadow-2xl shadow-black/50 backdrop-blur-sm animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-[#c8aa6e] mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Duel 1v1</h2>
            <p className="text-[#a09b8c] text-sm">Entrez les deux invocateurs pour un duel équilibré.</p>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            {players1v1.map((name, index) => (
              <input
                key={`1v1-${index}`}
                type="text"
                value={name}
                onChange={(e) => {
                  const newP = [...players1v1];
                  newP[index] = e.target.value;
                  setPlayers1v1(newP);
                }}
                placeholder={`Invocateur ${index + 1}`}
                className="w-full bg-[#010a13]/80 border border-[#785a28] text-[#f0e6d2] px-4 py-3 focus:outline-none focus:border-[#c8aa6e] focus:ring-1 focus:ring-[#c8aa6e] transition-colors font-bold placeholder-[#785a28]/50 text-center text-xl"
                maxLength={16}
              />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t border-[#785a28]/30">
            <HextechButton variant="secondary" onClick={fillDummy1v1} type="button">Auto</HextechButton>
            <HextechButton variant="primary" onClick={generate1v1} disabled={players1v1.some(p => p.trim() === '')}>Générer le Duel</HextechButton>
            <HextechButton variant="secondary" onClick={() => setMode('duel-select')}>Retour</HextechButton>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-4xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative">
          <div className="flex-1 hextech-border bg-gradient-to-br from-[#005a82]/30 to-[#0a1428]/80 border-t-4 border-[#0ac8b9] p-8 text-center w-full">
            <h3 className="text-3xl text-[#0ac8b9] font-bold mb-4">{matchup1v1.player1.name}</h3>
            <div className="text-xl text-[#f0e6d2] bg-[#010a13]/60 p-4 border border-[#c8aa6e]/30">
              <span className="text-[#a09b8c] text-sm block mb-1 uppercase tracking-widest">Champion</span>
              {matchup1v1.player1.champion}
            </div>
          </div>
          
          <div className="z-20 w-20 h-20 rounded-full bg-[#0a1428] border-4 border-[#c8aa6e] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] shrink-0 my-4 md:my-0">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] to-[#c89b3c] title-font italic pr-1">VS</span>
          </div>

          <div className="flex-1 hextech-border bg-gradient-to-br from-[#7e1618]/30 to-[#0a1428]/80 border-t-4 border-[#e33237] p-8 text-center w-full">
            <h3 className="text-3xl text-[#e33237] font-bold mb-4">{matchup1v1.player2.name}</h3>
            <div className="text-xl text-[#f0e6d2] bg-[#010a13]/60 p-4 border border-[#c8aa6e]/30">
              <span className="text-[#a09b8c] text-sm block mb-1 uppercase tracking-widest">Champion</span>
              {matchup1v1.player2.champion}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-12">
          <HextechButton variant="secondary" onClick={resetDuel}>Nouveau Duel</HextechButton>
          <HextechButton variant="primary" onClick={generate1v1}>Relancer</HextechButton>
        </div>
      </div>
    );
  }

  if (mode === '2v2') {
    if (!matchup2v2) {
      return (
        <div className="w-full max-w-3xl mx-auto p-8 hextech-border shadow-2xl shadow-black/50 backdrop-blur-sm animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-[#c8aa6e] mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Duel 2v2 (Botlane)</h2>
            <p className="text-[#a09b8c] text-sm">Entrez les 4 invocateurs pour générer les duo bot.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {players2v2.map((name, index) => (
              <input
                key={`2v2-${index}`}
                type="text"
                value={name}
                onChange={(e) => {
                  const newP = [...players2v2];
                  newP[index] = e.target.value;
                  setPlayers2v2(newP);
                }}
                placeholder={`Invocateur ${index + 1}`}
                className="w-full bg-[#010a13]/80 border border-[#785a28] text-[#f0e6d2] px-4 py-3 focus:outline-none focus:border-[#c8aa6e] focus:ring-1 focus:ring-[#c8aa6e] transition-colors font-bold placeholder-[#785a28]/50 text-center"
                maxLength={16}
              />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t border-[#785a28]/30">
            <HextechButton variant="secondary" onClick={fillDummy2v2} type="button">Auto</HextechButton>
            <HextechButton variant="primary" onClick={generate2v2} disabled={players2v2.some(p => p.trim() === '')}>Générer le 2v2</HextechButton>
            <HextechButton variant="secondary" onClick={() => setMode('duel-select')}>Retour</HextechButton>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-5xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row gap-8 relative">
          <div className="flex-1 hextech-border bg-gradient-to-br from-[#005a82]/30 to-[#0a1428]/80 border-t-4 border-[#0ac8b9] p-6 text-center">
            <h3 className="text-3xl text-[#0ac8b9] font-bold mb-6 tracking-widest">Duo Bleu</h3>
            <div className="flex flex-col gap-4">
              {matchup2v2.blueTeam.map(p => (
                <div key={p.id} className="bg-[#010a13]/60 p-4 border border-[#c8aa6e]/30 flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-[#1e2328] border border-[rgba(200,170,110,0.3)] text-[#c8aa6e] shadow-inner">
                    <RoleIcon role={p.role!} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[#a09b8c] uppercase tracking-widest text-xs block mb-0.5">{p.role}</span>
                    <span className="text-xl text-[#f0e6d2] font-bold">{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full bg-[#0a1428] border-4 border-[#c8aa6e] items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] to-[#c89b3c] title-font italic pr-1">VS</span>
          </div>

          {/* Mobile VS Badge */}
          <div className="md:hidden flex justify-center py-2">
             <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] to-[#c89b3c] title-font italic">VS</span>
          </div>

          <div className="flex-1 hextech-border bg-gradient-to-br from-[#7e1618]/30 to-[#0a1428]/80 border-t-4 border-[#e33237] p-6 text-center">
            <h3 className="text-3xl text-[#e33237] font-bold mb-6 tracking-widest">Duo Rouge</h3>
            <div className="flex flex-col gap-4">
              {matchup2v2.redTeam.map(p => (
                <div key={p.id} className="bg-[#010a13]/60 p-4 border border-[#c8aa6e]/30 flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-[#1e2328] border border-[rgba(200,170,110,0.3)] text-[#c8aa6e] shadow-inner">
                    <RoleIcon role={p.role!} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[#a09b8c] uppercase tracking-widest text-xs block mb-0.5">{p.role}</span>
                    <span className="text-xl text-[#f0e6d2] font-bold">{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-12">
          <HextechButton variant="secondary" onClick={resetDuel}>Nouveau 2v2</HextechButton>
          <HextechButton variant="primary" onClick={generate2v2}>Relancer</HextechButton>
        </div>
      </div>
    );
  }

  return null;
};
