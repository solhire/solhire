import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, connectDatabaseEmulator, ref, onValue, set, get, Database, goOnline, goOffline } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://solhire-a0903-default-rtdb.firebaseio.com/",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase with error handling
let app: any = null;
// Initialize with a placeholder that will be replaced in the try block
let database = {} as Database;
let storage: any = null;
let isInitialized = false;

try {
  console.log("Initializing Firebase with config:", {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? "[REDACTED]" : undefined,
    appId: firebaseConfig.appId ? "[REDACTED]" : undefined,
  });
  
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  database = getDatabase(app);
  storage = getStorage(app);
  isInitialized = true;
  
  // Set up connection monitoring
  const connectedRef = ref(database, '.info/connected');
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      console.log('Connected to Firebase');
      // Update a last_online status or perform other connected actions
      const statusRef = ref(database, 'connection_status');
      set(statusRef, {
        status: 'online',
        timestamp: Date.now()
      }).catch(error => {
        console.error('Error updating online status:', error);
      });
    } else {
      console.log('Disconnected from Firebase');
    }
  });

  // Test connection by writing to a test node
  const testConnectionRef = ref(database, 'connection_test');
  set(testConnectionRef, {
    timestamp: Date.now(),
    status: 'online'
  }).catch(error => {
    console.error('Firebase connection test failed:', error);
  });
  
  // Handle online/offline events
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      console.log('Browser went online');
      if (isInitialized) {
        goOnline(database);
      }
    });
    
    window.addEventListener('offline', () => {
      console.log('Browser went offline');
      if (isInitialized) {
        goOffline(database);
      }
    });
  }
  
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Fallback to prevent app crashes
  if (!app) app = {} as any;
  // Database is already initialized with a placeholder
  if (!storage) storage = {} as any;
}

/**
 * Force reconnection to Firebase
 */
export const reconnectToFirebase = () => {
  if (isInitialized) {
    try {
      // Go offline and then online to force a reconnection
      goOffline(database);
      setTimeout(() => {
        goOnline(database);
        console.log('Forced Firebase reconnection');
      }, 1000);
      return true;
    } catch (error) {
      console.error('Error reconnecting to Firebase:', error);
      return false;
    }
  }
  return false;
};

export { database, storage }; 