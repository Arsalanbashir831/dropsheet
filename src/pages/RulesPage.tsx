
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Rule {
  id: number;
  name: string;
  keywordSubject: string;
  createdOn: string;
}

const RulesPage = () => {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 1,
      name: "CUI Emails",
      keywordSubject: "CUI",
      createdOn: "Jun 05, 2025"
    },
    {
      id: 2,
      name: "Invoice Filter",
      keywordSubject: "Invoice",
      createdOn: "Jun 04, 2025"
    },
    {
      id: 3,
      name: "Important Messages",
      keywordSubject: "Important",
      createdOn: "Jun 01, 2025"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    keywordSubject: ""
  });

  const handleCreateRule = () => {
    setEditingRule(null);
    setFormData({ name: "", keywordSubject: "" });
    setIsDialogOpen(true);
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      keywordSubject: rule.keywordSubject
    });
    setIsDialogOpen(true);
  };

  const handleSaveRule = () => {
    if (!formData.name || !formData.keywordSubject) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingRule) {
      setRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, name: formData.name, keywordSubject: formData.keywordSubject }
          : rule
      ));
      toast.success("Rule updated successfully!");
    } else {
      const newRule: Rule = {
        id: Date.now(),
        name: formData.name,
        keywordSubject: formData.keywordSubject,
        createdOn: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: '2-digit' 
        })
      };
      setRules(prev => [...prev, newRule]);
      toast.success("Rule created successfully!");
    }

    setIsDialogOpen(false);
  };

  const handleDeleteRule = (ruleId: number) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
    toast.success("Rule deleted successfully!");
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Dashboard / Rules
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage Filter Rules
            </h1>
            <p className="text-gray-600">
              Create and manage rules to filter your emails for spreadsheet export.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreateRule} className="bg-green-600 hover:bg-green-700">
                + New Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>
                  {editingRule ? "Edit Rule" : "Create New Rule"}
                </DialogTitle>
                <DialogDescription>
                  Define the rule name and keyword for filtering your emails.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ruleName">Rule Name *</Label>
                  <Input
                    id="ruleName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter rule name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywordSubject">Keyword Subject *</Label>
                  <Input
                    id="keywordSubject"
                    value={formData.keywordSubject}
                    onChange={(e) => setFormData(prev => ({ ...prev, keywordSubject: e.target.value }))}
                    placeholder="Enter keyword for subject"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRule} className="bg-green-600 hover:bg-green-700">
                  {editingRule ? "Update Rule" : "Save Rule"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rules Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Rules</CardTitle>
          </CardHeader>
          <CardContent>
            {rules.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No rules defined yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first rule to start filtering emails.
                </p>
                <Button onClick={handleCreateRule} className="bg-green-600 hover:bg-green-700">
                  + New Rule
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Keyword Subject</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.keywordSubject}</TableCell>
                      <TableCell>{rule.createdOn}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditRule(rule)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteRule(rule.id)}
                          >
                            Delete
                          </Button>
                        </div>
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

export default RulesPage;
