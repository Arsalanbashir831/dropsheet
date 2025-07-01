import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import apiCaller from "@/lib/ApiCaller"; // Import your API caller
import { API_ROUTES } from "@/constants/ApiRoutes"; // Import your API routes
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface Rule {
	id: number;
	name: string;
	keyword_subject: string;
	google_sheet_id: string;
}

const FilteringPage = () => {
	const [rules, setRules] = useState<Rule[]>([]);
	const [selectedRule, setSelectedRule] = useState<string>("");
	const [showResult, setShowResult] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);

	// Fetch rules from API on page load
	const fetchRules = async () => {
		try {
			const response = await apiCaller(API_ROUTES.GMAIL.RULES, "GET");
			setRules(response.data); // Set fetched rules to state
		} catch (error) {
			toast.error("Failed to fetch rules.");
			console.error("Error fetching rules:", error);
		}
	};

	useEffect(() => {
		fetchRules(); // Fetch rules when the page loads
	}, []);

	const handleGenerateSheetDrop = async () => {
		if (!selectedRule) {
			toast.error("Please select a rule first");
			return;
		}

		const rule = rules.find((r) => r.id.toString() === selectedRule);
		if (!rule) {
			toast.error("Selected rule not found");
			return;
		}

		if (!rule.google_sheet_id) {
			toast.info("Please wait up to 10 minutes while your Google Sheet is being generated.");
			return;
		}

		setIsGenerating(true);

		// Simulate API call to generate SheetDrop (replace with real API if needed)
		setTimeout(() => {
			setIsGenerating(false);
			setShowResult(true);
			toast.success("SheetDrop generated successfully!");
		}, 2000);
	};

	const handleCopyLink = (googleSheetId: string) => {
		const sheetLink = `https://docs.google.com/spreadsheets/d/${googleSheetId}`;
		navigator.clipboard.writeText(sheetLink);
		toast.success("Link copied to clipboard!");
	};

	return (
		<Layout>
			<div className="max-w-4xl mx-auto px-6 py-8">
				{/* Breadcrumb */}
				<nav className="text-sm text-gray-600 mb-6">Dashboard / Filtering</nav>

				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Filter Emails & Generate SheetDrop
					</h1>
					<p className="text-gray-600">
						Select a rule to filter your emails and generate a spreadsheet
						export.
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
											<SelectItem key={rule.id} value={rule.id.toString()}>
												{rule.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{rules.length === 0 && (
								<p className="text-sm text-gray-600">
									<Link
										to={ROUTES.PAGES.RULES}
										className="text-green-600 hover:underline">
										Create a rule first
									</Link>
								</p>
							)}
						</CardContent>
					</Card>

					{/* Generate SheetDrop */}
					<Card>
						<CardHeader>
							<CardTitle>Generate SheetDrop</CardTitle>
							<CardDescription>
								Create a Google Sheets export of your filtered emails.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Button
								onClick={handleGenerateSheetDrop}
								disabled={!selectedRule || isGenerating}
								className="bg-green-600 hover:bg-green-700">
								{isGenerating ? "Generating..." : "Generate SheetDrop"}
							</Button>

							{/* Success Result */}
							{showResult && selectedRule && (
								<Card className="border-green-200 bg-green-50">
									<CardContent className="pt-6">
										<div className="flex items-start space-x-4">
											<div className="text-4xl">📄</div>
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-green-800 mb-2">
													Your SheetDrop is Ready!
												</h3>
												<p className="text-green-700 mb-4">
													Your filtered emails have been exported to a Google
													Sheet.
												</p>
												<div className="flex gap-3">
													<Button
														asChild
														className="bg-green-600 hover:bg-green-700"
														disabled={!rules.find((rule) => rule.id.toString() === selectedRule)?.google_sheet_id}
													>
														<a
															href={`https://docs.google.com/spreadsheets/d/${
																rules.find(
																	(rule) => rule.id.toString() === selectedRule
																)?.google_sheet_id
															}`}
															target="_blank"
															rel="noopener noreferrer">
															Open Google Sheet
														</a>
													</Button>
													<Button
														variant="outline"
														disabled={!rules.find((rule) => rule.id.toString() === selectedRule)?.google_sheet_id}
														onClick={() =>
															handleCopyLink(
																rules.find(
																	(rule) => rule.id.toString() === selectedRule
																)?.google_sheet_id || ""
															)
														}
													>
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
									<strong>Note:</strong> Each rule has its own unique SheetDrop.
									You can manage your rules in the{" "}
									<Link
										to={ROUTES.PAGES.RULES}
										className="text-green-600 hover:underline">
										Rules page
									</Link>
									.
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
