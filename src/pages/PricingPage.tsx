
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PricingPage = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "month",
      description: "Perfect for getting started",
      features: [
        "100 filtered emails",
        "Basic import",
        "Single Gmail account",
        "Community support"
      ],
      current: true,
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      disabled: true
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      description: "Best for regular users",
      features: [
        "1,000 filtered emails",
        "Custom templates",
        "Priority support",
        "Multiple Gmail accounts",
        "Advanced reporting"
      ],
      popular: true,
      current: false,
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      disabled: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams and organizations",
      features: [
        "Unlimited filtered emails",
        "Dedicated account manager",
        "SLA guarantees",
        "Team roles & permissions",
        "Priority support",
        "Custom integrations"
      ],
      current: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      disabled: false
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Dashboard / Pricing
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pricing Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your email filtering needs. 
            Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${
                plan.popular ? 'border-green-500 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-3 py-1">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-lg font-normal text-gray-600">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : ''
                  }`}
                  disabled={plan.disabled}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. 
                  Changes will be prorated and reflected in your next billing cycle.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens to my data if I downgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your existing DropSheets will remain accessible. However, 
                  you'll be limited to the features available in your new plan for future exports.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee for all paid plans. 
                  Contact our support team if you're not satisfied.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
