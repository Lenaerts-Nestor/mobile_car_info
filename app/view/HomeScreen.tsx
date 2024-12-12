import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  ActivityIndicator, 
  ScrollView, 
  SafeAreaView,
  Animated,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import { Brand } from '../types/types';
import BrandCard from '../components/BrandCard';
import { styles } from '../styles/styles';

// Define our HomeScreen component
const HomeScreen = () => {
  // State management for our data and loading states
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Create an animated value for handling scroll animations
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);
  
  // Create a translation animation for the header
  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  // Function to load brands data from the API
  const loadBrands = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await fetch('https://sampleapis.assimilate.be/car/brands', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMjQ1MkBhcC5iZSIsImlhdCI6MTczNDA0NDk3NX0.pDvBnYbJNf3lZ0kZPHdzCHuJHS7-K1q39KNiCchS7I0`,
          'Content-Type': 'application/json'
        }
      });
      const brandsResponse = await response.json();
      setBrands(brandsResponse);
    } catch (error) {
      console.log("HIER IS EEN ERRORAAKL'JS");
    }
    if (showLoading) setLoading(false);
    setRefreshing(false);
  };

  // Load brands when component mounts
  useEffect(() => {
    loadBrands();
  }, []);

  // Handle pull-to-refresh functionality
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadBrands(false);
  }, []);

  // Handle card press events
  const handleCardPress = (brandId: number) => {
    console.log('Brand pressed:', brandId);
    // Navigation logic can be added here
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Main render of the home screen
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Animated header that hides on scroll */}
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <Text style={styles.headerTitle}>Car Brands</Text>
      </Animated.View>

      {/* Main scrollable content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
          />
        }
      >
        {/* Brands list container */}
        <View style={styles.cardsContainer}>
          {brands.map((brand) => (
            <TouchableOpacity 
              key={brand.id}
              activeOpacity={0.7}
              onPress={() => handleCardPress(brand.id)}
              style={styles.cardWrapper}
            >
              <BrandCard brand={brand} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;