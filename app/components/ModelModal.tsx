import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles';

interface AddModelModalProps {
  isVisible: boolean;
  onClose: () => void;
  brandId: number;
  onSuccess: () => void;
}

const AddModelModal = ({ isVisible, onClose, brandId, onSuccess }: AddModelModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Sedan',
    year: new Date().getFullYear().toString(),
    fuel_type: 'Petrol',
    top_speed_kmh: '',
    acceleration_0_to_100_kmh: '',
    horsepower: '',
    transmission: 'Automatic',
    seating_capacity: ''
  });

  const types = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Sports', 'Pickup'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '') &&
           !isNaN(Number(formData.top_speed_kmh)) &&
           !isNaN(Number(formData.acceleration_0_to_100_kmh)) &&
           !isNaN(Number(formData.horsepower)) &&
           !isNaN(Number(formData.seating_capacity));
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Validation Error', 'Please fill in all fields with valid values');
      return;
    }

    setLoading(true);

    const modelData = {
      brand_id: brandId,
      name: formData.name,
      type: formData.type,
      year: parseInt(formData.year),
      fuel_type: formData.fuel_type,
      top_speed_kmh: parseInt(formData.top_speed_kmh),
      acceleration_0_to_100_kmh: parseFloat(formData.acceleration_0_to_100_kmh),
      horsepower: parseInt(formData.horsepower),
      transmission: formData.transmission,
      seating_capacity: parseInt(formData.seating_capacity)
    };

    const headers = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMjQ1MkBhcC5iZSIsImlhdCI6MTczNDEyNTk3MH0.o1WNvyCtDLHsY5V8-HwN1orLGfkG23CO_r6U-a0LZC0`
      },
      body: JSON.stringify(modelData)
    };

    const baseURL = 'https://sampleapis.assimilate.be/car/models/';

    fetch(baseURL, headers)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Model is gecreerd', data);
        Alert.alert('Success', 'Model created successfully');
        onSuccess();
        onClose();
      })
      .catch(error => {
        console.error('Error creating model:', error);
        Alert.alert('Error', 'Failed to create model. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Model</Text>
          
          <ScrollView style={styles.modalScroll}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Model Name</Text>
              <TextInput
                style={styles.textInput}
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder="Enter model name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  {types.map(type => (
                    <Picker.Item key={type} label={type} value={type} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Year</Text>
              <TextInput
                style={styles.textInput}
                value={formData.year}
                onChangeText={(text) => setFormData(prev => ({ ...prev, year: text }))}
                keyboardType="numeric"
                placeholder="Enter year"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fuel Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.fuel_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, fuel_type: value }))}
                >
                  {fuelTypes.map(type => (
                    <Picker.Item key={type} label={type} value={type} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Top Speed (km/h)</Text>
              <TextInput
                style={styles.textInput}
                value={formData.top_speed_kmh}
                onChangeText={(text) => setFormData(prev => ({ ...prev, top_speed_kmh: text }))}
                keyboardType="numeric"
                placeholder="Enter top speed"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>0-100 km/h (seconds)</Text>
              <TextInput
                style={styles.textInput}
                value={formData.acceleration_0_to_100_kmh}
                onChangeText={(text) => setFormData(prev => ({ ...prev, acceleration_0_to_100_kmh: text }))}
                keyboardType="numeric"
                placeholder="Enter acceleration time"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Horsepower</Text>
              <TextInput
                style={styles.textInput}
                value={formData.horsepower}
                onChangeText={(text) => setFormData(prev => ({ ...prev, horsepower: text }))}
                keyboardType="numeric"
                placeholder="Enter horsepower"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Transmission</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.transmission}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, transmission: value }))}
                >
                  {transmissions.map(type => (
                    <Picker.Item key={type} label={type} value={type} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Seating Capacity</Text>
              <TextInput
                style={styles.textInput}
                value={formData.seating_capacity}
                onChangeText={(text) => setFormData(prev => ({ ...prev, seating_capacity: text }))}
                keyboardType="numeric"
                placeholder="Enter seating capacity"
              />
            </View>
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.createButton, !isFormValid() && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddModelModal;