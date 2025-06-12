export const API_ROUTES = {
	AUTH: {
		LOGIN: "/login/",
		SIGNUP: "/register/",
	},
	USER: {
		PROFILE: "/user/profile/",
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
