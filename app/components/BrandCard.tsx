import React from 'react';
import { View, Text } from 'react-native';
import { Brand } from '../types/types';
import { styles } from '../styles/styles';

interface BrandCardProps {
  brand: Brand;
}

const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>{brand.name[0]}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.brandName}>{brand.name}</Text>
            <Text style={styles.location}>{brand.city.name}, {brand.country}</Text>
          </View>
          <Text style={styles.founded}>Founded: {brand.founded}</Text>
        </View>
      </View>
    </View>
  );
};

export default BrandCard;