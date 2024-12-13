import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CarModel } from '../types/types';
import { styles } from '../styles/styles';

interface ModelCardProps {
  model: CarModel;
  showLikeButton?: boolean;
  onUnlike?: () => void;
}

const ModelCard = ({ model, showLikeButton = true, onUnlike }: ModelCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, []);

  const checkIfLiked = async () => {
    try {
      const likedModelsString = await AsyncStorage.getItem('likedModels');
      if (likedModelsString) {
        const likedModels: CarModel[] = JSON.parse(likedModelsString);
        setIsLiked(likedModels.some(m => m.id === model.id));
      }
    } catch (error) {
      console.error('Error checking liked status:', error);
    }
  };

  const toggleLike = async () => {
    try {
      const likedModelsString = await AsyncStorage.getItem('likedModels');
      let likedModels: CarModel[] = likedModelsString ? JSON.parse(likedModelsString) : [];
      
      if (isLiked) {
        likedModels = likedModels.filter(m => m.id !== model.id);
        if (onUnlike) {
          onUnlike();
        }
      } else {
        // Check if model already exists to prevent duplicates
        if (!likedModels.some(m => m.id === model.id)) {
          likedModels.push(model);
        }
      }
      
      await AsyncStorage.setItem('likedModels', JSON.stringify(likedModels));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <View style={styles.modelCard}>
      <View style={styles.modelHeader}>
        <Text style={styles.modelName}>{model.name}</Text>
        <View style={styles.modelHeaderRight}>
          <Text style={styles.modelYear}>{model.year}</Text>
          {showLikeButton && (
            <TouchableOpacity 
              onPress={toggleLike}
              style={styles.likeButton}
            >
              <FontAwesome5 
                name="heart"
                size={24} 
                color={isLiked ? "#007AFF" : "#718096"}
                solid={isLiked}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.modelSpecs}>
        <View style={styles.specRow}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Type</Text>
            <Text style={styles.specValue}>{model.type}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Fuel</Text>
            <Text style={styles.specValue}>{model.fuel_type}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Transmission</Text>
            <Text style={styles.specValue}>{model.transmission}</Text>
          </View>
        </View>

        <View style={styles.specRow}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Top Speed</Text>
            <Text style={styles.specValue}>{model.top_speed_kmh} km/h</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>0-100 km/h</Text>
            <Text style={styles.specValue}>{model.acceleration_0_to_100_kmh}s</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Power</Text>
            <Text style={styles.specValue}>{model.horsepower} hp</Text>
          </View>
        </View>

        <View style={styles.specRow}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Seats</Text>
            <Text style={styles.specValue}>{model.seating_capacity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ModelCard;