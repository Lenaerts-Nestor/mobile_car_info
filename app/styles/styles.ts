import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

 export const styles = StyleSheet.create({
  // Main container styles
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  
  // Header styles
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

  // Scroll and List styles
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  sectionHeader: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    marginHorizontal: 16,
    borderColor: "black",
    borderBottomColor: '#edf2f7',
  },
  sectionHeaderText: {
    fontSize: 16,
    textAlign:"center",
    fontWeight: '600',
    color: 'black',
  
  },
  listFooter: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#718096',
    fontSize: 14,
  },

  // Brand Card styles
  cardWrapper: {
    borderRadius: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
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

  // Back button style
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

  // Brand Detail styles
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
  
  // Models Section styles
  modelsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 16,
  },
  
  // Model Card styles
  modelCard: {
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 16,
    marginBottom: 16,
   
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
});