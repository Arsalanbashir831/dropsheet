import { Rule, FilterType } from "@/types/rules";
import { FILTER_TYPE_CONFIGS } from "@/constants/filterConfigs";

// Determine filter type from rule properties
export const determineFilterType = (rule: Rule): FilterType => {
	const hasSubject = 'subject_value' in rule && !!rule.subject_value;
	const hasSender = 'sender_value' in rule && !!rule.sender_value;
	const hasBody = 'body_value' in rule && !!rule.body_value;
	const hasDomain = 'sender_domain' in rule && !!rule.sender_domain;
	const hasExclude = 'exclude_domains' in rule && !!rule.exclude_domains;
	const hasAfter = 'received_after' in rule && !!rule.received_after;
	const hasBefore = 'received_before' in rule && !!rule.received_before;

	const mainFields = [hasSubject, hasSender, hasBody, hasDomain, hasExclude, hasAfter, hasBefore];
	const count = mainFields.filter(Boolean).length;

	if (count === 1) {
		if (hasSubject) return "subject_only";
		if (hasSender) return "sender_only";
		if (hasBody) return "body_only";
		if (hasDomain || hasExclude) return "domain_exclude";
		if (hasAfter || hasBefore) return "time_based";
	}

	// If only domain/exclude is set (and not subject/sender/body/time)
	if ((hasDomain || hasExclude) && !hasSubject && !hasSender && !hasBody && !hasAfter && !hasBefore) {
		return "domain_exclude";
	}

	// If only time fields are set
	if ((hasAfter || hasBefore) && !hasSubject && !hasSender && !hasBody && !hasDomain && !hasExclude) {
		return "time_based";
	}

	// If only one of subject/sender/body is set
	if (hasSubject && !hasSender && !hasBody && !hasDomain && !hasExclude && !hasAfter && !hasBefore) {
		return "subject_only";
	}
	if (hasSender && !hasSubject && !hasBody && !hasDomain && !hasExclude && !hasAfter && !hasBefore) {
		return "sender_only";
	}
	if (hasBody && !hasSubject && !hasSender && !hasDomain && !hasExclude && !hasAfter && !hasBefore) {
		return "body_only";
	}

	// Otherwise, it's a combination
	return "multiple_fields";
};

// Format ISO date to YYYY-MM-DD (or any preferred format)
function formatDate(iso: string | null | undefined) {
	if (!iso) return "";
	return iso.split("T")[0];
}

// Get rule display information
export const getRuleDisplayInfo = (rule: Rule) => {
	const filterType = determineFilterType(rule);
	const config = FILTER_TYPE_CONFIGS[filterType];
	
	let details = "";
	if ("subject_value" in rule && rule.subject_value) {
		details += `Subject: ${rule.subject_value} `;
	}
	if ("sender_value" in rule && rule.sender_value) {
		details += `Sender: ${rule.sender_value} `;
	}
	if ("body_value" in rule && rule.body_value) {
		details += `Body: ${rule.body_value} `;
	}
	if ("sender_domain" in rule && rule.sender_domain) {
		details += `Domain: ${rule.sender_domain} `;
	}
	if ("exclude_domains" in rule && rule.exclude_domains) {
		details += `Exclude: ${rule.exclude_domains} `;
	}

	// Time range
	const after = "received_after" in rule && rule.received_after ? formatDate(rule.received_after) : "";
	const before = "received_before" in rule && rule.received_before ? formatDate(rule.received_before) : "";
	if (after && before) {
		details += `Time: ${after} - ${before} `;
	} else if (after) {
		details += `After: ${after} `;
	} else if (before) {
		details += `Before: ${before} `;
	}

	return {
		type: config.label,
		icon: config.icon,
		details: details.trim(),
	};
};

// Prepare payload based on filter type
export const preparePayload = (formData: Record<string, any>, filterType: FilterType) => {
	const config = FILTER_TYPE_CONFIGS[filterType];
	const payload: Record<string, any> = {
		name: formData.name,
		is_active: formData.is_active,
	};

	config.fields.forEach(field => {
		if (formData[field.name] && formData[field.name].toString().trim()) {
			payload[field.name] = formData[field.name];
		}
	});

	return payload;
};

// Validate form data
export const validateFormData = (formData: Record<string, any>, filterType: FilterType): { isValid: boolean; error?: string } => {
	const config = FILTER_TYPE_CONFIGS[filterType];
	
	if (!formData.name?.trim()) {
		return { isValid: false, error: "Rule name is required" };
	}

	// Check if at least one field has a value (for multiple_fields)
	if (filterType === "multiple_fields") {
		const hasValue = config.fields.some(field => 
			field.name !== "name" && field.name !== "is_active" && 
			formData[field.name] && formData[field.name].toString().trim()
		);
		if (!hasValue) {
			return { isValid: false, error: "At least one filter field must have a value" };
		}
	} else {
		// Check required fields for other filter types
		const requiredFields = config.fields.filter(field => field.required);
		for (const field of requiredFields) {
			if (!formData[field.name] || !formData[field.name].toString().trim()) {
				return { isValid: false, error: `${field.label} is required` };
			}
		}
	}

	return { isValid: true };
};

// Initialize form data for a filter type
export const initializeFormData = (filterType: FilterType, editingRule?: Rule | null) => {
	if (editingRule) {
		return editingRule;
	}

	const config = FILTER_TYPE_CONFIGS[filterType];
	const initialData: Record<string, any> = {
		name: "",
		is_active: true,
	};
	
	config.fields.forEach(field => {
		initialData[field.name] = "";
	});
	
	return initialData;
}; 