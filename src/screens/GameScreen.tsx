import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Pet } from '../components/Pet';
import { StatusBar } from '../components/StatusBar';
import { InteractionButton } from '../components/InteractionButton';
import { usePetState } from '../hooks/usePetState';

const { width, height } = Dimensions.get('window');

export const GameScreen: React.FC = () => {
  const { petStats, feedPet, petPet, cleanPet } = usePetState();

  const handleFeed = () => {
    feedPet();
  };

  const handlePet = () => {
    petPet();
  };

  const handleClean = () => {
    cleanPet();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tolygotchi</Text>
      </View>

      {/* Pet Display Area */}
      <View style={styles.petContainer}>
        <Pet 
          hunger={petStats.hunger}
          happiness={petStats.happiness}
          health={petStats.health}
        />
      </View>

      {/* Status Bars */}
      <View style={styles.statusContainer}>
        <StatusBar
          label="Hunger"
          value={petStats.hunger}
          maxValue={100}
          color="#FF6B6B"
        />
        <StatusBar
          label="Happiness"
          value={petStats.happiness}
          maxValue={100}
          color="#4ECDC4"
        />
        <StatusBar
          label="Health"
          value={petStats.health}
          maxValue={100}
          color="#45B7D1"
        />
      </View>

      {/* Interaction Buttons */}
      <View style={styles.buttonContainer}>
        <InteractionButton
          title="Feed"
          onPress={handleFeed}
          icon="🍎"
        />
        <InteractionButton
          title="Pet"
          onPress={handlePet}
          icon="❤️"
        />
        <InteractionButton
          title="Clean"
          onPress={handleClean}
          icon="🧽"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  petContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  statusContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});
