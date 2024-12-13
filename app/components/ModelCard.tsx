import React from 'react';
import { View, Text } from 'react-native';
import { CarModel } from '../types/types';
import { styles } from '../styles/styles';

interface ModelCardProps {
  model: CarModel;
}

const ModelCard = ({ model }: ModelCardProps) => {
  return (
    <View style={styles.modelCard}>
      <View style={styles.modelHeader}>
        <Text style={styles.modelName}>{model.name}</Text>
        <Text style={styles.modelYear}>{model.year}</Text>
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