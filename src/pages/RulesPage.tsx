import { useEffect, useState } from "react";
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
	TableRow,
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
import apiCaller from "@/lib/ApiCaller"; // Import your API caller
import { API_ROUTES } from "@/constants/ApiRoutes"; // Import your API routes

interface Rule {
	id: number;
	name: string;
	keyword_subject: string;
}

const RulesPage = () => {
	const [rules, setRules] = useState<Rule[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingRule, setEditingRule] = useState<Rule | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		keyword_subject: "",
	});

	// Fetch all rules from /gmail/rules/
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
		fetchRules(); // Fetch rules on page load
	}, []);

	// Handle Create Rule button
	const handleCreateRule = () => {
		setEditingRule(null);
		setFormData({ name: "", keyword_subject: "" });
		setIsDialogOpen(true);
	};

	// Handle Edit Rule button
	const handleEditRule = (rule: Rule) => {
		setEditingRule(rule);
		setFormData({
			name: rule.name,
			keyword_subject: rule.keyword_subject,
		});
		setIsDialogOpen(true);
	};

	// Handle saving a rule (either create or update)
	const handleSaveRule = async () => {
		if (!formData.name || !formData.keyword_subject) {
			toast.error("Please fill in all required fields");
			return;
		}

		if (editingRule) {
			// Update rule
			try {
				await apiCaller(
					`${API_ROUTES.GMAIL.RULES}${editingRule.id}/`,
					"PUT",
					formData
				);
				setRules((prev) =>
					prev.map((rule) =>
						rule.id === editingRule.id
							? {
									...rule,
									name: formData.name,
									keyword_subject: formData.keyword_subject,
							  }
							: rule
					)
				);
				toast.success("Rule updated successfully!");
			} catch (error) {
				toast.error("Failed to update rule.");
				console.error("Error updating rule:", error);
			}
		} else {
			// Create new rule
			try {
				const response = await apiCaller(
					API_ROUTES.GMAIL.RULES,
					"POST",
					formData
				);
				const newRule: Rule = {
					...response.data,
				};
				setRules((prev) => [...prev, newRule]);
				toast.success("Rule created successfully!");
			} catch (error) {
				toast.error("Failed to create rule.");
				console.error("Error creating rule:", error);
			}
		}

		setIsDialogOpen(false);
	};

	// Handle Delete Rule button
	const handleDeleteRule = async (ruleId: number) => {
		try {
			await apiCaller(`${API_ROUTES.GMAIL.RULES}/${ruleId}`, "DELETE");
			setRules((prev) => prev.filter((rule) => rule.id !== ruleId));
			toast.success("Rule deleted successfully!");
		} catch (error) {
			toast.error("Failed to delete rule.");
			console.error("Error deleting rule:", error);
		}
	};

	return (
		<Layout>
			<div className="max-w-7xl mx-auto px-6 py-8">
				{/* Breadcrumb */}
				<nav className="text-sm text-gray-600 mb-6">Dashboard / Rules</nav>

				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Manage Filter Rules
						</h1>
						<p className="text-gray-600">
							Create and manage rules to filter your emails for spreadsheet
							export.
						</p>
					</div>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button
								onClick={handleCreateRule}
								className="bg-green-600 hover:bg-green-700">
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
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, name: e.target.value }))
										}
										placeholder="Enter rule name"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="keyword_subject">Keyword Subject *</Label>
									<Input
										id="keyword_subject"
										value={formData.keyword_subject}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												keyword_subject: e.target.value,
											}))
										}
										placeholder="Enter keyword for subject"
									/>
								</div>
							</div>

							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setIsDialogOpen(false)}>
									Cancel
								</Button>
								<Button
									onClick={handleSaveRule}
									className="bg-green-600 hover:bg-green-700">
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
								<Button
									onClick={handleCreateRule}
									className="bg-green-600 hover:bg-green-700">
									+ New Rule
								</Button>
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Rule Name</TableHead>
										<TableHead>Keyword Subject</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{rules.map((rule) => (
										<TableRow key={rule.id}>
											<TableCell className="font-medium">{rule.name}</TableCell>
											<TableCell>{rule.keyword_subject}</TableCell>
											<TableCell className="text-right">
												<div className="flex justify-end gap-2">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleEditRule(rule)}>
														Edit
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="text-red-600 hover:text-red-700"
														onClick={() => handleDeleteRule(rule.id)}>
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
