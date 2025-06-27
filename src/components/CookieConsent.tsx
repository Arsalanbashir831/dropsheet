import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Settings, Shield, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCookieConsent, CookiePreferences } from "@/hooks/use-cookie-consent";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { preferences, hasConsented, updatePreferences } = useCookieConsent();

  useEffect(() => {
    // Show banner if user hasn't consented yet
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, [hasConsented]);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    updatePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    updatePreferences(necessaryOnly);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    updatePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === "necessary") return; // Cannot disable necessary cookies
    updatePreferences({
      ...preferences,
      [category]: value,
    });
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-brand-purple mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    We use cookies to enhance your experience
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    We use cookies and similar technologies to help personalize content, 
                    provide and improve our services, and analyze our traffic. By clicking 
                    "Accept All", you consent to our use of cookies.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>• Necessary cookies are always active</span>
                    <span>• Analytics help us improve our service</span>
                    <span>• Marketing cookies personalize your experience</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Customize
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Cookie Preferences
                    </DialogTitle>
                    <DialogDescription>
                      Manage your cookie preferences. You can change these settings at any time.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 mt-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Label htmlFor="necessary" className="font-medium">Necessary Cookies</Label>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Always Active</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          These cookies are essential for the website to function properly. 
                          They enable basic functions like page navigation and access to secure areas.
                        </p>
                      </div>
                      <Switch
                        id="necessary"
                        checked={preferences.necessary}
                        disabled
                        className="ml-4"
                      />
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Label htmlFor="analytics" className="font-medium">Analytics Cookies</Label>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Optional</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          These cookies help us understand how visitors interact with our website 
                          by collecting and reporting information anonymously.
                        </p>
                      </div>
                      <Switch
                        id="analytics"
                        checked={preferences.analytics}
                        onCheckedChange={(checked) => handlePreferenceChange("analytics", checked)}
                        className="ml-4"
                      />
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Label htmlFor="marketing" className="font-medium">Marketing Cookies</Label>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Optional</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          These cookies are used to track visitors across websites to display 
                          relevant and engaging advertisements.
                        </p>
                      </div>
                      <Switch
                        id="marketing"
                        checked={preferences.marketing}
                        onCheckedChange={(checked) => handlePreferenceChange("marketing", checked)}
                        className="ml-4"
                      />
                    </div>

                    {/* Functional Cookies */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Label htmlFor="functional" className="font-medium">Functional Cookies</Label>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Optional</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          These cookies enable enhanced functionality and personalization, 
                          such as remembering your preferences and settings.
                        </p>
                      </div>
                      <Switch
                        id="functional"
                        checked={preferences.functional}
                        onCheckedChange={(checked) => handlePreferenceChange("functional", checked)}
                        className="ml-4"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
                    <Button 
                      onClick={handleSavePreferences}
                      className="flex-1"
                    >
                      Save Preferences
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSettings(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAcceptNecessary}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Reject All
              </Button>
              
              <Button 
                size="sm" 
                onClick={handleAcceptAll}
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to prevent interaction with page content */}
      <div className="fixed inset-0 bg-black bg-opacity-20 z-40" />
    </>
  );
};

export default CookieConsent; 