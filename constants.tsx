import React from 'react';
import { Role } from './types';

export const ROLE_ORDER = [
  Role.TOP,
  Role.JUNGLE,
  Role.MID,
  Role.ADC,
  Role.SUPPORT
];

// Mock names for quick filling
export const MOCK_NAMES = [
  "Faker", "Caps", "Chovy", "ShowMaker", "Rookie",
  "Uzi", "Deft", "Ruler", "Viper", "Gumayusi",
  "Canyon", "Peanut", "Kanavi", "Oner", "Tarzan",
  "Keria", "BeryL", "Ming", "Meiko", "Missing",
  "Zeus", "TheShy", "Bin", "369", "Kiin"
];

export const CHAMPION_CLASSES = {
  Bruisers: ["Darius", "Garen", "Renekton", "Riven", "Fiora", "Jax", "Camille", "Sett", "Mordekaiser", "Aatrox"],
  Assassins: ["Zed", "Talon", "Katarina", "Akali", "Fizz", "Ekko", "Qiyana", "Yone", "Yasuo"],
  Mages: ["Ahri", "Syndra", "Orianna", "Viktor", "Vex", "Xerath", "Lux", "Vel'Koz", "Veigar"],
  ADCs: ["Vayne", "Lucian", "Ezreal", "Jhin", "Kai'Sa", "Caitlyn", "Ashe", "Jinx", "Tristana", "Draven"],
  Tanks: ["Ornn", "Sion", "Malphite", "Maokai", "Shen", "Cho'Gath", "Dr. Mundo", "Tahm Kench"]
};

export const BOTLANE_CHAMPIONS = {
  ADCs: ["Lucian", "Ezreal", "Jhin", "Kai'Sa", "Caitlyn", "Ashe", "Jinx", "Tristana", "Vayne", "Varus", "Xayah", "Aphelios"],
  Supports: ["Thresh", "Leona", "Nautilus", "Lulu", "Janna", "Nami", "Karma", "Pyke", "Blitzcrank", "Morgana", "Rakan", "Braum"]
};

// Role Icons components using official SVG shapes via CSS masks
export const RoleIcon = ({ role, className = "w-6 h-6" }: { role: Role, className?: string }) => {
  let url = "";
  
  // Utilisation des icônes SVG officielles très fiables pour chaque rôle
  switch (role) {
    case Role.TOP:
      url = "https://s-lol-web.op.gg/images/icon/icon-position-top.svg";
      break;
    case Role.JUNGLE:
      url = "https://s-lol-web.op.gg/images/icon/icon-position-jng.svg";
      break;
    case Role.MID:
      url = "https://s-lol-web.op.gg/images/icon/icon-position-mid.svg";
      break;
    case Role.ADC:
      url = "https://s-lol-web.op.gg/images/icon/icon-position-bot.svg";
      break;
    case Role.SUPPORT:
      url = "https://s-lol-web.op.gg/images/icon/icon-position-sup.svg";
      break;
    default:
      return null;
  }

  return (
    <div 
      title={role}
      className={`${className} bg-current inline-block transition-colors`}
      style={{
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center'
      }}
    />
  );
};