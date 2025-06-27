
import { useState, useEffect } from "react";
import { Zap, ArrowRight, CheckCircle, Mail, Database } from "lucide-react";

const AnimatedPlatformSync = () => {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [syncStep, setSyncStep] = useState(0);
  const [emailsProcessed, setEmailsProcessed] = useState(0);

  const platforms = [
    { name: "Shopify", color: "green", emails: 24, icon: "🛍️" },
    { name: "Etsy", color: "orange", emails: 18, icon: "🎨" },
    { name: "Amazon", color: "yellow", emails: 31, icon: "📦" },
    { name: "PayPal", color: "blue", emails: 15, icon: "💳" },
    { name: "Square", color: "purple", emails: 12, icon: "💰" },
    { name: "WooCommerce", color: "indigo", emails: 22, icon: "🛒" }
  ];

  const syncSteps = [
    "Scanning Gmail inbox...",
    "Finding platform emails...",
    "Extracting order data...",
    "Organizing information...",
    "Syncing to Google Sheets...",
    "Complete! ✅"
  ];

  useEffect(() => {
    const platformInterval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
      setSyncStep(0);
      setEmailsProcessed(0);
    }, 6000);
    return () => clearInterval(platformInterval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setSyncStep((prev) => {
        if (prev < syncSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);
    return () => clearInterval(stepInterval);
  }, [currentPlatform]);

  useEffect(() => {
    if (syncStep >= 2 && syncStep < 5) {
      const emailInterval = setInterval(() => {
        setEmailsProcessed((prev) => {
          const target = platforms[currentPlatform].emails;
          if (prev < target) {
            return prev + 1;
          }
          return target;
        });
      }, 100);
      return () => clearInterval(emailInterval);
    }
  }, [syncStep, currentPlatform]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">📧 Track Emails From Every Platform</h3>
        <p className="text-gray-600">SheetDrop finds and extracts data from emails sent by these platforms</p>
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {platforms.map((platform, index) => (
          <div
            key={platform.name}
            className={`relative p-4 rounded-lg border-2 transition-all duration-500 transform ${
              currentPlatform === index
                ? `border-${platform.color}-500 bg-white shadow-lg scale-110 animate-pulse`
                : 'border-gray-200 bg-white/50 scale-100'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2 animate-bounce">{platform.icon}</div>
              <div className={`font-medium text-sm ${
                currentPlatform === index ? `text-${platform.color}-700` : 'text-gray-600'
              }`}>
                {platform.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {currentPlatform === index ? emailsProcessed : platform.emails} emails found
              </div>
            </div>
            
            {currentPlatform === index && (
              <div className="absolute -top-2 -right-2">
                <div className={`w-4 h-4 bg-${platform.color}-500 rounded-full animate-ping`}></div>
                <div className={`absolute top-0 w-4 h-4 bg-${platform.color}-500 rounded-full`}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Email Processing Flow */}
      <div className="bg-white rounded-lg p-6 border shadow-sm">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Gmail Inbox */}
          <div className="text-center">
            <div className="text-4xl mb-3 animate-bounce">📧</div>
            <div className="text-lg font-bold text-blue-700 mb-2">Gmail Inbox</div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Scanning {platforms[currentPlatform].name} emails</span>
              </div>
              <div className={`w-full bg-gray-200 rounded-full h-2`}>
                <div 
                  className={`bg-${platforms[currentPlatform].color}-500 h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${(emailsProcessed / platforms[currentPlatform].emails) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Processing Animation */}
          <div className="flex flex-col justify-center items-center">
            <div className="relative mb-4">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full">
                <div className={`w-16 h-16 border-4 border-${platforms[currentPlatform].color}-500 border-t-transparent rounded-full animate-spin`}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className={`w-6 h-6 text-${platforms[currentPlatform].color}-500 animate-pulse`} />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium text-gray-700 mb-2">
                {syncSteps[syncStep]}
              </div>
              <div className="flex space-x-1 justify-center">
                {syncSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index <= syncStep ? `bg-${platforms[currentPlatform].color}-500` : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Google Sheets Output */}
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <div className="text-lg font-bold text-green-700 mb-2">Google Sheets</div>
            <div className="bg-gray-50 rounded border p-3 text-xs">
              <div className="grid grid-cols-3 gap-1 mb-2 font-medium">
                <div>Platform</div>
                <div>Orders</div>
                <div>Status</div>
              </div>
              {platforms.slice(0, 3).map((platform, index) => (
                <div key={platform.name} className={`grid grid-cols-3 gap-1 py-1 ${
                  index === currentPlatform ? `bg-${platform.color}-50` : ''
                }`}>
                  <div>{platform.name}</div>
                  <div>{index === currentPlatform ? emailsProcessed : platform.emails}</div>
                  <div>
                    {index === currentPlatform && syncStep >= 5 ? (
                      <CheckCircle className="w-3 h-3 text-green-500 inline animate-bounce" />
                    ) : index < currentPlatform ? (
                      <CheckCircle className="w-3 h-3 text-green-500 inline" />
                    ) : (
                      <div className="w-3 h-3 bg-gray-300 rounded-full inline-block"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-blue-600 animate-pulse">122</div>
          <div className="text-sm text-gray-600">Emails scanned today</div>
        </div>
        <div className="text-center bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-green-600 animate-pulse">2.3s</div>
          <div className="text-sm text-gray-600">Avg extraction time</div>
        </div>
        <div className="text-center bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-purple-600 animate-pulse">100%</div>
          <div className="text-sm text-gray-600">Data accuracy</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPlatformSync;
