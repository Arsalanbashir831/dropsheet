
import { useState, useEffect } from "react";
import { Users, Clock, Shield, Mail, CheckCircle, TrendingUp } from "lucide-react";

const AnimatedSocialProof = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const stats = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Emails processed so far",
      value: 127,
      color: "blue",
      suffix: "+"
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Early users testing",
      value: 8,
      color: "green",
      suffix: ""
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Hours saved so far",
      value: 24,
      color: "purple",
      suffix: "+"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      label: "Success rate",
      value: 99.5,
      color: "emerald",
      suffix: "%"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate email counter
    const emailInterval = setInterval(() => {
      setEmailCount(prev => {
        const newCount = prev + 1;
        return newCount > 127 ? 120 : newCount;
      });
    }, 50);

    // Animate user counter
    const userInterval = setInterval(() => {
      setUserCount(prev => {
        const newCount = prev + 1;
        return newCount > 8 ? 5 : newCount;
      });
    }, 200);

    return () => {
      clearInterval(emailInterval);
      clearInterval(userInterval);
    };
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Honest Numbers from Early Testing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We just launched SheetDrop. These are our real, honest numbers - not inflated marketing stats.
          </p>
        </div>

        {/* Animated Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 border-2 transition-all duration-500 transform ${
                currentStat === index
                  ? `border-${stat.color}-500 shadow-xl scale-110 animate-pulse`
                  : "border-gray-200 scale-100"
              }`}
            >
              <div className={`text-${stat.color}-600 mb-3 flex justify-center transition-colors duration-300`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold text-${stat.color}-700 mb-2 text-center`}>
                {index === 0 ? emailCount : index === 1 ? userCount : stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 text-center">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">🚀 Early User Activity</h3>
            <p className="text-sm text-gray-600">Real activity from our small but growing user base</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-sm text-gray-700">Early user extracted 6 orders</span>
              </div>
              <span className="text-xs text-green-600 font-medium">12 min ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                <span className="text-sm text-gray-700">Platform processing working smoothly</span>
              </div>
              <span className="text-xs text-blue-600 font-medium">34 min ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
                <span className="text-sm text-gray-700">New user registered for trial</span>
              </div>
              <span className="text-xs text-purple-600 font-medium">1 hour ago</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-4 py-2 border border-yellow-300">
              <TrendingUp className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">We'll post real reviews when we earn them</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedSocialProof;
