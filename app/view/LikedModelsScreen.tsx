import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CarModel } from '../../types/types';
import ModelCard from '../../components/ModelCard';
import { styles } from '../../styles/styles';

const LikedModels = () => {
  const [likedModels, setLikedModels] = useState<CarModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadLikedModels = async () => {
    try {
      const likedModelsString = await AsyncStorage.getItem('likedModels');
      if (likedModelsString) {
        const models = JSON.parse(likedModelsString);
        setLikedModels(models);
      } else {
        setLikedModels([]);
      }
    } catch (error) {
      console.error('Error, oets met loading liked models:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadLikedModels();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadLikedModels();
  };

  const handleUnlike = async (modelId: number) => {
    const updatedModels = likedModels.filter(model => model.id !== modelId);
    setLikedModels(updatedModels);
    try {
      await AsyncStorage.setItem('likedModels', JSON.stringify(updatedModels));
    } catch (error) {
      console.error('Error bij het updating liked models:', error);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#007AFF"
        />
      }
    >
      {likedModels.length > 0 ? (
        <View style={styles.modelsSection}>
          {likedModels.map(model => (
            <ModelCard 
              key={model.id} 
              model={model} 
              showLikeButton 
              onUnlike={() => handleUnlike(model.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No liked models yet</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default LikedModels;