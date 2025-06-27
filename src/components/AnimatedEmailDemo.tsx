
import { useState, useEffect } from "react";
import { Mail, FileText, DollarSign, User, Calendar, CheckCircle, ArrowRight, Zap } from "lucide-react";

const AnimatedEmailDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedItems, setExtractedItems] = useState<string[]>([]);

  const emailSteps = [
    {
      title: "📧 New Email Arrives",
      email: {
        subject: "Order #1234 - $127.50 from John Doe",
        sender: "noreply@shopify.com",
        body: "Thank you for your order! Order Total: $127.50\nShipping Address: 123 Main St\nCustomer: john.doe@email.com",
        attachment: "invoice.pdf"
      }
    },
    {
      title: "🤖 AI Processing Magic",
      processing: true
    },
    {
      title: "📊 Data Extracted & Organized",
      extracted: {
        orderNumber: "#1234",
        amount: "$127.50",
        customer: "John Doe",
        email: "john.doe@email.com",
        address: "123 Main St",
        date: "2024-01-15",
        platform: "Shopify",
        attachment: "invoice.pdf"
      }
    },
    {
      title: "✅ Automatically Added to Sheet",
      completed: true
    }
  ];

  const processingSteps = [
    "Scanning email content...",
    "Detecting dollar amounts...",
    "Extracting customer details...",
    "Finding order numbers...",
    "Processing attachments...",
    "Organizing data..."
  ];

  const [currentProcessStep, setCurrentProcessStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % emailSteps.length;
        if (next === 1) {
          setIsProcessing(true);
          setExtractedItems([]);
          setCurrentProcessStep(0);
        } else if (next === 2) {
          setIsProcessing(false);
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentStep === 1) {
      const stepInterval = setInterval(() => {
        setCurrentProcessStep((prev) => (prev + 1) % processingSteps.length);
      }, 500);
      return () => clearInterval(stepInterval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 2) {
      const items = Object.entries(emailSteps[2].extracted);
      items.forEach((_, index) => {
        setTimeout(() => {
          setExtractedItems(prev => [...prev, items[index][0]]);
        }, index * 300);
      });
    }
  }, [currentStep]);

  return (
    <div className="bg-white rounded-xl shadow-lg border p-8 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">⚡ Watch SheetDrop Work Its Magic</h3>
        <div className="text-lg text-gray-600 animate-pulse">{emailSteps[currentStep].title}</div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Email Inbox Animation */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Gmail Inbox
            </div>
            
            <div className={`bg-white rounded border p-3 transition-all duration-1000 transform ${
              currentStep >= 0 ? 'border-blue-500 shadow-lg scale-105 animate-pulse' : 'border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 animate-bounce">
                    <span className="text-xs font-bold text-green-700">S</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Shopify Orders</div>
                    <div className="text-xs text-gray-500">noreply@shopify.com</div>
                  </div>
                </div>
                {currentStep >= 1 && currentStep < 3 && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                  </div>
                )}
              </div>
              
              <div className="text-sm font-medium mb-1 animate-fade-in">Order #1234 - $127.50 from John Doe</div>
              <div className="text-xs text-gray-600 mb-2">Thank you for your order! Order Total: $127.50...</div>
              
              <div className="flex items-center text-xs text-gray-500">
                <FileText className="w-3 h-3 mr-1" />
                invoice.pdf
                {currentStep >= 1 && (
                  <ArrowRight className="w-3 h-3 ml-2 animate-bounce" />
                )}
              </div>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-scale-in">
              <div className="text-blue-800 font-medium text-sm mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                SheetDrop AI Processing...
              </div>
              <div className="space-y-2">
                {processingSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center text-xs transition-all duration-300 ${
                      index === currentProcessStep ? 'text-blue-700 font-medium' : 'text-blue-500'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      index === currentProcessStep ? 'bg-blue-600 animate-pulse' : 'bg-blue-300'
                    }`}></div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Processing Animation */}
        <div className="flex items-center justify-center">
          <div className="relative">
            {currentStep === 1 && (
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            )}
            {currentStep >= 2 && (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            )}
            {currentStep < 1 && (
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Google Sheets Animation */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              📊 Google Sheets
            </div>
            
            <div className="bg-white rounded border overflow-hidden">
              <div className="bg-green-100 p-2 text-xs font-medium grid grid-cols-3 gap-1 border-b">
                <div>Order Info</div>
                <div>Customer</div>
                <div>Details</div>
              </div>
              
              <div className="divide-y">
                <div className="p-2 text-xs grid grid-cols-3 gap-1 text-gray-400">
                  <div>#1233 - $89.99</div>
                  <div>Jane Smith</div>
                  <div>✅ Complete</div>
                </div>
                
                <div className={`p-2 text-xs grid grid-cols-3 gap-1 transition-all duration-1000 ${
                  currentStep >= 3 ? 'bg-green-50 border-l-4 border-green-400 animate-pulse' : 
                  currentStep >= 2 ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-gray-50'
                }`}>
                  {currentStep >= 2 ? (
                    <>
                      <div className="font-medium animate-fade-in">#1234 - $127.50</div>
                      <div className="font-medium animate-fade-in" style={{animationDelay: '0.2s'}}>John Doe</div>
                      <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                        {currentStep >= 3 ? (
                          <CheckCircle className="w-4 h-4 text-green-600 animate-bounce" />
                        ) : (
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-yellow-500 rounded-full animate-ping"></div>
                            <div className="w-1 h-1 bg-yellow-500 rounded-full animate-ping" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-1 h-1 bg-yellow-500 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="animate-pulse bg-gray-200 h-3 rounded"></div>
                      <div className="animate-pulse bg-gray-200 h-3 rounded"></div>
                      <div className="animate-pulse bg-gray-200 h-3 rounded"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {currentStep >= 2 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-scale-in">
              <div className="text-green-800 font-medium text-sm mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 animate-bounce" />
                Data Successfully Extracted!
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(emailSteps[2].extracted).map(([key, value], index) => (
                  <div 
                    key={key}
                    className={`flex items-center transition-all duration-500 ${
                      extractedItems.includes(key) ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
                    }`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: {value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-2">
        {emailSteps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentStep ? 'bg-blue-500 scale-125' : 
              index < currentStep ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-6 py-3 border animate-float">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">Average processing: 2-3 seconds per email</span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedEmailDemo;
