import React from 'react';
import { HextechButton } from './HextechButton';

interface PlayerInputFormProps {
  players: string[];
  setPlayers: (players: string[]) => void;
  onGenerate: () => void;
  onFillDummy: () => void;
}

export const PlayerInputForm: React.FC<PlayerInputFormProps> = ({ 
  players, 
  setPlayers, 
  onGenerate,
  onFillDummy
}) => {
  const handleNameChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const isComplete = players.every(p => p.trim() !== '');

  return (
    <div className="w-full max-w-4xl mx-auto p-8 hextech-border shadow-2xl shadow-black/50 backdrop-blur-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl text-[#c8aa6e] mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Entrez les Invocateurs</h2>
        <p className="text-[#a09b8c] text-sm">Rassemblez vos 10 champions avant d'entrer dans la faille.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
        {players.map((name, index) => (
          <div key={`player-${index}`} className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#785a28] font-bold text-sm w-5 text-right">
              {index + 1}.
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder={`Invocateur ${index + 1}`}
              className="w-full bg-[#010a13]/80 border border-[#785a28] text-[#f0e6d2] px-4 py-3 pl-10 focus:outline-none focus:border-[#c8aa6e] focus:ring-1 focus:ring-[#c8aa6e] transition-colors font-bold placeholder-[#785a28]/50"
              maxLength={16}
            />
            <div className="absolute inset-0 pointer-events-none border border-[#c8aa6e] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t border-[#785a28]/30">
        <HextechButton 
          variant="secondary" 
          onClick={onFillDummy}
          type="button"
        >
          Remplissage Auto
        </HextechButton>
        <HextechButton 
          variant="primary" 
          onClick={onGenerate}
          disabled={!isComplete}
          className="text-lg px-12"
        >
          Créer les Équipes
        </HextechButton>
      </div>
    </div>
  );
};