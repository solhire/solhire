import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, connectDatabaseEmulator, ref, onValue, set, get, Database } from 'firebase/database';
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
let app;
let database: Database;
let storage;

try {
  console.log("Initializing Firebase with config:", {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? "[REDACTED]" : undefined,
    appId: firebaseConfig.appId ? "[REDACTED]" : undefined,
  });
  
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  database = getDatabase(app);
  storage = getStorage(app);
  
  // Set up connection monitoring
  const connectedRef = ref(database, '.info/connected');
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      console.log('Connected to Firebase');
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
  
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Fallback to prevent app crashes
  if (!app) app = {} as any;
  if (!database) database = {} as any;
  if (!storage) storage = {} as any;
}

export { database, storage }; 