import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const Footer = () => {
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const { preferences, updatePreferences } = useCookieConsent();

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === "necessary") return; // Cannot disable necessary cookies
    updatePreferences({
      ...preferences,
      [category]: value,
    });
  };

  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold gradient-text mb-5">SheetDrop</div>
            <p className="text-gray-600 mb-4">
              Automate your email data capture and never copy-paste again.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-purple" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-brand-purple">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-brand-purple">Pricing</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-brand-purple">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-brand-purple">About</a></li>
              <li><Link to={ROUTES.PAGES.PRIVACY} className="text-gray-600 hover:text-brand-purple">Privacy Policy</Link></li>
              <li><Link to={ROUTES.PAGES.TERMS} className="text-gray-600 hover:text-brand-purple">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2023 SheetDrop. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Dialog open={showCookieSettings} onOpenChange={setShowCookieSettings}>
              <DialogTrigger asChild>
                <button className="text-sm text-gray-500 hover:text-brand-purple flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  Cookie Settings
                </button>
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
                        <Label htmlFor="necessary-footer" className="font-medium">Necessary Cookies</Label>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Always Active</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        These cookies are essential for the website to function properly.
                      </p>
                    </div>
                    <Switch
                      id="necessary-footer"
                      checked={preferences.necessary}
                      disabled
                      className="ml-4"
                    />
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Label htmlFor="analytics-footer" className="font-medium">Analytics Cookies</Label>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Optional</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        These cookies help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <Switch
                      id="analytics-footer"
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => handlePreferenceChange("analytics", checked)}
                      className="ml-4"
                    />
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Label htmlFor="marketing-footer" className="font-medium">Marketing Cookies</Label>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Optional</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        These cookies are used to track visitors across websites for advertising.
                      </p>
                    </div>
                    <Switch
                      id="marketing-footer"
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => handlePreferenceChange("marketing", checked)}
                      className="ml-4"
                    />
                  </div>

                  {/* Functional Cookies */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Label htmlFor="functional-footer" className="font-medium">Functional Cookies</Label>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Optional</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        These cookies enable enhanced functionality and personalization.
                      </p>
                    </div>
                    <Switch
                      id="functional-footer"
                      checked={preferences.functional}
                      onCheckedChange={(checked) => handlePreferenceChange("functional", checked)}
                      className="ml-4"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
                  <Button 
                    onClick={() => setShowCookieSettings(false)}
                    className="flex-1"
                  >
                    Save & Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Link to={ROUTES.PAGES.PRIVACY} className="text-sm text-gray-500 hover:text-brand-purple">Privacy Policy</Link>
            <Link to={ROUTES.PAGES.TERMS} className="text-sm text-gray-500 hover:text-brand-purple">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
