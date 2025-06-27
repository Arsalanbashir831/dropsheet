
import { useEffect, useState, useRef } from "react";
import { Shield, History, Zap, CheckCircle, Users, Brain, Lock, RefreshCw, TrendingUp, Sparkles } from "lucide-react";

const TrustBuildingAnimations = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate items one by one with a delay
            [0, 1, 2, 3, 4].forEach((index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const trustItems = [
    {
      icon: TrendingUp,
      title: "Realistic ROI Expectations",
      description: "Save 3,120% of your time - based on real calculations, not inflated marketing numbers",
      color: "bg-green-500"
    },
    {
      icon: Brain,
      title: "Smart Email Processing",
      description: "AI combined with pattern matching ensures 99.5% accuracy in data extraction",
      color: "bg-purple-500"
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description: "Google OAuth authentication. We only parse emails - never store your data",
      color: "bg-blue-500"
    },
    {
      icon: RefreshCw,
      title: "Error Recovery System",
      description: "History tab for viewing and retrying failed syncs (rare but manageable)",
      color: "bg-orange-500"
    },
    {
      icon: Sparkles,
      title: "No Subscription Fatigue",
      description: "One-time purchase. No monthly fees draining your budget forever",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Trust & Transparency</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            No marketing fluff. Real solutions to real problems with honest expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            const isVisible = visibleItems.includes(index);
            
            return (
              <div
                key={index}
                className={`
                  bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center
                  transition-all duration-500 transform
                  ${isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                  }
                  hover:shadow-lg hover:scale-105
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`${item.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>No fake testimonials</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>Honest expectations</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>Real solutions</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBuildingAnimations;
