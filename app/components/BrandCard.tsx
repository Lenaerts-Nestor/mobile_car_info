import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Brand } from '../types/types';
import { styles } from '../styles/styles';

interface BrandCardProps {
  brand: Brand;
}

const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <Link href={`./brand/${brand.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.logoContainer}>
              <Image 
                source={{ uri: brand.logo }} 
                style={styles.logo}
                resizeMode="contain"
              />
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
      </TouchableOpacity>
    </Link>
  );
};

export default BrandCard;