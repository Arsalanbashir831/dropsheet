
import { CheckCircle, X, Clock, DollarSign, Users, Zap } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Hidden Cost of Manual Email Processing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every business owner knows this pain - but few realize how much it's actually costing them.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problem Side */}
          <div className="bg-white rounded-xl border-l-4 border-red-500 shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-red-700">Current Situation</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Manually copying order details from emails into spreadsheets</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">15+ minutes per order for data entry and verification</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Human errors in transcription leading to order mistakes</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Lost attachment files and missing customer details</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Expensive monthly subscriptions for automation tools ($200+/month)</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <span className="text-red-700 font-medium">Weekly Cost:</span>
                <span className="text-red-800 font-bold text-lg">$312.50</span>
              </div>
              <p className="text-red-600 text-sm mt-1">Based on 50 orders × 15 min × $50/hour</p>
            </div>
          </div>

          {/* Solution Side */}
          <div className="bg-white rounded-xl border-l-4 border-green-500 shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-700">With SheetDrop</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">AI automatically extracts all data from emails in seconds</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">30 seconds per order - just click and sync</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">99.5% accuracy with smart pattern recognition</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Automatic attachment downloads and customer data capture</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">One-time payment of $50 - no monthly fees ever</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-green-700 font-medium">Weekly Savings:</span>
                <span className="text-green-800 font-bold text-lg">$291.50</span>
              </div>
              <p className="text-green-600 text-sm mt-1">ROI achieved in just 2.3 days</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-6 py-3 border border-yellow-300">
            <Zap className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">Stop the revenue bleeding - automate today</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
