import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FilterField } from "@/types/rules";

interface RuleFormFieldProps {
	field: FilterField;
	value: any;
	onChange: (fieldName: string, value: any) => void;
}

const RuleFormField = ({ field, value, onChange }: RuleFormFieldProps) => {
	const renderField = () => {
		switch (field.type) {
			case "text":
				return (
					<Input
						value={value || ""}
						onChange={(e) => onChange(field.name, e.target.value)}
						placeholder={field.placeholder}
					/>
				);
			case "textarea":
				return (
					<Textarea
						value={value || ""}
						onChange={(e) => onChange(field.name, e.target.value)}
						placeholder={field.placeholder}
						rows={3}
					/>
				);
			case "select":
				return (
					<Select
						value={value || ""}
						onValueChange={(value) => onChange(field.name, value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select option" />
						</SelectTrigger>
						<SelectContent>
							{field.options?.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			case "date":
				return (
					<Input
						type="datetime-local"
						value={value || ""}
						onChange={(e) => onChange(field.name, e.target.value)}
					/>
				);
			case "switch":
				return (
					<Switch
						checked={value || false}
						onCheckedChange={(checked) => onChange(field.name, checked)}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="space-y-2">
			<Label htmlFor={field.name}>
				{field.label} {field.required && "*"}
			</Label>
			{renderField()}
			{field.helpText && (
				<p className="text-sm text-gray-500">{field.helpText}</p>
			)}
		</div>
	);
};

export default RuleFormField; 