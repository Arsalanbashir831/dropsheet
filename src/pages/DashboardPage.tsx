
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";

const DashboardPage = () => {
  const [isGmailSynced, setIsGmailSynced] = useState(false);
  const [emails] = useState([
    {
      id: 1,
      sender: "John Doe",
      subject: "Invitation to CUI Concert",
      date: "Jun 04, 2025 2:15 PM",
      labels: ["Inbox"],
      unread: true
    },
    {
      id: 2,
      sender: "HR Department",
      subject: "Your Payslip for May 2025",
      date: "Jun 03, 2025 10:00 AM",
      labels: ["Work"],
      unread: false
    },
    {
      id: 3,
      sender: "GitHub",
      subject: "[Action Required] Security Alert",
      date: "May 28, 2025 5:45 PM",
      labels: ["Alerts", "Important"],
      unread: true
    }
  ]);

  const handleSyncGmail = () => {
    toast.success("Gmail synced successfully!");
    setIsGmailSynced(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hello Arslan! Welcome back.
          </h1>
        </div>

        {/* Top Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isGmailSynced ? 'bg-green-600' : 'bg-red-500'}`} />
            <span className={`font-medium ${isGmailSynced ? 'text-green-600' : 'text-red-500'}`}>
              {isGmailSynced ? "Connected: arslan@gmail.com" : "Gmail not connected"}
            </span>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleSyncGmail}
              className="bg-green-600 hover:bg-green-700"
            >
              Sync Gmail
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Create Rule</CardTitle>
              <CardDescription>
                Set up filtering rules for your emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link to="/rules">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Filter Emails</CardTitle>
              <CardDescription>
                Generate spreadsheets from filtered emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link to="/filtering">Filter Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Subscription</CardTitle>
              <CardDescription>
                Manage your plan and billing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link to="/subscription">View Details</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Profile</CardTitle>
              <CardDescription>
                Update your account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link to="/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Email Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Emails</CardTitle>
          </CardHeader>
          <CardContent>
            {!isGmailSynced ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No emails to display
                </h3>
                <p className="text-gray-600 mb-6">
                  Sync Gmail first to see your emails here.
                </p>
                <Button onClick={handleSyncGmail} className="bg-green-600 hover:bg-green-700">
                  Sync Gmail
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date Received</TableHead>
                    <TableHead>Labels</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emails.map((email) => (
                    <TableRow 
                      key={email.id} 
                      className={email.unread ? "bg-blue-50" : ""}
                    >
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">
                        {email.sender}
                      </TableCell>
                      <TableCell>
                        <span className={email.unread ? "font-semibold" : ""}>
                          {email.subject}
                        </span>
                      </TableCell>
                      <TableCell>{email.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {email.labels.map((label) => (
                            <Badge key={label} variant="secondary" className="text-xs">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View in Gmail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;
