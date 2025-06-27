import { useState, useEffect } from "react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
        setHasConsented(true);
      } catch (error) {
        console.error("Error parsing saved cookie preferences:", error);
      }
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences));
    setHasConsented(true);
  };

  const hasConsent = (category: keyof CookiePreferences): boolean => {
    return preferences[category];
  };

  const clearConsent = () => {
    localStorage.removeItem("cookie-consent");
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
    setHasConsented(false);
  };

  return {
    preferences,
    hasConsented,
    updatePreferences,
    hasConsent,
    clearConsent,
  };
}; 