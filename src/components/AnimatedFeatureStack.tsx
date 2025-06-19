
import { useState, useEffect } from "react";
import { Zap, DollarSign, Mail, Clock, Table, Database } from "lucide-react";

const AnimatedFeatureStack = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-brand-purple" />,
      title: "All-Platform Order Sync",
      description: "Automatically capture orders from Shopify, Etsy, Amazon, WooCommerce, PayPal, Square — all in one organized sheet.",
      badge: "Save 8+ hours/week",
      color: "purple"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      title: "Smart Revenue Tracking", 
      description: "Extract order amounts, customer details, and payment info automatically. Never lose track of a sale again.",
      badge: "Prevent $500+ in missed orders",
      color: "green"
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Customer Inquiry Manager",
      description: "Auto-log customer questions, return requests, and support emails so you never miss a follow-up.",
      badge: "Improve response time by 75%",
      color: "blue"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Set-and-Forget Automation",
      description: "Works 24/7 in the background. Choose real-time sync or schedule updates to match your workflow.",
      badge: "Zero ongoing maintenance",
      color: "orange"
    },
    {
      icon: <Table className="w-6 h-6 text-indigo-600" />,
      title: "One-Click Google Sheets",
      description: "Connect your existing spreadsheets instantly. No complex setup, no coding required.",
      badge: "Setup in under 3 minutes",
      color: "indigo"
    },
    {
      icon: <Database className="w-6 h-6 text-emerald-600" />,
      title: "Anti-Subscription Promise",
      description: "Pay once, own forever. No monthly fees eating your profits like expensive automation platforms.",
      badge: "Save $2,400/year vs Zapier",
      color: "emerald"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % features.length;
        setVisibleFeatures(prev => [...prev, nextIndex].slice(-3)); // Keep last 3 visible
        return nextIndex;
      });
    }, 1500);

    // Initialize with first feature
    setVisibleFeatures([0]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] w-full max-w-md mx-auto overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center space-y-4">
        {features.map((feature, index) => {
          const isVisible = visibleFeatures.includes(index);
          const isCurrent = index === currentIndex;
          const position = visibleFeatures.indexOf(index);
          
          return (
            <div
              key={index}
              className={`absolute w-full transition-all duration-700 transform ${
                isVisible
                  ? `opacity-100 translate-y-0 ${
                      position === 0 ? 'scale-75 z-10' : 
                      position === 1 ? 'scale-90 z-20' : 
                      'scale-100 z-30'
                    }`
                  : 'opacity-0 translate-y-8 scale-95 z-0'
              }`}
              style={{
                top: isVisible ? `${position * 80}px` : '100%'
              }}
            >
              <div className={`bg-white p-6 rounded-xl border-2 shadow-lg relative group ${
                isCurrent ? `border-${feature.color}-500 animate-pulse` : 'border-gray-200'
              }`}>
                {/* Animated Badge */}
                <div className={`absolute -top-3 -right-3 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 text-white px-3 py-1 rounded-full text-xs font-bold ${
                  isCurrent ? 'animate-bounce' : ''
                }`}>
                  {feature.badge}
                </div>
                
                <div className={`w-12 h-12 flex items-center justify-center bg-${feature.color}/10 rounded-lg mb-4 ${
                  isCurrent ? 'animate-pulse' : ''
                }`}>
                  {feature.icon}
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  isCurrent ? `text-${feature.color}-700` : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Progress indicator */}
                {isCurrent && (
                  <div className="absolute bottom-2 left-6 right-6">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`bg-${feature.color}-500 h-1 rounded-full transition-all duration-1500 ease-linear`}
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedFeatureStack;
