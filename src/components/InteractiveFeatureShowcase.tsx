import { useState, useEffect } from "react";
import { Mail, DollarSign, FileText, Clock, Zap, CheckCircle, ArrowRight, Database } from "lucide-react";

const InteractiveFeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [extractedData, setExtractedData] = useState<any>({});

  const features = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Content Extraction",
      color: "blue",
      demo: {
        input: "Subject: Order #1234 - $127.50\nFrom: john.doe@email.com\nDear customer, thank you for your purchase of our premium widget...",
        steps: [
          { field: "subject", value: "Order #1234 - $127.50", delay: 0 },
          { field: "customer_email", value: "john.doe@email.com", delay: 300 },
          { field: "order_id", value: "#1234", delay: 600 },
          { field: "content_preview", value: "Thank you for purchase...", delay: 900 }
        ]
      }
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Smart Money Detection",
      color: "green",
      demo: {
        input: "Order Total: $127.50\nShipping: $12.99\nTax: $8.25\nDiscount Applied: -$15.00",
        steps: [
          { field: "total_amount", value: "$127.50", delay: 0 },
          { field: "shipping_cost", value: "$12.99", delay: 200 },
          { field: "tax_amount", value: "$8.25", delay: 400 },
          { field: "discount", value: "-$15.00", delay: 600 }
        ]
      }
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Attachment Processing",
      color: "purple",
      demo: {
        input: "📎 invoice_1234.pdf (124 KB)\n📎 receipt.jpg (89 KB)\n📎 shipping_label.pdf (56 KB)",
        steps: [
          { field: "attachments_found", value: "3 files", delay: 0 },
          { field: "total_size", value: "269 KB", delay: 200 },
          { field: "file_types", value: "PDF, JPG", delay: 400 },
          { field: "auto_saved", value: "✅ Complete", delay: 600 }
        ]
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
      setAnimationStep(0);
      setExtractedData({});
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentFeature = features[activeFeature];
    setExtractedData({});
    
    currentFeature.demo.steps.forEach((step, index) => {
      setTimeout(() => {
        setExtractedData(prev => ({
          ...prev,
          [step.field]: step.value
        }));
        setAnimationStep(index + 1);
      }, step.delay + 1000);
    });
  }, [activeFeature]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">📊 How Data Extraction Works</h3>
        <p className="text-gray-600">Visual demonstration of our smart email processing system</p>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveFeature(index);
              setAnimationStep(0);
              setExtractedData({});
            }}
            className={`p-4 rounded-lg border-2 transition-all duration-500 transform ${
              activeFeature === index
                ? `border-${feature.color}-500 bg-white shadow-lg scale-110 animate-pulse`
                : "border-gray-200 bg-white/50 hover:border-blue-300 hover:scale-105"
            }`}
          >
            <div className={`${
              activeFeature === index ? `text-${feature.color}-600` : "text-gray-600"
            } mb-2 transition-colors duration-300`}>
              {feature.icon}
            </div>
            <div className={`text-sm font-medium transition-colors duration-300 ${
              activeFeature === index ? `text-${feature.color}-800` : "text-gray-700"
            }`}>
              {feature.title}
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Raw Email Content */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <div className="text-sm font-medium text-gray-700 mb-4 flex items-center">
            📧 Raw Email Content
          </div>
          <div className="bg-gray-50 rounded border p-4 font-mono text-sm min-h-[120px] relative overflow-hidden">
            <div className="relative z-10">
              {features[activeFeature].demo.input}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 animate-pulse transform -skew-x-12 w-full h-full"
                 style={{
                   animation: activeFeature !== null ? 'flow-right 2s ease-in-out infinite' : 'none'
                 }}>
            </div>
          </div>
        </div>

        {/* Processing Animation */}
        <div className="flex flex-col justify-center items-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full">
              <div className={`w-16 h-16 border-4 border-${features[activeFeature].color}-500 border-t-transparent rounded-full animate-spin`}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className={`w-6 h-6 text-${features[activeFeature].color}-500 animate-pulse`} />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
            <Database className="w-4 h-4 animate-bounce" />
            <span>AI Processing...</span>
          </div>
          <div className="mt-2 flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 bg-${features[activeFeature].color}-400 rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Extracted Data */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <div className="text-sm font-medium text-gray-700 mb-4 flex items-center">
            📊 Extracted & Organized Data
          </div>
          <div className="space-y-3 min-h-[120px]">
            {features[activeFeature].demo.steps.map((step, index) => (
              <div 
                key={step.field}
                className={`flex items-center justify-between p-3 rounded border transition-all duration-500 transform ${
                  extractedData[step.field] ? 
                    `bg-${features[activeFeature].color}-50 border-${features[activeFeature].color}-200 scale-100 opacity-100` : 
                    'bg-gray-50 border-gray-200 scale-95 opacity-50'
                }`}
              >
                <span className={`text-sm font-medium capitalize transition-colors duration-300 ${
                  extractedData[step.field] ? 
                    `text-${features[activeFeature].color}-800` : 
                    'text-gray-500'
                }`}>
                  {step.field.replace(/_/g, ' ')}:
                </span>
                <div className="flex items-center space-x-2">
                  {extractedData[step.field] && (
                    <CheckCircle className={`w-4 h-4 text-${features[activeFeature].color}-600 animate-bounce`} />
                  )}
                  <span className={`text-sm font-mono transition-all duration-300 ${
                    extractedData[step.field] ? 
                      `text-${features[activeFeature].color}-700 font-bold` : 
                      'text-gray-400'
                  }`}>
                    {extractedData[step.field] || '...'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-4 bg-white rounded-full px-6 py-3 border shadow-sm">
          <Clock className={`w-4 h-4 text-${features[activeFeature].color}-600`} />
          <span className="text-sm font-medium">Processing time: 2-3 seconds per email</span>
          <ArrowRight className={`w-4 h-4 text-${features[activeFeature].color}-600 animate-bounce`} />
          <span className="text-sm font-medium text-green-600">Ready for Sheets!</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFeatureShowcase;
