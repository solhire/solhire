import { ref, push, DatabaseReference, Database } from 'firebase/database';
import { database } from '@/lib/firebase';

/**
 * Sends a message to a Firebase Realtime Database path with retry functionality
 * @param path The database path to send the message to
 * @param data The message data to send
 * @param maxRetries Maximum number of retry attempts
 * @returns A promise that resolves with the message reference if successful
 */
export async function sendMessageWithRetry(
  path: string,
  data: any,
  maxRetries: number = 3
): Promise<{ success: boolean; error?: Error; messageRef?: DatabaseReference }> {
  let retryCount = 0;
  let lastError: Error | undefined;

  while (retryCount <= maxRetries) {
    try {
      // Get reference to the database path
      const dbRef = ref(database as Database, path);
      
      // Push the message data
      const messageRef = await push(dbRef, {
        ...data,
        timestamp: Date.now(), // Ensure timestamp is current
      });
      
      // Return success with the message reference
      return { success: true, messageRef };
    } catch (error) {
      lastError = error as Error;
      console.error(`Error sending message (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);
      retryCount++;
      
      // Wait before retrying (exponential backoff)
      if (retryCount <= maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // All retries failed
  return { success: false, error: lastError };
}

/**
 * Checks if Firebase is connected and ready to use
 * @returns A promise that resolves to true if connected, false otherwise
 */
export async function checkFirebaseConnection(): Promise<boolean> {
  try {
    // Try to write to a test location
    const testRef = ref(database as Database, 'connection_test');
    await push(testRef, {
      timestamp: Date.now(),
      test: true
    });
    return true;
  } catch (error) {
    console.error('Firebase connection check failed:', error);
    return false;
  }
} 