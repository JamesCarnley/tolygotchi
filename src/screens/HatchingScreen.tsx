import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

interface NFTItem {
  id: string;
  name: string;
  image: string;
  metadata: any;
}

export const HatchingScreen: React.FC = () => {
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNft, setSelectedNft] = useState<NFTItem | null>(null);

  useEffect(() => {
    loadUserNFTs();
  }, []);

  const loadUserNFTs = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual NFT fetching using Metaplex Umi
      // For now, we'll use mock data
      const mockNFTs: NFTItem[] = [
        {
          id: '1',
          name: 'Mock NFT 1',
          image: 'https://via.placeholder.com/150',
          metadata: { attributes: [] }
        },
        {
          id: '2',
          name: 'Mock NFT 2',
          image: 'https://via.placeholder.com/150',
          metadata: { attributes: [] }
        }
      ];
      
      setNfts(mockNFTs);
    } catch (error) {
      console.error('Error loading NFTs:', error);
      Alert.alert('Error', 'Failed to load your NFTs');
    } finally {
      setLoading(false);
    }
  };

  const handleNFTSelect = (nft: NFTItem) => {
    setSelectedNft(nft);
  };

  const handleHatchPet = () => {
    if (!selectedNft) {
      Alert.alert('No NFT Selected', 'Please select an NFT to hatch your pet');
      return;
    }

    // TODO: Implement the deterministic pet generation algorithm
    Alert.alert(
      'Pet Hatched!',
      `Your Tolygotchi has been created from ${selectedNft.name}!`,
      [
        {
          text: 'Start Playing',
          onPress: () => {
            // TODO: Navigate to GameScreen
            console.log('Navigate to game screen');
          }
        }
      ]
    );
  };

  const renderNFTItem = ({ item }: { item: NFTItem }) => (
    <TouchableOpacity
      style={[
        styles.nftItem,
        selectedNft?.id === item.id && styles.selectedNftItem
      ]}
      onPress={() => handleNFTSelect(item)}
    >
      <Image source={{ uri: item.image }} style={styles.nftImage} />
      <Text style={styles.nftName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ECDC4" />
          <Text style={styles.loadingText}>Loading your NFTs...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hatch Your Tolygotchi</Text>
        <Text style={styles.subtitle}>Select an NFT to transform into your pet</Text>
      </View>

      <FlatList
        data={nfts}
        renderItem={renderNFTItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.nftGrid}
        showsVerticalScrollIndicator={false}
      />

      {selectedNft && (
        <View style={styles.bottomContainer}>
          <Text style={styles.selectedText}>
            Selected: {selectedNft.name}
          </Text>
          <TouchableOpacity style={styles.hatchButton} onPress={handleHatchPet}>
            <Text style={styles.hatchButtonText}>🥚 Hatch Pet</Text>
          </TouchableOpacity>
        </View>
      )}

      {nfts.length === 0 && !loading && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No NFTs found in your wallet</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={loadUserNFTs}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      )}
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 10,
  },
  nftGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nftItem: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedNftItem: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  nftImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  nftName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
  },
  selectedText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 15,
  },
  hatchButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  hatchButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
