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
		STATUS: "/gmail/status/",
		DISCONNECT: "/gmail/disconnect/",
		RULES: "/gmail/rules/",
		DELETE_RULE: (id: number) => `/gmail/rules/${id}/`,
	},
	EMAILS: {
		GET: "/emails/",
	},
	BILLING: {
		PLANS: "/billing/plans/",
		STATUS: "/billing/status/",
		CHECKOUT_SESSION: "/billing/create-checkout-session/",
	},
} as const;
