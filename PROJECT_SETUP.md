# Tolygotchi - Solana Tamagotchi Game

A Tamagotchi-style virtual pet game built on React Native with Expo, featuring NFT-to-pet generation using the Solana blockchain.

## 🚀 Project Setup Complete

The project has been successfully initialized with the following structure:

### 📁 Directory Structure
```
src/
├── assets/
│   ├── images/          # Pet sprites and UI assets
│   └── fonts/           # Custom fonts
├── components/          # Reusable React components
│   ├── Pet.tsx         # Main pet display component (layered sprites)
│   ├── StatusBar.tsx   # Stat display with progress bars
│   └── InteractionButton.tsx  # Action buttons (Feed, Pet, Clean)
├── constants/           # Game configuration and constants
│   └── index.ts        # All game constants and configuration
├── hooks/               # Custom React hooks
│   └── usePetState.ts  # Pet state management and clock tick logic
├── screens/             # App screens/pages
│   ├── GameScreen.tsx  # Main gameplay screen
│   └── HatchingScreen.tsx  # NFT selection and pet creation
├── solana/              # Solana blockchain integration
│   └── utils.ts        # NFT fetching and pet generation logic
└── utils/               # Helper utilities
    └── index.ts        # Common utility functions
```

### 📦 Dependencies Installed

**Core Framework:**
- React Native with Expo SDK 53
- TypeScript support

**Solana Integration:**
- `@solana/web3.js` - Core Solana RPC interactions
- `@solana/wallet-adapter-react` - Wallet connection
- `@solana/wallet-adapter-wallets` - Wallet providers
- `@metaplex-foundation/umi` - NFT metadata fetching
- `@metaplex-foundation/umi-bundle-defaults` - UMI defaults

**Storage & Utilities:**
- `@react-native-async-storage/async-storage` - Local data persistence
- `expo-crypto` - SHA-256 hashing for deterministic pet generation

**Web Support (Optional):**
- `react-native-web` - Web compatibility
- `@expo/metro-runtime` - Metro bundler runtime
- `react-dom` - React DOM renderer

### 🎮 Core Features Implemented

1. **Pet State Management**
   - Three core stats: Hunger, Happiness, Health
   - Clock tick system with offline time calculation
   - Persistent storage with AsyncStorage
   - Interactive care actions (Feed, Pet, Clean)

2. **Component Architecture**
   - Modular pet display with layered sprite support
   - Reusable status bars with visual indicators
   - Customizable interaction buttons

3. **Solana Integration Framework**
   - NFT metadata fetching utilities
   - Deterministic pet generation from NFT attributes
   - Hash-based trait mapping system
   - On-chain time verification support

4. **Game Constants & Configuration**
   - Centralized game balance settings
   - UI color scheme and spacing system
   - Stat decay rates and interaction effects
   - Storage keys and animation timings

### 🔄 Current App Flow

1. **App.tsx** → Renders **GameScreen** by default
2. **GameScreen** → Uses `usePetState` hook for pet management
3. **Pet Component** → Displays layered sprite-based pet with mood states
4. **Status Bars** → Show current hunger, happiness, and health levels
5. **Interaction Buttons** → Allow feeding, petting, and cleaning actions

### 🚧 Next Steps / TODO

1. **Implement NFT Integration**
   - Complete Metaplex UMI integration in `src/solana/utils.ts`
   - Add wallet connection flow
   - Implement actual pet generation from NFT metadata

2. **Add Layered Sprite System**
   - Replace emoji placeholders with actual PNG images
   - Implement sprite layering for body, eyes, mouth expressions
   - Add animation states (idle, happy, sad, eating, etc.)

3. **Create SPL Token Integration**
   - Deploy TOLYFOOD token contract using Anchor
   - Implement faucet functionality
   - Add token burning for feeding actions

4. **Enhance UI/UX**
   - Add screen navigation between Game and Hatching screens
   - Implement smooth animations and transitions
   - Add sound effects and haptic feedback

5. **Game Polish**
   - Add pet evolution/growth system
   - Implement background environments
   - Add achievement system
   - Create pet customization options

### 🔧 Development Commands

```bash
# Start development server
npx expo start

# Start with specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Install new dependencies (use expo install for compatibility)
npx expo install [package-name]

# Build for production
npx expo build
```

### 📱 Target Platforms

- **Primary:** Android (Solana Mobile Stack)
- **Secondary:** iOS
- **Development:** Web (for testing)

### 🎨 Art & Assets Strategy

- **Style:** Cute, 3D cartoon, Pixar-inspired aesthetic
- **Generation:** AI image generators (Stable Diffusion) with consistent prompts
- **Animation:** Layered sprite system for maximum flexibility
- **Structure:** Separate PNG files for body parts that can be swapped based on pet state

The project is now ready for development! All core architecture is in place, and you can start by running `npx expo start` to see the basic pet interface in action.
