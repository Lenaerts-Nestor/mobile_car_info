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
import { CarModel } from '../types/types';

interface UpdateModelModalProps {
  isVisible: boolean;
  onClose: () => void;
  model: CarModel;
  onSuccess: (updatedModel: CarModel) => void;
}

const UpdateModelModal = ({ isVisible, onClose, model, onSuccess }: UpdateModelModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: model.name,
    type: model.type,
    year: model.year.toString(),
    fuel_type: model.fuel_type,
    top_speed_kmh: model.top_speed_kmh.toString(),
    acceleration_0_to_100_kmh: model.acceleration_0_to_100_kmh.toString(),
    horsepower: model.horsepower.toString(),
    transmission: model.transmission,
    seating_capacity: model.seating_capacity.toString()
  });

  const types = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Sports', 'Pickup'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];

  const handleUpdate = async () => {
    setLoading(true);

    const updatedData = {
      brand_id: model.brand_id,
      name: formData.name || model.name,
      type: formData.type || model.type,
      year: parseInt(formData.year) || model.year,
      fuel_type: formData.fuel_type || model.fuel_type,
      top_speed_kmh: parseInt(formData.top_speed_kmh) || model.top_speed_kmh,
      acceleration_0_to_100_kmh: parseFloat(formData.acceleration_0_to_100_kmh) || model.acceleration_0_to_100_kmh,
      horsepower: parseInt(formData.horsepower) || model.horsepower,
      transmission: formData.transmission || model.transmission,
      seating_capacity: parseInt(formData.seating_capacity) || model.seating_capacity
    };

    try {
      const response = await fetch(`https://sampleapis.assimilate.be/car/models/${model.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMjQ1MkBhcC5iZSIsImlhdCI6MTczNDA0NDk3NX0.pDvBnYbJNf3lZ0kZPHdzCHuJHS7-K1q39KNiCchS7I0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const updatedModel = await response.json();
        Alert.alert('Success', 'Model updated successfully');
        onSuccess(updatedModel);
      } else {
        throw new Error('Failed to update model');
      }
    } catch (error) {
      console.error('Error updating model:', error);
      Alert.alert('Error', 'Failed to update model');
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.modalTitle}>Update Model</Text>
          
          <ScrollView style={styles.modalScroll}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Model Name</Text>
              <TextInput
                style={styles.textInput}
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder={model.name}
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
                placeholder={model.year.toString()}
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
                placeholder={model.top_speed_kmh.toString()}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>0-100 km/h (seconds)</Text>
              <TextInput
                style={styles.textInput}
                value={formData.acceleration_0_to_100_kmh}
                onChangeText={(text) => setFormData(prev => ({ ...prev, acceleration_0_to_100_kmh: text }))}
                keyboardType="numeric"
                placeholder={model.acceleration_0_to_100_kmh.toString()}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Horsepower</Text>
              <TextInput
                style={styles.textInput}
                value={formData.horsepower}
                onChangeText={(text) => setFormData(prev => ({ ...prev, horsepower: text }))}
                keyboardType="numeric"
                placeholder={model.horsepower.toString()}
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
                placeholder={model.seating_capacity.toString()}
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
              style={[styles.modalButton, styles.updateButton]}
              onPress={handleUpdate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Update</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModelModal;