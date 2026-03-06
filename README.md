# ⚔️ Générateur de Faille (LOL Draft)

Un outil web interactif et stylisé aux couleurs de l'univers de **League of Legends** (design Hextech) conçu pour faciliter la création de parties personnalisées (customs) entre amis. Fini les débats interminables pour savoir qui va au top ou qui joue avec qui : laissez l'algorithme de la Faille décider pour vous !

## ✨ Fonctionnalités

L'application propose trois modes de jeu principaux pour s'adapter à toutes vos envies de castagne :

### 🛡️ Mode 5v5 (Générateur Classique)
- Entrez les pseudos de **10 joueurs**.
- Le système mélange aléatoirement les joueurs pour former deux équipes équilibrées : **Équipe Bleue** et **Équipe Rouge**.
- **Attribution des rôles** : Chaque joueur se voit assigner un rôle aléatoire (Top, Jungle, Mid, ADC, Support) avec les icônes officielles du jeu.

### ⚔️ Mode Duel 1v1
- Entrez les pseudos de **2 joueurs**.
- Pour garantir un affrontement équitable, le système sélectionne aléatoirement une **classe de champions** (Bruisers, Assassins, Mages, ADCs, ou Tanks).
- Il attribue ensuite un champion différent de cette même classe à chaque joueur (ex: *Zed vs Talon*, ou *Darius vs Garen*).

### 🏹 Mode Duel 2v2 (Botlane)
- Entrez les pseudos de **4 joueurs**.
- Le système crée deux duos pour s'affronter sur la voie du bas.
- Chaque joueur se voit attribuer soit le rôle d'**ADC**, soit le rôle de **Support**.

## 🎨 Design & UI
- **Thème Hextech** : Couleurs officielles (Or, Bleu profond, Rouge Noxien), bordures stylisées et effets de lueur (glow).
- **Typographie** : Utilisation des polices officielles *Beaufort for LOL* (titres) et *Spiegel* (textes).
- **Animations** : Apparitions fluides (fade-in) et transitions interactives au survol.
- **Responsive** : Interface adaptée pour les écrans d'ordinateur et les mobiles (avec badges "VS" dynamiques).

## 🛠️ Technologies Utilisées

- **React 19** (Hooks, Functional Components)
- **TypeScript** (Typage strict des joueurs, rôles et matchups)
- **Tailwind CSS** (Styling utilitaire, animations personnalisées, gradients complexes)
- **Vite** (Bundler ultra-rapide)

## 🚀 Installation & Lancement (Développement)

1. Clonez le dépôt.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. Ouvrez votre navigateur sur `http://localhost:3000`.

## 📝 Notes additionnelles

- Un bouton **"Remplissage Auto"** est disponible dans chaque mode pour tester rapidement l'application avec des noms de joueurs professionnels (Faker, Caps, Uzi, etc.).
- La liste des champions pour les duels 1v1 est facilement modifiable dans le fichier `constants.tsx`.

---
*Générateur de customs pour les vrais guerriers de la Faille.*
