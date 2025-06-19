
import { Users, Store, Clock, BriefcaseBusiness, Clipboard, DollarSign, Zap } from "lucide-react";
import { useState } from "react";

const audiences = [
  {
    icon: <Store className="w-10 h-10 text-brand-purple" />,
    title: "E-commerce Store Owners",
    description: "Stop manually copying Shopify, Amazon, Etsy orders. Get all sales channels synced to one master spreadsheet automatically.",
    painPoint: "Losing 15+ hours/week on order data entry",
    solution: "Auto-sync all platforms to one sheet",
    savings: "$650/week saved"
  },
  {
    icon: <Users className="w-10 h-10 text-brand-purple" />,
    title: "Local Retail Shops", 
    description: "Track walk-in sales, online orders, and supplier emails without drowning in manual paperwork and scattered data.",
    painPoint: "Missing orders buried in email inbox",
    solution: "Never miss a sale or inquiry again",
    savings: "Prevent $500+ in lost orders"
  },
  {
    icon: <Clock className="w-10 h-10 text-brand-purple" />,
    title: "Service-Based Businesses",
    description: "Automatically organize appointment bookings, service requests, and client communications for salons, repair shops, consultants.",
    painPoint: "Double-booking and missed appointments",
    solution: "All bookings auto-logged and organized",
    savings: "95% fewer scheduling errors"
  },
  {
    icon: <BriefcaseBusiness className="w-10 h-10 text-brand-purple" />,
    title: "B2B/Wholesale Operations",
    description: "Keep track of large orders, distributor communications, and bulk sale confirmations without manual spreadsheet updates.",
    painPoint: "Losing track of high-value B2B orders",
    solution: "Auto-capture every bulk order and inquiry",
    savings: "Zero missed wholesale opportunities"
  },
  {
    icon: <Clipboard className="w-10 h-10 text-brand-purple" />,
    title: "Overwhelmed Business Owners",
    description: "For entrepreneurs wearing all the hats who need to reclaim 12+ hours per week from manual email-to-spreadsheet work.",
    painPoint: "Bleeding $16,250/year on manual work",
    solution: "Get your time back to grow your business",
    savings: "$47 investment saves $16K+/year"
  }
];

const TargetAudienceSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-white">
      <div className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Which Store Owner Are You?</h2>
          <p className="text-lg text-gray-600">
            SheetDrop saves time and money for business owners across every industry. 
            See how much you could save by automating your email-to-spreadsheet workflow.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {audiences.map((audience, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === index
                  ? "bg-brand-purple text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {audience.title}
            </button>
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-brand-purple-light/30 p-8 rounded-2xl shadow-sm border border-brand-purple/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Icon & Description */}
            <div>
              <div className="bg-white p-6 rounded-full shadow-md inline-block mb-6">
                {audiences[activeTab].icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{audiences[activeTab].title}</h3>
              <p className="text-lg text-gray-700 mb-6">{audiences[activeTab].description}</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 bg-red-100 p-1 rounded-full mr-3">
                    <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-red-700 mb-1">❌ Current Pain Point:</div>
                    <p className="text-red-600">{audiences[activeTab].painPoint}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 p-1 rounded-full mr-3">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-green-700 mb-1">✅ SheetDrop Solution:</div>
                    <p className="text-green-600">{audiences[activeTab].solution}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Savings Calculator */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <div className="text-center mb-6">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-gray-800">Your Savings Calculator</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-700 font-medium mb-2">Current Costs (Manual Work):</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Time spent copying emails:</span>
                      <span className="font-bold">12+ hrs/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual time cost ($25/hr):</span>
                      <span className="font-bold text-red-600">$15,600/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Missed orders/errors:</span>
                      <span className="font-bold text-red-600">$650+/year</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-green-700 font-medium mb-2">With SheetDrop:</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>One-time cost:</span>
                      <span className="font-bold">$47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual savings:</span>
                      <span className="font-bold text-green-600">$16,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI (first month):</span>
                      <span className="font-bold text-green-600">2,680%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-blue-700 font-bold text-lg">{audiences[activeTab].savings}</div>
                  <div className="text-blue-600 text-sm">Specific to your business type</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="text-xs text-gray-500 mb-2">⚡ Limited Time: Early Access Special</div>
                <Zap className="w-6 h-6 text-yellow-500 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories Preview */}
        <div className="mt-12 text-center">
          <div className="text-sm text-gray-600 mb-4">
            <strong>Real Results:</strong> Store owners using SheetDrop have saved an average of 
            <span className="text-green-600 font-bold"> 14 hours per week</span> and 
            <span className="text-green-600 font-bold"> $18,200 per year</span>
          </div>
          <div className="flex justify-center space-x-8 text-xs text-gray-500">
            <div>📈 <strong>Sarah:</strong> Saved $1,200 first month</div>
            <div>⏰ <strong>Mike:</strong> 16 hrs/week back</div>
            <div>💰 <strong>Lisa:</strong> Zero missed orders since day 1</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
