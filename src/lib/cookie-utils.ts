// Cookie utility functions for GDPR compliance

// Extend Window interface for analytics and marketing
declare global {
  interface Window {
    gtag?: (command: string, action: string, config?: Record<string, string>) => void;
    fbq?: (command: string, action: string) => void;
  }
}

export const setCookie = (name: string, value: string, days: number = 365): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const clearAllCookies = (): void => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    deleteCookie(name);
  }
};

// Analytics cookie management
export const initializeAnalytics = (): void => {
  // Example: Google Analytics initialization
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
};

// Marketing cookie management
export const initializeMarketing = (): void => {
  // Example: Facebook Pixel initialization
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('consent', 'grant');
  }
};

// Functional cookie management
export const setUserPreferences = (preferences: Record<string, unknown>): void => {
  setCookie('user_preferences', JSON.stringify(preferences), 365);
};

export const getUserPreferences = (): Record<string, unknown> | null => {
  const prefs = getCookie('user_preferences');
  if (prefs) {
    try {
      return JSON.parse(prefs);
    } catch (error) {
      console.error('Error parsing user preferences:', error);
      return null;
    }
  }
  return null;
};

// Session management
export const setSessionToken = (token: string): void => {
  setCookie('session_token', token, 1); // 1 day expiry
};

export const getSessionToken = (): string | null => {
  return getCookie('session_token');
};

export const clearSession = (): void => {
  deleteCookie('session_token');
}; 