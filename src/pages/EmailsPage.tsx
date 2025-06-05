
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmailsPage = () => {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [showEmailDetail, setShowEmailDetail] = useState(false);
  
  const emails = [
    {
      id: 1,
      sender: "John Doe",
      senderEmail: "john.doe@example.com",
      subject: "Invitation to CUI Concert",
      snippet: "We are excited to invite you to the upcoming CUI Concert...",
      date: "Jun 04, 2025 2:15 PM",
      labels: ["Inbox"],
      unread: true,
      starred: false,
      content: "Dear Ahmed,\n\nWe are excited to invite you to the upcoming CUI Concert happening next week. This will be a fantastic event featuring local artists and students.\n\nEvent Details:\n- Date: June 10, 2025\n- Time: 7:00 PM\n- Venue: CUI Main Auditorium\n- Admission: Free for students\n\nPlease RSVP by June 8th.\n\nBest regards,\nJohn Doe\nEvent Coordinator"
    },
    {
      id: 2,
      sender: "HR Department",
      senderEmail: "hr@company.com",
      subject: "Your Payslip for May 2025",
      snippet: "Please find attached your payslip for the month of May 2025...",
      date: "Jun 03, 2025 10:00 AM",
      labels: ["Work"],
      unread: false,
      starred: true,
      content: "Dear Ahmed,\n\nPlease find attached your payslip for the month of May 2025.\n\nIf you have any questions regarding your salary or deductions, please contact the HR department.\n\nThank you,\nHR Department"
    },
    {
      id: 3,
      sender: "GitHub",
      senderEmail: "noreply@github.com",
      subject: "[Action Required] Security Alert",
      snippet: "We detected unusual activity on your GitHub account...",
      date: "May 28, 2025 5:45 PM",
      labels: ["Alerts", "Important"],
      unread: true,
      starred: false,
      content: "Security Alert\n\nWe detected unusual activity on your GitHub account. A new device has attempted to access your account from an unrecognized location.\n\nIf this was you, you can ignore this email. If this wasn't you, please secure your account immediately.\n\nBest regards,\nGitHub Security Team"
    }
  ];

  const handleEmailSelect = (emailId: number) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmails(
      selectedEmails.length === emails.length ? [] : emails.map(e => e.id)
    );
  };

  const handleEmailClick = (email: any) => {
    setSelectedEmail(email);
    setShowEmailDetail(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Dashboard / Emails
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Emails
          </h1>
          <p className="text-gray-600">
            View and manage all your synchronized emails.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input 
                placeholder="Search by subject/sender..." 
                className="flex-1"
              />
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Label" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="inbox">Inbox</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="alerts">Alerts</SelectItem>
                  <SelectItem value="important">Important</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Apply Filters</Button>
              <Button variant="ghost">Clear Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedEmails.length > 0 && (
          <div className="sticky top-20 z-10 bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-green-800 font-medium">
                {selectedEmails.length} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Mark as Read</Button>
                <Button variant="outline" size="sm">Move to...</Button>
                <Button variant="outline" size="sm">Apply Rule</Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Email Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedEmails.length === emails.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-8">⭐</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject & Snippet</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Labels</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.map((email) => (
                  <TableRow 
                    key={email.id} 
                    className={`cursor-pointer ${
                      email.unread ? "bg-blue-50" : ""
                    } ${
                      selectedEmails.includes(email.id) ? "bg-green-50" : ""
                    }`}
                  >
                    <TableCell>
                      <Checkbox 
                        checked={selectedEmails.includes(email.id)}
                        onCheckedChange={() => handleEmailSelect(email.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <button className="text-lg">
                        {email.starred ? "⭐" : "☆"}
                      </button>
                    </TableCell>
                    <TableCell 
                      className="font-medium cursor-pointer"
                      onClick={() => handleEmailClick(email)}
                    >
                      <div>
                        <div className={email.unread ? "font-semibold" : ""}>
                          {email.sender}
                        </div>
                        <div className="text-sm text-gray-600">
                          {email.senderEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell 
                      className="cursor-pointer"
                      onClick={() => handleEmailClick(email)}
                    >
                      <div>
                        <div className={`${email.unread ? "font-semibold" : ""} mb-1`}>
                          {email.subject}
                        </div>
                        <div className="text-sm text-gray-600 truncate max-w-md">
                          {email.snippet}
                        </div>
                      </div>
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
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">↩️</Button>
                        <Button variant="ghost" size="sm">↪️</Button>
                        <Button variant="ghost" size="sm">🏷️</Button>
                        <Button variant="ghost" size="sm">⋯</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Email Detail Modal */}
        <Dialog open={showEmailDetail} onOpenChange={setShowEmailDetail}>
          <DialogContent className="max-w-4xl max-h-[80vh] bg-white">
            {selectedEmail && (
              <>
                <DialogHeader className="bg-gray-50 -m-6 p-6 border-b">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-semibold">
                      {selectedEmail.subject}
                    </DialogTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">⭐</Button>
                      <Button variant="ghost" size="sm">↩️</Button>
                      <Button variant="ghost" size="sm">↪️</Button>
                      <Button variant="ghost" size="sm">⋯</Button>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <strong>From:</strong> {selectedEmail.sender} &lt;{selectedEmail.senderEmail}&gt;
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>To:</strong> ahmed.khan@example.com
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Date:</strong> {selectedEmail.date}
                    </div>
                  </div>

                  <hr />

                  <div className="prose prose-sm max-w-none">
                    {selectedEmail.content.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between bg-gray-50 -m-6 mt-6 p-6 border-t">
                  <div className="flex gap-3">
                    <Button className="bg-green-600 hover:bg-green-700">Reply</Button>
                    <Button variant="outline">Forward</Button>
                  </div>
                  <Button variant="ghost" onClick={() => setShowEmailDetail(false)}>
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default EmailsPage;
