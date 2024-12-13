import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { Brand, CarModel } from '../types/types';
import ModelCard from '../components/ModelCard';
import AddModelModal from '../components/ModelModal';
import { styles } from '../styles/styles';

const BrandDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const loadBrandAndModels = async () => {
    setLoading(true);
    try {
      const [brandResponse, modelsResponse] = await Promise.all([
        fetch(`https://sampleapis.assimilate.be/car/brands/${id}`, {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMjQ1MkBhcC5iZSIsImlhdCI6MTczNDA0NDk3NX0.pDvBnYbJNf3lZ0kZPHdzCHuJHS7-K1q39KNiCchS7I0`
          }
        }),
        fetch(`https://sampleapis.assimilate.be/car/models?brand_id=${id}`, {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMjQ1MkBhcC5iZSIsImlhdCI6MTczNDA0NDk3NX0.pDvBnYbJNf3lZ0kZPHdzCHuJHS7-K1q39KNiCchS7I0`
          }
        })
      ]);

      const brandData = await brandResponse.json();
      const modelsData = await modelsResponse.json();

      setBrand(brandData);
      setModels(modelsData);
    } catch (error) {
      console.error('Error loading brand details:', error);
     
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrandAndModels();
  }, [id]);

  const handleModelCreated = () => {
    loadBrandAndModels();
  };

  const handleWebsitePress = async () => {
    if (brand?.website) {
      try {
        await Linking.openURL(brand.website);
      } catch (error) {
        Alert.alert('Error', 'Could not open website');
      }
    }
  };

  if (loading || !brand) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1a202c" />
        </TouchableOpacity>

        <View style={styles.brandHeader}>
          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: brand.logo }}
              style={styles.brandDetailLogo}
              resizeMode="contain"
            />
            <View style={styles.logoUnderline} />
          </View>
          <Text style={styles.brandDetailName}>{brand.name}</Text>
          <TouchableOpacity
            style={styles.websiteButton}
            onPress={handleWebsitePress}
          >
            <MaterialIcons name="public" size={24} color="#007AFF" />
            <Text style={styles.websiteButtonText}>Visit Website</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.brandInfo}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Founded</Text>
              <Text style={styles.infoValue}>{brand.founded}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Country</Text>
              <Text style={styles.infoValue}>{brand.country}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Headquarters</Text>
              <Text style={styles.infoValue}>{brand.city.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.modelsSection}>
          <View style={[styles.sectionHeader, { 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
          }]}>
            <Text style={styles.sectionTitle}>Models</Text>
            <TouchableOpacity
              style={styles.addModelButton}
              onPress={() => setIsModalVisible(true)}
            >
              <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {models.length > 0 ? (
            models.map(model => (
              <ModelCard key={model.id} model={model} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No models available</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <AddModelModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        brandId={parseInt(id)}
        onSuccess={handleModelCreated}
      />
    </SafeAreaView>
  );
};

export default BrandDetail;