import { Ruler } from "lucide-react";

export const API_ROUTES = {
	AUTH: {
		LOGIN: "/login/",
		SIGNUP: "/register/",
	},
	GMAIL: {
		INIT: "/gmail/init/",
		RULES: "/gmail/rules/",
		DELETE_RULE: (id: number) => `/gmail/rules/${id}/`,
	},
	EMAILS: {
		GET: "/emails/",
	},
} as const;
