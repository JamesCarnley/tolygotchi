// Game Constants
export const GAME_CONFIG = {
  // Stat boundaries
  MAX_STAT_VALUE: 100,
  MIN_STAT_VALUE: 0,
  
  // Initial pet stats
  INITIAL_HUNGER: 50,
  INITIAL_HAPPINESS: 80,
  INITIAL_HEALTH: 100,
  
  // Tick timing (in milliseconds)
  CLOCK_TICK_INTERVAL: 30000, // 30 seconds
  OFFLINE_TICK_RATE: 60000, // 1 minute for offline calculations
  
  // Stat decay rates per tick
  DECAY_RATES: {
    HUNGER: 2, // Hunger increases (gets worse)
    HAPPINESS: 1, // Happiness decreases
    HEALTH: 0.5, // Health decreases when needs aren't met
  },
  
  // Interaction effects
  FEED_EFFECT: {
    HUNGER: -30, // Reduces hunger
    HAPPINESS: 5, // Small happiness boost
  },
  
  PET_EFFECT: {
    HAPPINESS: 20, // Increases happiness
  },
  
  CLEAN_EFFECT: {
    HEALTH: 25, // Increases health
    HAPPINESS: 5, // Small happiness boost
  },
  
  // Cooldown periods (in milliseconds)
  COOLDOWNS: {
    FEED: 300000, // 5 minutes
    PET: 120000, // 2 minutes
    CLEAN: 600000, // 10 minutes
  },
  
  // Critical thresholds
  CRITICAL_THRESHOLDS: {
    HUNGER: 80, // Hunger above this is critical
    HAPPINESS: 20, // Happiness below this is critical
    HEALTH: 30, // Health below this is critical
  },
};

// Pet appearance variations
export const PET_TRAITS = {
  COLORS: [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEAA7', // Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Gold
  ],
  
  EYE_SHAPES: [
    'round',
    'oval',
    'almond',
    'wide',
    'sleepy',
  ],
  
  MOUTH_SHAPES: [
    'smile',
    'frown',
    'open',
    'surprised',
    'neutral',
  ],
};

// Solana configuration
export const SOLANA_CONFIG = {
  NETWORK: 'devnet', // Change to 'mainnet-beta' for production
  RPC_ENDPOINT: 'https://api.devnet.solana.com',
  
  // Token configuration
  TOLYFOOD_TOKEN: {
    // TODO: Add actual token mint address after deployment
    MINT_ADDRESS: '', 
    DECIMALS: 0,
    SYMBOL: 'TOLYFOOD',
    NAME: 'Tolygotchi Food',
  },
  
  // Faucet configuration
  FAUCET: {
    AMOUNT: 10, // Amount of TOLYFOOD to give per faucet claim
    COOLDOWN: 3600000, // 1 hour in milliseconds
  },
};

// UI Constants
export const UI_CONFIG = {
  // Colors
  COLORS: {
    PRIMARY: '#4ECDC4',
    SECONDARY: '#45B7D1',
    ACCENT: '#FF6B6B',
    SUCCESS: '#27AE60',
    WARNING: '#F39C12',
    DANGER: '#E74C3C',
    BACKGROUND: '#F8F9FA',
    TEXT_PRIMARY: '#2C3E50',
    TEXT_SECONDARY: '#7F8C8D',
    WHITE: '#FFFFFF',
    BORDER: '#E1E8ED',
  },
  
  // Spacing
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
  
  // Font sizes
  FONT_SIZES: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 24,
    XXL: 28,
  },
  
  // Border radius
  BORDER_RADIUS: {
    SM: 4,
    MD: 8,
    LG: 12,
    XL: 20,
    ROUND: 999,
  },
};

// Storage keys
export const STORAGE_KEYS = {
  PET_STATS: 'tolygotchi_pet_stats',
  USER_SETTINGS: 'tolygotchi_user_settings',
  WALLET_ADDRESS: 'tolygotchi_wallet_address',
  SELECTED_NFT: 'tolygotchi_selected_nft',
  LAST_FAUCET_CLAIM: 'tolygotchi_last_faucet_claim',
};

// Animation durations (in milliseconds)
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  BOUNCE_DURATION: 1000,
  WIGGLE_DURATION: 800,
};
