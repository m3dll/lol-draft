import React from 'react';
import { Player, Role } from '../types';
import { ROLE_ORDER, RoleIcon } from '../constants';
import { HextechButton } from './HextechButton';

interface TeamBoardProps {
  blueTeam: Player[];
  redTeam: Player[];
  onReset: () => void;
  onReroll: () => void;
}

export const TeamBoard: React.FC<TeamBoardProps> = ({ blueTeam, redTeam, onReset, onReroll }) => {
  // Sort teams by standard role order for display
  const sortTeamByRole = (team: Player[]) => {
    return [...team].sort((a, b) => {
      const indexA = ROLE_ORDER.indexOf(a.role as Role);
      const indexB = ROLE_ORDER.indexOf(b.role as Role);
      return indexA - indexB;
    });
  };

  const sortedBlue = sortTeamByRole(blueTeam);
  const sortedRed = sortTeamByRole(redTeam);

  const TeamColumn = ({ team, side, title, colorTheme }: { team: Player[], side: 'Blue' | 'Red', title: string, colorTheme: string }) => {
    const isBlue = side === 'Blue';
    const bgColor = isBlue ? 'bg-gradient-to-br from-[#005a82]/30 to-[#0a1428]/80' : 'bg-gradient-to-br from-[#7e1618]/30 to-[#0a1428]/80';
    const borderColor = isBlue ? 'border-[#0ac8b9]' : 'border-[#e33237]';
    const titleColor = isBlue ? 'text-[#0ac8b9]' : 'text-[#e33237]';
    
    return (
      <div className={`flex-1 hextech-border ${bgColor} border-t-4 ${borderColor} p-6 relative overflow-hidden`}>
        {/* Background decorative element */}
        <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${isBlue ? 'bg-[#0ac8b9]' : 'bg-[#e33237]'} pointer-events-none`}></div>
        
        <h3 className={`text-4xl text-center mb-6 font-bold tracking-widest ${titleColor} drop-shadow-md`}>
          {title}
        </h3>
        
        <div className="flex flex-col gap-3 relative z-10">
          {team.map((player, idx) => (
            <div 
              key={player.id} 
              className={`flex items-center gap-4 p-3 bg-[#010a13]/60 border border-[rgba(200,170,110,0.2)] hover:border-[#c8aa6e]/50 transition-colors backdrop-blur-md group`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded bg-[#1e2328] border border-[rgba(200,170,110,0.3)] text-[#c8aa6e] shadow-inner group-hover:text-[#f0e6d2] group-hover:border-[#c8aa6e] transition-colors`}>
                <RoleIcon role={player.role!} className="w-6 h-6" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-xs uppercase tracking-wider text-[#a09b8c] mb-0.5">{player.role}</div>
                <div className="text-xl font-bold text-[#f0e6d2] truncate drop-shadow-sm">{player.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative">
        
        {/* VS Badge in the center */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 rounded-full bg-[#0a1428] border-4 border-[#c8aa6e] items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] to-[#c89b3c] title-font italic pr-1">VS</span>
        </div>

        <TeamColumn team={sortedBlue} side="Blue" title="Équipe Bleue" colorTheme="blue" />
        
        {/* Mobile VS Badge */}
        <div className="md:hidden flex justify-center py-2">
           <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] to-[#c89b3c] title-font italic">VS</span>
        </div>

        <TeamColumn team={sortedRed} side="Red" title="Équipe Rouge" colorTheme="red" />
      </div>

      <div className="flex justify-center gap-6 mt-12">
        <HextechButton variant="secondary" onClick={onReset}>
          Nouveau Salon
        </HextechButton>
        <HextechButton variant="primary" onClick={onReroll}>
          Relancer la Draft
        </HextechButton>
      </div>
    </div>
  );
};