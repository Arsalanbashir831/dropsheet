
import { Filter, Mail, Clock, Table, Check, Search, FileSearch, Database, DollarSign, Zap } from "lucide-react";
import InteractiveFeatureShowcase from "./InteractiveFeatureShowcase";
import VisualROICalculator from "./VisualROICalculator";
import AnimatedPlatformSync from "./AnimatedPlatformSync";
import AnimatedFeatureStack from "./AnimatedFeatureStack";

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Store Owners Save $16,250/Year With SheetDrop</h2>
          <p className="text-lg text-gray-600">
            Built specifically for overwhelmed business owners who need simple, profitable automation 
            without the monthly subscription trap.
          </p>
        </div>

        {/* Side-by-side: Feature Stack Animation + Explanation */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <AnimatedFeatureStack />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Six Powerful Features, One Simple Tool</h3>
            <p className="text-lg text-gray-600 mb-6">
              Watch each feature work in real-time. SheetDrop handles everything from order tracking 
              to customer service automation — so you can focus on growing your business.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">Real-time email processing</span>
              </div>
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">Smart data extraction</span>
              </div>
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">Instant Google Sheets sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Feature Demo */}
        <div className="mb-16">
          <InteractiveFeatureShowcase />
        </div>

        {/* Side-by-side: Platform Sync + Explanation */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Works With Every Sales Platform</h3>
            <p className="text-lg text-gray-600 mb-6">
              No matter where you sell — Shopify, Etsy, Amazon, or anywhere else — SheetDrop 
              automatically finds and organizes your order emails into one master spreadsheet.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700 animate-pulse">122+</div>
                <div className="text-sm text-gray-600">Orders processed daily</div>
              </div>
            </div>
          </div>
          <div>
            <AnimatedPlatformSync />
          </div>
        </div>

        {/* Visual ROI Calculator */}
        <VisualROICalculator />
      </div>
    </section>
  );
};

export default FeaturesSection;
