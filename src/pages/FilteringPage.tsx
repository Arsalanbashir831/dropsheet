
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const FilteringPage = () => {
  const [selectedRule, setSelectedRule] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const rules = [
    { id: "1", name: "CUI Emails" },
    { id: "2", name: "Invoice Filter" },
    { id: "3", name: "Important Messages" }
  ];

  const handleGenerateDropSheet = async () => {
    if (!selectedRule) {
      toast.error("Please select a rule first");
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
      toast.success("DropSheet generated successfully!");
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://docs.google.com/spreadsheets/d/1CUI_Emails_SAMPLE_LINK");
    toast.success("Link copied to clipboard!");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Dashboard / Filtering
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Filter Emails & Generate DropSheet
          </h1>
          <p className="text-gray-600">
            Select a rule to filter your emails and generate a spreadsheet export.
          </p>
        </div>

        <div className="space-y-6">
          {/* Rule Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Filter Rule</CardTitle>
              <CardDescription>
                Choose a rule to apply to your emails for filtering.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rule</label>
                <Select value={selectedRule} onValueChange={setSelectedRule}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="— Choose Rule —" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {rules.map((rule) => (
                      <SelectItem key={rule.id} value={rule.id}>
                        {rule.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {rules.length === 0 && (
                <p className="text-sm text-gray-600">
                  <a href="/rules" className="text-green-600 hover:underline">
                    Create a rule first
                  </a>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Generate DropSheet */}
          <Card>
            <CardHeader>
              <CardTitle>Generate DropSheet</CardTitle>
              <CardDescription>
                Create a Google Sheets export of your filtered emails.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleGenerateDropSheet}
                disabled={!selectedRule || isGenerating}
                className="bg-green-600 hover:bg-green-700"
              >
                {isGenerating ? "Generating..." : "Generate DropSheet"}
              </Button>

              {/* Success Result */}
              {showResult && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">📄</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          Your DropSheet is Ready!
                        </h3>
                        <p className="text-green-700 mb-4">
                          Your filtered emails have been exported to a Google Sheet.
                        </p>
                        <div className="flex gap-3">
                          <Button asChild className="bg-green-600 hover:bg-green-700">
                            <a 
                              href="https://docs.google.com/spreadsheets/d/1CUI_Emails_SAMPLE_LINK" 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Open Google Sheet
                            </a>
                          </Button>
                          <Button variant="outline" onClick={handleCopyLink}>
                            Copy Link
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info Note */}
              <Alert>
                <AlertDescription>
                  <strong>Note:</strong> Each rule has its own unique DropSheet. 
                  You can manage your rules in the{" "}
                  <a href="/rules" className="text-green-600 hover:underline">
                    Rules page
                  </a>.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FilteringPage;
