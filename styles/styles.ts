import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

 export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 16,
    height: 60,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  sectionHeader: {
    backgroundColor: 'black',
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    marginTop:5,
    marginHorizontal: 16,
    borderColor: "black",
    borderBottomColor: '#edf2f7',
  },
  sectionHeaderText: {
    fontSize: 26,
    textAlign:"center",
    fontWeight: '600',
    color: 'white',
  
  },
  listFooter: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#718096',
    fontSize: 14,
  },

  cardWrapper: {
    borderRadius: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    width: "auto",
    height: 140,
    borderRadius: 10,
    backgroundColor: '#f7fafc',
    borderColor:"black",
    
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 8,
    
  },
  logo: {
    width: 140,
    height: 130,
   
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 12,
    textAlign: 'center',
  },
  founded: {
    fontSize: 14,
    color: '#718096',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#f7fafc',
    borderRadius: 6,
    marginTop: 8,
  },

  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  brandHeader: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandDetailLogo: {
    width: 140,
    height: 140,
    marginBottom: 8,
    backgroundColor: '#f7fafc',
    padding: 16,
    
  },
  logoUnderline: {
    width: 60,
    height: 4,
    backgroundColor: '#007AFF',
    borderRadius: 2,
    marginTop: 8,
  },
  brandDetailName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    marginTop: 8,
  },
  websiteButtonText: {
    color: '#007AFF',
    marginLeft: 8,
    fontSize: 16,
  },
  brandInfo: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
  
  modelsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  
  modelCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderColor: 'black',
    borderWidth: 1,
    
    padding: 16,
    marginBottom: 16,
    marginTop: 16,
   
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modelName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
  },
  modelYear: {
    fontSize: 16,
    color: '#718096',
  },
  modelSpecs: {
    gap: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  specItem: {
    flex: 1,
  },
  specLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: '500',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#718096',
    textAlign: 'center',
  },
  modelHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  likeButton: {
    padding: 8,
  },
  // Add Model Button styles
  addModelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: '70%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2d3748',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  createButton: {
    backgroundColor: 'green',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: '#007AFF',
  },

  // For dark theme
modelActions: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 16,
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '#FFFFFF',
},

locationContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
mapIconButton: {
  marginLeft: 8,
  padding: 4,
},

MapmodalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
MapmodalContent: {
  width: '90%',
  height: '70%',
  backgroundColor: 'white',
  borderRadius: 20,
  overflow: 'hidden',
  position: 'relative',
},
map: {
  width: '100%',
  height: '100%',
},
closeButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 1,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 8,
},
});