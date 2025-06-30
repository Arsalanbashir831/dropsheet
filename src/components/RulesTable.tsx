import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Rule } from "@/types/rules";
import { getRuleDisplayInfo } from "@/utils/ruleUtils";

interface RulesTableProps {
	rules: Rule[];
	onEditRule: (rule: Rule) => void;
	onDeleteRule: (ruleId: number) => void;
	onCreateRule: () => void;
}

const RulesTable = ({ rules, onEditRule, onDeleteRule, onCreateRule }: RulesTableProps) => {
	if (rules.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Your Rules</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center py-12">
						<div className="text-6xl mb-4">🔍</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							No rules defined yet
						</h3>
						<p className="text-gray-600 mb-6">
							Create your first rule to start filtering emails.
						</p>
						<Button
							onClick={onCreateRule}
							className="bg-green-600 hover:bg-green-700">
							+ New Rule
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Rules</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Rule Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Details</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rules.map((rule) => {
							const displayInfo = getRuleDisplayInfo(rule);
							return (
								<TableRow key={rule.id}>
									<TableCell className="font-medium">{rule.name}</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<span>{displayInfo.icon}</span>
											<span>{displayInfo.type}</span>
										</div>
									</TableCell>
									<TableCell className="max-w-xs truncate">
										{displayInfo.details}
									</TableCell>
									<TableCell>
										<span className={`px-2 py-1 rounded-full text-xs ${
											rule.is_active 
												? "bg-green-100 text-green-800" 
												: "bg-gray-100 text-gray-800"
										}`}>
											{rule.is_active ? "Active" : "Inactive"}
										</span>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => onEditRule(rule)}>
												Edit
											</Button>
											<Button
												variant="ghost"
												size="sm"
												className="text-red-600 hover:text-red-700"
												onClick={() => onDeleteRule(rule.id)}>
												Delete
											</Button>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default RulesTable; 