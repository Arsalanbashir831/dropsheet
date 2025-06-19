
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedEmailDemo from "./AnimatedEmailDemo";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-white to-brand-purple-light/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Warm Early Access Banner */}
          <div className="mb-6 inline-block px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 rounded-full text-sm font-bold animate-fade-in border border-orange-300">
            🎉 Limited Time: Lifetime Access Just $50 (Usually $87) 🎉
          </div>

          {/* Problem Statement Banner */}
          <div className="mb-8 inline-block px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
            ⚡ Stop Copying Order Emails Into Spreadsheets ⚡
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Extract Email Data With
            <br />
            <span className="gradient-text">Just a Few Clicks</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Track <strong>order amounts</strong>, <strong>customer details</strong>, <strong>attachments</strong>, 
            and even <strong>email content</strong> automatically. 
            <br />
            SheetDrop turns your Gmail into a smart data extraction machine.
          </p>

          {/* Animated Trust Indicators */}
          <div className="mb-8 flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium">Early adopters testing</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium">3-min setup</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <Shield className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium">Bank-level security</span>
            </div>
          </div>

          {/* Value Proposition Banner */}
          <div className="mb-8 inline-block px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
            💰 One payment, lifetime freedom — no monthly bills ever
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-base hover:scale-105 transition-transform bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4" asChild>
              <Link to="/login">
                Get Lifetime Access - $50 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-4 border-2" asChild>
              <Link to="/login">
                Start Free 7-Day Trial
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-sm text-gray-500 flex items-center justify-center flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No monthly fees ever</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Works with all email types</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>3-minute setup</span>
            </div>
          </div>
        </div>

        {/* Replace text-heavy demo with animated visual */}
        <div className="mt-16 max-w-5xl mx-auto">
          <AnimatedEmailDemo />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
