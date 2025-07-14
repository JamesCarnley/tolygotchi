import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface PetProps {
  hunger: number;
  happiness: number;
  health: number;
}

export const Pet: React.FC<PetProps> = ({ hunger, happiness, health }) => {
  // Determine pet's mood based on stats
  const getPetMood = () => {
    if (happiness < 30) return 'sad';
    if (happiness > 70) return 'happy';
    if (hunger > 70) return 'hungry';
    if (health < 30) return 'sick';
    return 'neutral';
  };

  // Get pet's appearance based on mood
  const getPetAppearance = () => {
    const mood = getPetMood();
    
    switch (mood) {
      case 'happy':
        return {
          body: '🟡', // Happy body color
          eyes: '😊',
          mouth: '😄',
          animation: 'bounce'
        };
      case 'sad':
        return {
          body: '🔵', // Sad body color
          eyes: '😢',
          mouth: '😞',
          animation: 'still'
        };
      case 'hungry':
        return {
          body: '🟠', // Hungry body color
          eyes: '👀',
          mouth: '🤤',
          animation: 'wiggle'
        };
      case 'sick':
        return {
          body: '🟢', // Sick body color
          eyes: '😵',
          mouth: '🤢',
          animation: 'still'
        };
      default:
        return {
          body: '🟡', // Neutral body color
          eyes: '👁️',
          mouth: '😐',
          animation: 'idle'
        };
    }
  };

  const appearance = getPetAppearance();

  return (
    <View style={styles.container}>
      {/* Pet Body - This will be replaced with layered sprites later */}
      <View style={[styles.petBody, styles[appearance.animation as keyof typeof styles] || {}]}>
        <Text style={styles.bodyEmoji}>{appearance.body}</Text>
        
        {/* Pet Face Layer */}
        <View style={styles.faceContainer}>
          <Text style={styles.eyesEmoji}>{appearance.eyes}</Text>
          <Text style={styles.mouthEmoji}>{appearance.mouth}</Text>
        </View>
      </View>

      {/* Pet Name/Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.petName}>Tolygotchi</Text>
        <Text style={styles.moodText}>Mood: {getPetMood()}</Text>
      </View>

      {/* TODO: Replace emojis with actual layered sprite images */}
      {/* The structure is ready for:
          - body.png (base layer)
          - eyes_[mood].png (eye expressions)
          - mouth_[mood].png (mouth expressions)
          - accessories.png (optional decorations)
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  petBody: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    position: 'relative',
  },
  bodyEmoji: {
    fontSize: 80,
    position: 'absolute',
  },
  faceContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyesEmoji: {
    fontSize: 20,
    marginBottom: 5,
  },
  mouthEmoji: {
    fontSize: 16,
  },
  statusContainer: {
    alignItems: 'center',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  moodText: {
    fontSize: 16,
    color: '#7F8C8D',
    textTransform: 'capitalize',
  },
  // Animation styles (these can be enhanced with actual animations later)
  bounce: {
    // TODO: Add bouncing animation
  },
  wiggle: {
    // TODO: Add wiggling animation
  },
  still: {
    // Static state
  },
  idle: {
    // TODO: Add subtle idle animation
  },
});
