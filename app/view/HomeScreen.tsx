import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, RefreshControl, SectionList, Text } from 'react-native';
import { Brand } from '../../types/types';
import BrandCard from '../../components/BrandCard';
import { styles } from '../../styles/styles';

interface Section {
  title: string;
  data: Brand[];
}

const HomeScreen = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBrands = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await fetch('https://sampleapis.assimilate.be/car/brands', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMjQ1MkBhcC5iZSIsImlhdCI6MTczNDA0NDk3NX0.pDvBnYbJNf3lZ0kZPHdzCHuJHS7-K1q39KNiCchS7I0`
        }
      });
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error loading brands:', error);
    }
    if (showLoading) setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadBrands(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const getSections = () => {
    const groupedBrands = brands.reduce((acc, brand) => {
      const country = brand.country;
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(brand);
      return acc;
    }, {} as Record<string, Brand[]>);

    return Object.entries(groupedBrands).map(([country, data]) => ({
      title: country,
      data: data
    }));
  };

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.listFooter}>
      <Text style={styles.footerText}>{brands.length} brands loaded</Text>
    </View>
  );

  return (
    <SectionList
      sections={getSections()}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <BrandCard brand={item} />
        </View>
      )}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#007AFF"
        />
      }
      stickySectionHeadersEnabled
      contentContainerStyle={styles.scrollContent}
    />
  );
};

export default HomeScreen;