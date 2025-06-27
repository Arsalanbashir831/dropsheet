
import { Check, Mail, X, Zap, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "7 days",
      description: "Test SheetDrop with your actual store emails",
      features: [
        "Track 20 test emails",
        "All email data extraction",
        "Google Sheets integration",
        "All platform support",
        "Email support",
      ],
      cta: "Start Free Trial",
      popular: false,
      path: "/login",
    },
    {
      name: "Lifetime Access",
      originalPrice: "$87",
      price: "$25",
      period: "once, own forever",
      description: "The smart choice that pays for itself in 2 days",
      features: [
        "Unlimited email tracking",
        "Extract attachments automatically",
        "Parse subject lines & email body",
        "All sales platforms supported",
        "Real-time + scheduled syncing",
        "Lifetime updates forever",
        "Priority support",
        "30-day money-back guarantee"
      ],
      cta: "Get Lifetime Access",
      popular: true,
      path: "/login",
      roi: "ROI: 2,080% in first month"
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-gray-50">
      <div className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Email Freedom Plan</h2>
          <p className="text-lg text-gray-600">
            While expensive tools charge $25-200/month, SheetDrop gives you lifetime access 
            for what Zapier costs in 3 days.
          </p>
        </div>

        {/* Interactive Email Tracking Demo */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-12 max-w-4xl mx-auto border border-blue-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">🎯 See What SheetDrop Extracts From Your Emails</h3>
            <p className="text-gray-700">Click on each feature to see it in action:</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-bold text-blue-800 mb-2">Email Content</div>
                <div className="text-sm text-gray-600">Subject lines, body text, sender info</div>
                <div className="mt-3 bg-blue-50 rounded p-2 text-xs">
                  <div className="font-medium">Example:</div>
                  <div>"Order #1234 - $127.50"</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="font-bold text-green-800 mb-2">Smart Data</div>
                <div className="text-sm text-gray-600">Order amounts, customer details, dates</div>
                <div className="mt-3 bg-green-50 rounded p-2 text-xs">
                  <div className="font-medium">Auto-detected:</div>
                  <div>$127.50, John Doe, 2024-01-15</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="font-bold text-purple-800 mb-2">Attachments</div>
                <div className="text-sm text-gray-600">PDFs, receipts, invoices saved</div>
                <div className="mt-3 bg-purple-50 rounded p-2 text-xs">
                  <div className="font-medium">Downloads:</div>
                  <div>invoice.pdf, receipt.jpg</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6 mb-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-orange-700 font-bold mb-2">❌ Monthly Tools</div>
              <div className="text-2xl font-bold text-orange-600">$1,200/year</div>
              <div className="text-sm text-orange-600">Complex setup required</div>
            </div>
            <div>
              <div className="text-red-700 font-bold mb-2">❌ Manual Work</div>
              <div className="text-2xl font-bold text-red-600">$16,250/year</div>
              <div className="text-sm text-red-600">Time = money lost</div>
            </div>
            <div>
              <div className="text-green-700 font-bold mb-2">✅ SheetDrop</div>
              <div className="text-2xl font-bold text-green-600">$25 once</div>
              <div className="text-sm text-green-600">Simple, forever yours</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? "bg-gradient-to-br from-white to-green-50" 
                  : "bg-white"
              } rounded-2xl border ${
                plan.popular 
                  ? "border-green-500 shadow-2xl ring-2 ring-green-200" 
                  : "border-gray-200 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 text-center text-sm font-bold">
                    🚀 MOST POPULAR CHOICE
                  </div>
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through mr-3">{plan.originalPrice}</span>
                    )}
                    <span className={`text-4xl md:text-5xl font-bold ${
                      plan.popular ? 'text-green-600' : 'text-gray-900'
                    }`}>{plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  </div>

                  {plan.roi && (
                    <div className="mb-4">
                      <span className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full font-bold border border-green-200 text-sm">
                        {plan.roi}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-lg">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        plan.popular ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Check className={`h-4 w-4 ${
                          plan.popular ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className={`${plan.popular ? "font-medium text-gray-800" : "text-gray-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Interactive Value Calculator for Lifetime Plan */}
                {plan.popular && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
                    <div className="text-sm font-bold text-green-800 mb-4 text-center">💰 Your Monthly Savings:</div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white rounded-lg p-3 text-sm">
                        <span className="text-gray-700">Time saved monthly:</span>
                        <span className="font-bold text-green-700">50 hours</span>
                      </div>
                      <div className="flex justify-between items-center bg-white rounded-lg p-3 text-sm">
                        <span className="text-gray-700">Value at $25/hour:</span>
                        <span className="font-bold text-green-700">$1,250</span>
                      </div>
                      <div className="flex justify-between items-center bg-white rounded-lg p-3 text-sm">
                        <span className="text-gray-700">SheetDrop cost:</span>
                        <span className="font-bold text-green-700">$25 once</span>
                      </div>
                      <div className="border-t-2 border-green-200 pt-3">
                        <div className="flex justify-between items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 font-bold">
                          <span className="text-green-800">Monthly profit:</span>
                          <span className="text-green-600 text-lg">$1,200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button
                  size="lg"
                  className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular 
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-300 hover:border-gray-400"
                  }`}
                  asChild
                >
                  <Link to={plan.path}>
                    {plan.cta}
                    {plan.popular && <Zap className="ml-2 h-5 w-5" />}
                  </Link>
                </Button>

                {plan.popular && (
                  <div className="mt-6 text-center space-y-2">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Secure payment</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>30-day guarantee</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      💳 No recurring charges • Own it forever
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Simplified Urgency Banner */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <div className="text-orange-800 font-bold mb-2">⏰ Limited Time Offer</div>
            <div className="text-orange-700 text-sm mb-4">
              Price returns to $87 next week. Join 127 smart store owners who already chose lifetime access.
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">Questions about volume pricing or multiple stores?</p>
          <Button variant="link" className="text-brand-purple inline-flex items-center" asChild>
            <a href="mailto:varun.bhanot11@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Contact Our Store Success Team
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
