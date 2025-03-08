'use client';

import { useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, push, onValue } from 'firebase/database';

export default function TestFirebase() {
  useEffect(() => {
    // Test write
    const testMessage = {
      text: 'Test message',
      timestamp: Date.now(),
      color: '#FF0000'
    };

    const messagesRef = ref(database, 'messages');
    push(messagesRef, testMessage)
      .then(() => console.log('Test message sent successfully'))
      .catch((error) => console.error('Error sending test message:', error));

    // Test read
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      console.log('Received messages:', snapshot.val());
    });

    return () => unsubscribe();
  }, []);

  return <div>Check console for Firebase test results</div>;
} 