import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { API_ROUTES } from "@/constants/ApiRoutes";
import { toast } from "sonner";
import apiCaller from "@/lib/ApiCaller";

interface Plan {
    id: string;
    name: string;
    price: number | string;
    currency?: string;
    description: string;
}

// at the top of your file, if you like you can extract this to its own file:
// PricingSkeleton.tsx
export const PricingSkeleton: React.FC = () => (
    <div className="max-w-lg w-full bg-white border rounded-lg p-6 space-y-4 animate-pulse">
        {/* Plan title */}
        <div className="h-1/2 bg-gray-200 rounded w-full" />
       
    </div>
);



const PricingPage = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch plans from API
    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            try {
                const response = await apiCaller(API_ROUTES.BILLING.PLANS, "GET");
                setPlans(response.data.plans);
            } catch (err) {
                console.error("Error fetching plans:", err);
                setError("Failed to load pricing plans.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    // Handle subscription: create checkout session and redirect
    const handleSubscribe = async (planId: string) => {
        try {
            const response = await apiCaller(
                API_ROUTES.BILLING.CHECKOUT_SESSION,
                "POST",
                { plan_id: planId }
            );
            const { checkout_url } = response.data;
            window.location.href = checkout_url;
        } catch (err) {
            console.error("Error creating checkout session:", err);
            toast.error("Failed to create subscription. Please try again.");
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="p-8 w-full h-screen flex justify-center items-center">
                    <PricingSkeleton />
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="p-8 text-center text-red-600">{error}</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-600 mb-6">Dashboard / Pricing</nav>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Pricing Plans
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose the perfect plan for your email filtering needs. Upgrade or
                        downgrade at any time.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="flex items-center justify-center gap-8 mb-12">
                    {plans.map((plan) => {
                        const isCustom = typeof plan.price === "string";
                        return (
                            <Card key={plan.id} className="relative">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <div className="text-4xl font-bold text-gray-900 mb-2">
                                        {isCustom ? plan.price : `$${plan.price}`}
                                    </div>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <Button
                                        variant="default"
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        onClick={() => handleSubscribe(plan.id)}>
                                        {isCustom ? "Contact Sales" : `Subscribe – $${plan.price}`}
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Can I change plans anytime?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Yes, you can upgrade or downgrade your plan at any time.
                                    Changes will be prorated and reflected in your next billing
                                    cycle.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    What happens to my data if I downgrade?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Your existing SheetDrops will remain accessible. However,
                                    you'll be limited to the features available in your new plan
                                    for future exports.
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
