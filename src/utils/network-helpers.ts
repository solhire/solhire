/**
 * Checks if the browser is online
 * @returns True if the browser reports being online
 */
export function isBrowserOnline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine;
}

/**
 * Checks if the internet is actually reachable by pinging a reliable endpoint
 * @returns A promise that resolves to true if the internet is reachable
 */
export async function checkInternetConnectivity(): Promise<boolean> {
  try {
    // Try to fetch a small resource from a reliable CDN
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.error('Internet connectivity check failed:', error);
    return false;
  }
}

/**
 * Registers callbacks for online/offline events
 * @param onOnline Callback to run when the browser goes online
 * @param onOffline Callback to run when the browser goes offline
 * @returns A function to unregister the event listeners
 */
export function registerConnectivityListeners(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
} 