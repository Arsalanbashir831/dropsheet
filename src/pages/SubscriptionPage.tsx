
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const SubscriptionPage = () => {
  const currentPlan = {
    name: "Pro",
    nextBilling: "Jun 25, 2025",
    usage: 450,
    limit: 1000
  };

  const billingHistory = [
    {
      date: "May 25, 2025",
      description: "Pro Plan – Monthly",
      amount: "$9.99",
      status: "Paid"
    },
    {
      date: "Apr 25, 2025",
      description: "Pro Plan – Monthly",
      amount: "$9.99",
      status: "Paid"
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Dashboard / Subscription
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Subscription
          </h1>
          <p className="text-gray-600">
            Manage your plan, billing, and usage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Plan */}
          <div className="space-y-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Current Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-lg font-semibold text-green-800">
                    You are on the {currentPlan.name} plan
                  </p>
                  <p className="text-green-700">
                    Next billing date: {currentPlan.nextBilling}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Email Usage</span>
                    <span className="text-green-700">
                      {currentPlan.usage} of {currentPlan.limit}
                    </span>
                  </div>
                  <Progress 
                    value={(currentPlan.usage / currentPlan.limit) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing History */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                {billingHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No billing history available</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingHistory.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.amount}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Cancel Subscription */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Cancel Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Canceling will downgrade you to the Free plan at the end of your current billing period.
                  You'll retain access to Pro features until {currentPlan.nextBilling}.
                </p>
                <Button variant="outline" className="text-red-600 border-red-600">
                  Cancel My Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionPage;
