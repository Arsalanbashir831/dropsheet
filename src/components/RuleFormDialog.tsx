import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import RuleFormField from "./RuleFormField";
import { FilterType, Rule } from "@/types/rules";
import { FILTER_TYPE_CONFIGS } from "@/constants/filterConfigs";
import { validateFormData, preparePayload, initializeFormData, determineFilterType } from "@/utils/ruleUtils";

interface RuleFormDialogProps {
	isOpen: boolean;
	onClose: () => void;
	editingRule: Rule | null;
	onSave: (payload: Record<string, any>) => Promise<void>;
}

const RuleFormDialog = ({ isOpen, onClose, editingRule, onSave }: RuleFormDialogProps) => {
	const [selectedFilterType, setSelectedFilterType] = useState<FilterType>("subject_only");
	const [formData, setFormData] = useState<Record<string, any>>({
		name: "",
		is_active: true,
	});

	console.log("Rule form dialog")

	// Reset form when filter type changes or editing rule changes
	useEffect(() => {
		if (editingRule) {
			// Determine filter type from rule properties
			const filterType = determineFilterType(editingRule);
			setSelectedFilterType(filterType);
			setFormData(editingRule);
		} else {
			setSelectedFilterType("subject_only");
			const initialData = initializeFormData("subject_only");
			setFormData(initialData);
		}
	}, [editingRule]);

	// Reset form when filter type changes (for new rules)
	useEffect(() => {
		if (!editingRule) {
			const initialData = initializeFormData(selectedFilterType);
			setFormData(initialData);
		}
	}, [selectedFilterType, editingRule]);

	// Handle form field changes
	const handleFieldChange = (fieldName: string, value: any) => {
		setFormData(prev => ({
			...prev,
			[fieldName]: value,
		}));
	};

	// Handle saving the rule
	const handleSave = async () => {
		const validation = validateFormData(formData, selectedFilterType);
		if (!validation.isValid) {
			toast.error(validation.error);
			return;
		}

		const payload = preparePayload(formData, selectedFilterType);
		await onSave(payload);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>
						{editingRule ? "Edit Rule" : "Create New Rule"}
					</DialogTitle>
					<DialogDescription>
						Choose a filter type and configure the rule parameters.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Filter Type Selection */}
					{!editingRule ? (
						<div className="space-y-2">
							<Label>Filter Type</Label>
							<Tabs value={selectedFilterType} onValueChange={(value) => setSelectedFilterType(value as FilterType)}>
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="subject_only">Subject</TabsTrigger>
									<TabsTrigger value="sender_only">Sender</TabsTrigger>
									<TabsTrigger value="body_only">Body</TabsTrigger>
								</TabsList>
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="domain_exclude">Domain</TabsTrigger>
									<TabsTrigger value="time_based">Time</TabsTrigger>
									<TabsTrigger value="multiple_fields">Multiple</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
					) : (
						<div className="space-y-2">
							<Label>Filter Type</Label>
							<div className="p-2 bg-gray-100 rounded text-gray-700 font-medium flex items-center gap-2">
								<span className="text-xl">{FILTER_TYPE_CONFIGS[selectedFilterType].icon}</span>
								{FILTER_TYPE_CONFIGS[selectedFilterType].label}
							</div>
						</div>
					)}

					{/* Filter Type Description */}
					<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
						<span className="text-2xl">{FILTER_TYPE_CONFIGS[selectedFilterType].icon}</span>
						<div>
							<h4 className="font-medium">{FILTER_TYPE_CONFIGS[selectedFilterType].label}</h4>
							<p className="text-sm text-gray-600">{FILTER_TYPE_CONFIGS[selectedFilterType].description}</p>
						</div>
					</div>

					{/* Form Fields */}
					<div className="space-y-4">
						{/* Rule Name */}
						<div className="space-y-2">
							<Label htmlFor="ruleName">Rule Name *</Label>
							<Input
								id="ruleName"
								value={formData.name}
								onChange={(e) => handleFieldChange("name", e.target.value)}
								placeholder="Enter rule name"
							/>
						</div>

						{/* Active Status */}
						<div className="flex items-center space-x-2">
							<Switch
								checked={formData.is_active}
								onCheckedChange={(checked) => handleFieldChange("is_active", checked)}
							/>
							<Label>Active</Label>
						</div>

						{/* Dynamic Fields */}
						{FILTER_TYPE_CONFIGS[selectedFilterType].fields.map((field) => (
							<RuleFormField
								key={field.name}
								field={field}
								value={formData[field.name]}
								onChange={handleFieldChange}
							/>
						))}
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
						{editingRule ? "Update Rule" : "Save Rule"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default RuleFormDialog; 