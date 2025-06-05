
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Rule {
  id: number;
  name: string;
  condition: string;
  createdOn: string;
}

const RulesPage = () => {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 1,
      name: "CUI Emails",
      condition: "Subject contains 'CUI'",
      createdOn: "Jun 05, 2025"
    },
    {
      id: 2,
      name: "Invoice Filter",
      condition: "Subject contains 'Invoice'",
      createdOn: "Jun 04, 2025"
    },
    {
      id: 3,
      name: "Has Attachments",
      condition: "Has attachment",
      createdOn: "Jun 01, 2025"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    conditionType: "",
    conditionValue: ""
  });

  const conditionTypes = [
    { value: "subject_contains", label: "Subject contains" },
    { value: "sender_is", label: "Sender is" },
    { value: "date_before", label: "Date before" },
    { value: "date_after", label: "Date after" },
    { value: "label_is", label: "Label is" },
    { value: "has_attachment", label: "Has attachment" },
    { value: "custom_query", label: "Custom query" }
  ];

  const handleCreateRule = () => {
    setEditingRule(null);
    setFormData({ name: "", conditionType: "", conditionValue: "" });
    setIsDialogOpen(true);
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      conditionType: "subject_contains", // Default for demo
      conditionValue: ""
    });
    setIsDialogOpen(true);
  };

  const handleSaveRule = () => {
    if (!formData.name || !formData.conditionType) {
      toast.error("Please fill in all required fields");
      return;
    }

    const conditionLabel = conditionTypes.find(t => t.value === formData.conditionType)?.label;
    const condition = formData.conditionValue 
      ? `${conditionLabel} '${formData.conditionValue}'`
      : conditionLabel;

    if (editingRule) {
      setRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, name: formData.name, condition: condition || "" }
          : rule
      ));
      toast.success("Rule updated successfully!");
    } else {
      const newRule: Rule = {
        id: Date.now(),
        name: formData.name,
        condition: condition || "",
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
                  Define the conditions for filtering your emails.
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
                  <Label htmlFor="conditionType">Condition Type *</Label>
                  <Select 
                    value={formData.conditionType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, conditionType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {conditionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.conditionType && formData.conditionType !== "has_attachment" && (
                  <div className="space-y-2">
                    <Label htmlFor="conditionValue">Condition Value</Label>
                    <Input
                      id="conditionValue"
                      value={formData.conditionValue}
                      onChange={(e) => setFormData(prev => ({ ...prev, conditionValue: e.target.value }))}
                      placeholder="Enter condition value"
                    />
                  </div>
                )}
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
                    <TableHead>Condition</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.condition}</TableCell>
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
