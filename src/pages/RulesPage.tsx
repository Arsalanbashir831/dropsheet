import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import RuleFormDialog from "@/components/RuleFormDialog";
import RulesTable from "@/components/RulesTable";
import { useRules } from "@/hooks/useRules";
import { Rule } from "@/types/rules";

const RulesPage = () => {
	const { rules, loading, saveRule, deleteRule } = useRules();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingRule, setEditingRule] = useState<Rule | null>(null);

	// Handle Create Rule button
	const handleCreateRule = () => {
		setEditingRule(null);
		setIsDialogOpen(true);
	};

	// Handle Edit Rule button
	const handleEditRule = (rule: Rule) => {
		setEditingRule(rule);
		setIsDialogOpen(true);
	};

	// Handle saving a rule (either create or update)
	const handleSaveRule = async (payload: Record<string, any>) => {
		await saveRule(payload, editingRule);
	};

	// Handle Delete Rule button
	const handleDeleteRule = async (ruleId: number) => {
		await deleteRule(ruleId);
	};

	// Handle dialog close
	const handleDialogClose = () => {
		setIsDialogOpen(false);
		setEditingRule(null);
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
							Create and manage advanced rules to filter your emails for spreadsheet export.
						</p>
					</div>
					<Button
						onClick={handleCreateRule}
						className="bg-green-600 hover:bg-green-700">
						+ New Rule
					</Button>
				</div>

				{/* Rules Table */}
				{loading ? (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
					</div>
				) : (
					<RulesTable
						rules={rules}
						onEditRule={handleEditRule}
						onDeleteRule={handleDeleteRule}
						onCreateRule={handleCreateRule}
					/>
				)}

				{/* Rule Form Dialog */}
				<RuleFormDialog
					isOpen={isDialogOpen}
					onClose={handleDialogClose}
					editingRule={editingRule}
					onSave={handleSaveRule}
				/>
			</div>
		</Layout>
	);
};

export default RulesPage;