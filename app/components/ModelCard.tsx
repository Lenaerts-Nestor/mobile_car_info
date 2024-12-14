import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CarModel } from '../types/types';
import { styles } from '../styles/styles';
import UpdateModelModal from './UpdateModelModal';

interface ModelCardProps {
  model: CarModel;
  showLikeButton?: boolean;
  onUnlike?: () => void;
  onModelUpdated?: () => void;
  onModelDeleted?: () => void;
}

const ModelCard = ({ 
  model, 
  showLikeButton = true, 
  onUnlike,
  onModelUpdated,
  onModelDeleted 
}: ModelCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

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

  const handleDelete = () => {
    Alert.alert(
      'Delete Model',
      'Are you sure you want to delete this model?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`https://sampleapis.assimilate.be/car/models/${model.id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMjQ1MkBhcC5iZSIsImlhdCI6MTczNDA0NDk3NX0.pDvBnYbJNf3lZ0kZPHdzCHuJHS7-K1q39KNiCchS7I0'
                }
              });

              if (response.ok) {
               
                const likedModelsString = await AsyncStorage.getItem('likedModels');
                if (likedModelsString) {
                  const likedModels: CarModel[] = JSON.parse(likedModelsString);
                  const updatedLikedModels = likedModels.filter(m => m.id !== model.id);
                  await AsyncStorage.setItem('likedModels', JSON.stringify(updatedLikedModels));
                }
                
                if (onModelDeleted) {
                  onModelDeleted();
                }
              } else {
                throw new Error('Failed to delete model');
              }
            } catch (error) {
              console.error('Error deleting model:', error);
              Alert.alert('Error', 'Failed to delete model');
            }
          }
        }
      ]
    );
  };

  return (
    <>
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
                  color={isLiked ? "#FF0080" : "gray"}
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

          <View style={styles.modelActions}>
            <TouchableOpacity onPress={() => setIsUpdateModalVisible(true)}>
              <MaterialIcons name="edit" size={24} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <MaterialIcons name="delete" size={24} color="#8b0000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <UpdateModelModal
        isVisible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        model={model}
        onSuccess={() => {
          setIsUpdateModalVisible(false);
          if (onModelUpdated) {
            onModelUpdated();
          }
        }}
      />
    </>
  );
};

export default ModelCard;