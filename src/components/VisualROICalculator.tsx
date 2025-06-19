
import { useState, useEffect } from "react";
import { DollarSign, Clock, TrendingUp, Zap, ArrowUp, ArrowDown } from "lucide-react";

const VisualROICalculator = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [savingsCounter, setSavingsCounter] = useState(0);

  const metrics = [
    { 
      label: "Hours saved weekly", 
      value: 12, 
      color: "blue", 
      icon: <Clock className="w-6 h-6" />,
      suffix: " hrs"
    },
    { 
      label: "Weekly savings", 
      value: 300, 
      color: "green", 
      icon: <DollarSign className="w-6 h-6" />,
      prefix: "$"
    },
    { 
      label: "Monthly ROI", 
      value: 3120, 
      color: "purple", 
      icon: <TrendingUp className="w-6 h-6" />,
      suffix: "%"
    },
    { 
      label: "Annual savings", 
      value: 15600, 
      color: "red", 
      icon: <Zap className="w-6 h-6" />,
      prefix: "$"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
      setAnimatedValue(0);
      setIsAnimating(true);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const target = metrics[currentMetric].value;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedValue(target);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [currentMetric]);

  useEffect(() => {
    const savingsInterval = setInterval(() => {
      setSavingsCounter(prev => prev + 1);
    }, 100);
    return () => clearInterval(savingsInterval);
  }, []);

  const formatValue = (value: number, index: number) => {
    const metric = metrics[index];
    return `${metric.prefix || ''}${value.toLocaleString()}${metric.suffix || ''}`;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-xl p-8 border border-green-200 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4 animate-bounce">💰 Realistic ROI Calculator</h3>
        <p className="text-gray-600">Honest numbers based on actual user savings</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg p-6 border-2 transition-all duration-700 transform ${
              currentMetric === index
                ? `border-${metric.color}-500 shadow-xl scale-110 animate-pulse`
                : "border-gray-200 scale-100"
            }`}
          >
            <div className={`text-${metric.color}-600 mb-3 flex justify-center transition-all duration-500 ${
              currentMetric === index ? 'animate-bounce' : ''
            }`}>
              {metric.icon}
            </div>
            <div className={`text-3xl font-bold text-${metric.color}-700 mb-2 text-center transition-all duration-300`}>
              {currentMetric === index ? (
                <div className="relative">
                  {formatValue(animatedValue, index)}
                  {isAnimating && (
                    <div className="absolute -top-2 -right-2">
                      <ArrowUp className="w-4 h-4 text-green-500 animate-bounce" />
                    </div>
                  )}
                </div>
              ) : (
                formatValue(metric.value, index)
              )}
            </div>
            <div className="text-sm text-gray-600 text-center">{metric.label}</div>
            {currentMetric === index && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                <div 
                  className={`bg-${metric.color}-500 h-1 rounded-full transition-all duration-2000`}
                  style={{ width: `${(animatedValue / metric.value) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Animated Cost Comparison */}
      <div className="bg-white rounded-lg p-6 border shadow-sm mb-6">
        <h4 className="text-lg font-bold text-center mb-6">💸 Real-Time Cost Comparison</h4>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Work Costs - Animated Counter */}
          <div className="text-center">
            <div className="bg-red-100 rounded-lg p-6 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-transparent animate-pulse"></div>
              <div className="relative z-10">
                <div className="text-red-600 text-4xl font-bold mb-2 flex items-center justify-center">
                  $18,{(50 + (savingsCounter % 100)).toString().padStart(3, '0')}
                  <ArrowUp className="w-6 h-6 ml-2 text-red-500 animate-bounce" />
                </div>
                <div className="text-red-700 font-medium">Growing cost of manual work</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-red-600 bg-red-50 p-2 rounded animate-pulse">
                <span>⏰ Time wasted yearly</span>
                <span className="font-bold">624+ hours</span>
              </div>
              <div className="flex items-center justify-between text-red-600 bg-red-50 p-2 rounded animate-pulse" style={{animationDelay: '0.2s'}}>
                <span>💸 Lost opportunity cost</span>
                <span className="font-bold">$15,600</span>
              </div>
              <div className="flex items-center justify-between text-red-600 bg-red-50 p-2 rounded animate-pulse" style={{animationDelay: '0.4s'}}>
                <span>📈 Subscription alternatives</span>
                <span className="font-bold">$2,400/year</span>
              </div>
            </div>
          </div>

          {/* SheetDrop Solution - Static but emphasized */}
          <div className="text-center">
            <div className="bg-green-100 rounded-lg p-6 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <div className="text-green-600 text-4xl font-bold mb-2 flex items-center justify-center">
                  $50
                  <div className="ml-2 flex flex-col">
                    <ArrowDown className="w-4 h-4 text-green-600" />
                    <span className="text-xs">FIXED</span>
                  </div>
                </div>
                <div className="text-green-700 font-medium">One-time SheetDrop investment</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-green-600 bg-green-50 p-2 rounded transform hover:scale-105 transition-transform">
                <span>✅ Lifetime access</span>
                <span className="font-bold">Forever</span>
              </div>
              <div className="flex items-center justify-between text-green-600 bg-green-50 p-2 rounded transform hover:scale-105 transition-transform">
                <span>🚀 Setup time</span>
                <span className="font-bold">3 minutes</span>
              </div>
              <div className="flex items-center justify-between text-green-600 bg-green-50 p-2 rounded transform hover:scale-105 transition-transform">
                <span>💰 First-year ROI</span>
                <span className="font-bold">3,120%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Savings Bar */}
        <div className="mt-8">
          <div className="text-center text-sm font-medium mb-4 flex items-center justify-center space-x-2">
            <span>Payback Time:</span>
            <span className="text-green-600 font-bold animate-pulse">2.3 days</span>
            <Zap className="w-4 h-4 text-yellow-500 animate-bounce" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 h-6 rounded-full transition-all duration-1000 flex items-center justify-end pr-4 relative"
              style={{ width: `${Math.min((animatedValue / 15600) * 100, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30 animate-pulse"></div>
              <span className="text-white text-sm font-bold relative z-10">
                {animatedValue > 1000 ? 'PAID OFF! 🎉' : 'Loading...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Call-to-Action */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-full px-8 py-3 animate-float">
          <Zap className="w-5 h-5 text-yellow-600 animate-pulse" />
          <span className="text-sm font-bold text-yellow-800">🚫 No Subscription Fatigue • $50 Once, Own Forever</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualROICalculator;
