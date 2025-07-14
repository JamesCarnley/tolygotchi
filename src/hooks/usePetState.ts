import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PetStats {
  hunger: number;
  happiness: number;
  health: number;
  lastUpdateTime: number;
}

const INITIAL_STATS: PetStats = {
  hunger: 50,
  happiness: 80,
  health: 100,
  lastUpdateTime: Date.now(),
};

const STORAGE_KEY = 'tolygotchi_pet_stats';
const TICK_INTERVAL = 30000; // 30 seconds in milliseconds
const OFFLINE_TICK_RATE = 60000; // 1 minute for offline calculations

// Stat decay rates per tick
const DECAY_RATES = {
  hunger: 2, // Hunger increases (gets worse)
  happiness: 1, // Happiness decreases
  health: 0.5, // Health decreases slowly when other needs aren't met
};

export const usePetState = () => {
  const [petStats, setPetStats] = useState<PetStats>(INITIAL_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load pet stats from storage
  const loadPetStats = useCallback(async () => {
    try {
      const savedStats = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedStats) {
        const parsedStats: PetStats = JSON.parse(savedStats);
        
        // Calculate offline time and apply ticks
        const currentTime = Date.now();
        const offlineTime = currentTime - parsedStats.lastUpdateTime;
        const offlineTicks = Math.floor(offlineTime / OFFLINE_TICK_RATE);
        
        if (offlineTicks > 0) {
          const updatedStats = applyStatDecay(parsedStats, offlineTicks);
          updatedStats.lastUpdateTime = currentTime;
          setPetStats(updatedStats);
          await savePetStats(updatedStats);
        } else {
          setPetStats(parsedStats);
        }
      } else {
        // First time - save initial stats
        await savePetStats(INITIAL_STATS);
        setPetStats(INITIAL_STATS);
      }
    } catch (error) {
      console.error('Error loading pet stats:', error);
      setPetStats(INITIAL_STATS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save pet stats to storage
  const savePetStats = useCallback(async (stats: PetStats) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving pet stats:', error);
    }
  }, []);

  // Apply stat decay over multiple ticks
  const applyStatDecay = (stats: PetStats, ticks: number): PetStats => {
    let newStats = { ...stats };
    
    for (let i = 0; i < ticks; i++) {
      // Hunger increases over time
      newStats.hunger = Math.min(100, newStats.hunger + DECAY_RATES.hunger);
      
      // Happiness decreases over time
      newStats.happiness = Math.max(0, newStats.happiness - DECAY_RATES.happiness);
      
      // Health decreases when other needs are neglected
      if (newStats.hunger > 70 || newStats.happiness < 30) {
        newStats.health = Math.max(0, newStats.health - DECAY_RATES.health * 2);
      } else {
        newStats.health = Math.max(0, newStats.health - DECAY_RATES.health);
      }
    }
    
    return newStats;
  };

  // Clock tick function
  const clockTick = useCallback(() => {
    setPetStats(currentStats => {
      const newStats = applyStatDecay(currentStats, 1);
      newStats.lastUpdateTime = Date.now();
      
      // Save updated stats
      savePetStats(newStats);
      
      return newStats;
    });
  }, [savePetStats]);

  // Pet interaction functions
  const feedPet = useCallback(() => {
    setPetStats(currentStats => {
      const newStats = {
        ...currentStats,
        hunger: Math.max(0, currentStats.hunger - 30),
        happiness: Math.min(100, currentStats.happiness + 5),
        lastUpdateTime: Date.now(),
      };
      
      savePetStats(newStats);
      return newStats;
    });
  }, [savePetStats]);

  const petPet = useCallback(() => {
    setPetStats(currentStats => {
      const newStats = {
        ...currentStats,
        happiness: Math.min(100, currentStats.happiness + 20),
        lastUpdateTime: Date.now(),
      };
      
      savePetStats(newStats);
      return newStats;
    });
  }, [savePetStats]);

  const cleanPet = useCallback(() => {
    setPetStats(currentStats => {
      const newStats = {
        ...currentStats,
        health: Math.min(100, currentStats.health + 25),
        happiness: Math.min(100, currentStats.happiness + 5),
        lastUpdateTime: Date.now(),
      };
      
      savePetStats(newStats);
      return newStats;
    });
  }, [savePetStats]);

  // Initialize and setup clock tick
  useEffect(() => {
    loadPetStats();
    
    // Start the clock tick interval
    intervalRef.current = setInterval(clockTick, TICK_INTERVAL);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loadPetStats, clockTick]);

  // Save stats when app goes to background
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        savePetStats(petStats);
      }
    };

    // Note: In a real app, you'd use AppState from react-native
    // AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [petStats, savePetStats]);

  return {
    petStats,
    isLoading,
    feedPet,
    petPet,
    cleanPet,
    resetPet: () => {
      setPetStats(INITIAL_STATS);
      savePetStats(INITIAL_STATS);
    },
  };
};
