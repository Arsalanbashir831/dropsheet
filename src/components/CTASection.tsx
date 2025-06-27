
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-brand-purple to-brand-blue text-white relative overflow-hidden">
      {/* Warm Urgency Banner */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 text-center text-sm font-bold z-10">
        ⏰ LIMITED TIME: Only 73 lifetime spots left at $25 (Regular price $87)
      </div>
      
      <div className="page-container pt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Losing $16,250/Year to Manual Email Work
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join 127 smart store owners who chose the lifetime solution. 
            Pay once, extract forever. No monthly fees eating your profits.
          </p>

          {/* Interactive Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="font-bold">Save 50+ Hours/Month</div>
              <div className="text-sm text-white/80">Extract emails automatically</div>
              <div className="text-xs text-green-300 mt-2">Value: $1,250/month</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <div className="font-bold">Track Every Dollar</div>
              <div className="text-sm text-white/80">Never miss order amounts</div>
              <div className="text-xs text-green-300 mt-2">Prevent: $250+ losses</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
              <div className="text-2xl mb-2">🚫</div>
              <div className="font-bold">No Subscriptions Ever</div>
              <div className="text-sm text-white/80">Pay once, own forever</div>
              <div className="text-xs text-green-300 mt-2">Save: $1,200/year</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-brand-purple bg-white hover:bg-gray-100 font-bold px-8 py-4 text-lg hover:scale-105 transition-transform" 
              asChild
            >
              <Link to="/login">
                Get Lifetime Access - $25 <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-purple font-bold px-8 py-4"
              asChild
            >
              <Link to="/login">
                Start Free 7-Day Trial
              </Link>
            </Button>
          </div>

          {/* Social Proof & Warm Urgency */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
            <div className="text-lg font-bold mb-2">🎯 Smart Store Owners Choose SheetDrop</div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Limited Time Special:</div>
                <div className="text-white/90">$37 off lifetime access (expires next week)</div>
              </div>
              <div>
                <div className="font-medium">Join The Winners:</div>
                <div className="text-white/90">127 store owners already saving $16K+ per year</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/80 text-sm mb-2">
              💳 Secure one-time payment • 🔒 30-day money-back guarantee • 🚫 No recurring charges
            </p>
            <p className="text-white/70 text-xs">
              Join successful store owners who chose freedom from subscription fees
            </p>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 translate-y-32"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 -translate-y-48"></div>
    </section>
  );
};

export default CTASection;
