// Filter type definitions
export type FilterType = 
	| "subject_only"
	| "sender_only" 
	| "body_only"
	| "domain_exclude"
	| "time_based"
	| "multiple_fields";

export type MatchType = "contains" | "exact" | "starts_with" | "ends_with";

// Base interface for all filter rules
export interface BaseRule {
	id: number;
	name: string;
	is_active: boolean;
}

// Specific filter interfaces
export interface SubjectOnlyRule extends BaseRule {
	subject_match_type: MatchType;
	subject_value: string;
}

export interface SenderOnlyRule extends BaseRule {
	sender_match_type: MatchType;
	sender_value: string;
}

export interface BodyOnlyRule extends BaseRule {
	body_match_type: MatchType;
	body_value: string;
}

export interface DomainExcludeRule extends BaseRule {
	sender_domain: string;
	exclude_domains: string;
}

export interface TimeBasedRule extends BaseRule {
	received_after: string;
	received_before: string;
}

export interface MultipleFieldsRule extends BaseRule {
	subject_match_type?: MatchType;
	subject_value?: string;
	sender_match_type?: MatchType;
	sender_value?: string;
	body_match_type?: MatchType;
	body_value?: string;
	sender_domain?: string;
	exclude_domains?: string;
	received_after?: string;
	received_before?: string;
}

// Union type for all possible rules
export type Rule = SubjectOnlyRule | SenderOnlyRule | BodyOnlyRule | DomainExcludeRule | TimeBasedRule | MultipleFieldsRule;

// Filter field configuration
export interface FilterField {
	name: string;
	label: string;
	type: "text" | "textarea" | "select" | "date" | "switch";
	required?: boolean;
	options?: { value: string; label: string }[];
	placeholder?: string;
	helpText?: string;
}

// Filter type configuration
export interface FilterTypeConfig {
	label: string;
	description: string;
	icon: string;
	fields: FilterField[];
}

// Form data type
export interface RuleFormData {
	name: string;
	is_active: boolean;
	[key: string]: any;
} 