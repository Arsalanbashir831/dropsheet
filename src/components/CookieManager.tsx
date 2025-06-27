import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { 
  initializeAnalytics, 
  initializeMarketing, 
  setUserPreferences,
  clearAllCookies 
} from "@/lib/cookie-utils";

interface CookieManagerProps {
  children: React.ReactNode;
}

const CookieManager = ({ children }: CookieManagerProps) => {
  const { hasConsent, hasConsented, preferences } = useCookieConsent();

  useEffect(() => {
    if (!hasConsented) return;

    // Set cookies based on user consent
    if (hasConsent("analytics")) {
      initializeAnalytics();
    }

    if (hasConsent("marketing")) {
      initializeMarketing();
    }

    if (hasConsent("functional")) {
      // Set user preferences cookie
      setUserPreferences({
        theme: 'light',
        language: 'en',
        notifications: true,
        // Add other user preferences as needed
      });
    }

    // Always set necessary cookies (handled by the app itself)
    if (hasConsent("necessary")) {
      // Session cookies, CSRF tokens, etc. are handled by the backend
      console.log("Necessary cookies enabled");
    }
  }, [hasConsent, hasConsented, preferences]);

  return <>{children}</>;
};

export default CookieManager; 