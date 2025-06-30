import { FilterTypeConfig, FilterType } from "@/types/rules";

// Filter type configurations
export const FILTER_TYPE_CONFIGS: Record<FilterType, FilterTypeConfig> = {
	subject_only: {
		label: "Subject Only",
		description: "Filter emails based on subject line content",
		icon: "📧",
		fields: [
			{
				name: "subject_match_type",
				label: "Match Type",
				type: "select",
				required: true,
				options: [
					{ value: "contains", label: "Contains" },
					{ value: "exact", label: "Exact Match" },
					{ value: "starts_with", label: "Starts With" },
					{ value: "ends_with", label: "Ends With" },
				],
			},
			{
				name: "subject_value",
				label: "Subject Value",
				type: "text",
				required: true,
				placeholder: "Enter subject keyword or phrase",
			},
		],
	},
	sender_only: {
		label: "Sender Only",
		description: "Filter emails based on sender information",
		icon: "👤",
		fields: [
			{
				name: "sender_match_type",
				label: "Match Type",
				type: "select",
				required: true,
				options: [
					{ value: "contains", label: "Contains" },
					{ value: "exact", label: "Exact Match" },
					{ value: "starts_with", label: "Starts With" },
					{ value: "ends_with", label: "Ends With" },
				],
			},
			{
				name: "sender_value",
				label: "Sender Value",
				type: "text",
				required: true,
				placeholder: "Enter sender email or domain",
			},
		],
	},
	body_only: {
		label: "Body Only",
		description: "Filter emails based on email body content",
		icon: "📝",
		fields: [
			{
				name: "body_match_type",
				label: "Match Type",
				type: "select",
				required: true,
				options: [
					{ value: "contains", label: "Contains" },
					{ value: "exact", label: "Exact Match" },
					{ value: "starts_with", label: "Starts With" },
					{ value: "ends_with", label: "Ends With" },
				],
			},
			{
				name: "body_value",
				label: "Body Value",
				type: "textarea",
				required: true,
				placeholder: "Enter text to search in email body",
			},
		],
	},
	domain_exclude: {
		label: "Domain / Exclude Domain",
		description: "Filter emails based on sender domains",
		icon: "🌐",
		fields: [
			{
				name: "sender_domain",
				label: "Include Domain",
				type: "text",
				required: false,
				placeholder: "example.com (optional)",
				helpText: "Leave empty to include all domains",
			},
			{
				name: "exclude_domains",
				label: "Exclude Domains",
				type: "textarea",
				required: false,
				placeholder: "spam.com, advertising.com",
				helpText: "Comma-separated list of domains to exclude",
			},
		],
	},
	time_based: {
		label: "Time Based",
		description: "Filter emails based on received date range",
		icon: "⏰",
		fields: [
			{
				name: "received_after",
				label: "Received After",
				type: "date",
				required: false,
				helpText: "Leave empty for no start date",
			},
			{
				name: "received_before",
				label: "Received Before",
				type: "date",
				required: false,
				helpText: "Leave empty for no end date",
			},
		],
	},
	multiple_fields: {
		label: "Multiple Fields",
		description: "Combine multiple filter criteria",
		icon: "🔗",
		fields: [
			{
				name: "subject_match_type",
				label: "Subject Match Type",
				type: "select",
				required: false,
				options: [
					{ value: "contains", label: "Contains" },
					{ value: "exact", label: "Exact Match" },
					{ value: "starts_with", label: "Starts With" },
					{ value: "ends_with", label: "Ends With" },
				],
			},
			{
				name: "subject_value",
				label: "Subject Value",
				type: "text",
				required: false,
				placeholder: "Enter subject keyword",
			},
			{
				name: "sender_match_type",
				label: "Sender Match Type",
				type: "select",
				required: false,
				options: [
					{ value: "contains", label: "Contains" },
					{ value: "exact", label: "Exact Match" },
					{ value: "starts_with", label: "Starts With" },
					{ value: "ends_with", label: "Ends With" },
				],
			},
			{
				name: "sender_value",
				label: "Sender Value",
				type: "text",
				required: false,
				placeholder: "Enter sender email or domain",
			},
			{
				name: "body_match_type",
				label: "Body Match Type",
				type: "select",
				required: false,
				options: [
					{ value: "contains", label: "Contains" },
					{ value: "exact", label: "Exact Match" },
					{ value: "starts_with", label: "Starts With" },
					{ value: "ends_with", label: "Ends With" },
				],
			},
			{
				name: "body_value",
				label: "Body Value",
				type: "textarea",
				required: false,
				placeholder: "Enter text to search in email body",
			},
			{
				name: "sender_domain",
				label: "Include Domain",
				type: "text",
				required: false,
				placeholder: "example.com",
			},
			{
				name: "exclude_domains",
				label: "Exclude Domains",
				type: "textarea",
				required: false,
				placeholder: "spam.com, advertising.com",
			},
			{
				name: "received_after",
				label: "Received After",
				type: "date",
				required: false,
			},
			{
				name: "received_before",
				label: "Received Before",
				type: "date",
				required: false,
			},
		],
	},
}; 