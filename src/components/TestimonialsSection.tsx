
import { useEffect, useState, useRef } from "react";
import { Mail, Users, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="page-container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Genuine User Feedback</h2>
          <p className="text-lg text-gray-600 mb-12">
            We're a new platform committed to transparency - we'll only share real feedback when we earn it.
          </p>
          
          {/* Genuine Feedback Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-brand-purple-light p-4 rounded-full">
                <Star className="w-8 h-8 text-brand-purple" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Earning Trust, Not Manufacturing It</h3>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We've just launched SheetDrop and are focused on delivering value before asking for reviews. Instead of creating fake testimonials with stock photos, we'll let our product speak for itself.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-purple-200 mb-8">
              <div className="flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-700">Be Part Of Our Story</span>
              </div>
              <p className="text-gray-700 mb-4">
                Try SheetDrop and become one of our first reviewers. Your feedback will help shape the product and might appear right here when you're ready to share it.
              </p>
              <div className="flex items-center justify-center">
                <Mail className="w-4 h-4 text-purple-600 mr-2" />
                <a 
                  href="mailto:support@sheetdrop.co" 
                  className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
                >
                  support@sheetdrop.co
                </a>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-brand-purple mb-2">Real</div>
                <div className="text-sm text-gray-600">Reviews Only</div>
                <div className="text-xs text-gray-500 mt-1">No fake testimonials ever</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-brand-purple mb-2">Coming</div>
                <div className="text-sm text-gray-600">Soon</div>
                <div className="text-xs text-gray-500 mt-1">As users share feedback</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-brand-purple mb-2">Your</div>
                <div className="text-sm text-gray-600">Story</div>
                <div className="text-xs text-gray-500 mt-1">Could be featured here</div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                size="lg" 
                className="bg-brand-purple hover:bg-brand-purple/90"
                onClick={() => window.open('mailto:support@sheetdrop.co?subject=SheetDrop Feedback', '_blank')}
              >
                Be Our First Reviewer
              </Button>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>No manufactured testimonials</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Only real user stories</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Help us write our success story</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
