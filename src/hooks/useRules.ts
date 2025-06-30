import { useState, useEffect } from "react";
import { toast } from "sonner";
import apiCaller from "@/lib/ApiCaller";
import { API_ROUTES } from "@/constants/ApiRoutes";
import { Rule } from "@/types/rules";

export const useRules = () => {
	const [rules, setRules] = useState<Rule[]>([]);
	const [loading, setLoading] = useState(false);

	// Fetch all rules
	const fetchRules = async () => {
		setLoading(true);
		try {
			const response = await apiCaller(API_ROUTES.GMAIL.RULES, "GET");
			setRules(response.data);
		} catch (error) {
			toast.error("Failed to fetch rules.");
			console.error("Error fetching rules:", error);
		} finally {
			setLoading(false);
		}
	};

	// Create a new rule
	const createRule = async (payload: Record<string, any>) => {
		try {
			const response = await apiCaller(API_ROUTES.GMAIL.RULES, "POST", payload);
			const newRule: Rule = response.data;
			setRules((prev) => [...prev, newRule]);
			toast.success("Rule created successfully!");
		} catch (error) {
			toast.error("Failed to create rule.");
			console.error("Error creating rule:", error);
			throw error;
		}
	};

	// Update an existing rule
	const updateRule = async (ruleId: number, payload: Record<string, any>) => {
		try {
			await apiCaller(`${API_ROUTES.GMAIL.RULES}${ruleId}/`, "PUT", payload);
			setRules((prev) =>
				prev.map((rule) =>
					rule.id === ruleId ? { ...rule, ...payload } : rule
				)
			);
			toast.success("Rule updated successfully!");
		} catch (error) {
			toast.error("Failed to update rule.");
			console.error("Error updating rule:", error);
			throw error;
		}
	};

	// Delete a rule
	const deleteRule = async (ruleId: number) => {
		try {
			await apiCaller(`${API_ROUTES.GMAIL.RULES}${ruleId}/`, "DELETE");
			setRules((prev) => prev.filter((rule) => rule.id !== ruleId));
			toast.success("Rule deleted successfully!");
		} catch (error) {
			toast.error("Failed to delete rule.");
			console.error("Error deleting rule:", error);
			throw error;
		}
	};

	// Save rule (create or update)
	const saveRule = async (payload: Record<string, any>, editingRule?: Rule | null) => {
		if (editingRule) {
			await updateRule(editingRule.id, payload);
		} else {
			await createRule(payload);
		}
	};

	useEffect(() => {
		fetchRules();
	}, []);

	return {
		rules,
		loading,
		fetchRules,
		createRule,
		updateRule,
		deleteRule,
		saveRule,
	};
}; 