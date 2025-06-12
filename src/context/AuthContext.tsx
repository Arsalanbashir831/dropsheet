import { createContext } from "react";

export interface UserProfile {
	username: string;
	email: string;
	dateJoined: string;
}

export interface SubscriptionStatus {
	in_trial: boolean;
	trial_ends: string;
	has_paid: boolean;
	access_granted: boolean;
	paid_at: string | null;
}

export interface AuthContextType {
	user: UserProfile | null;
	userLoading: boolean;
	userError: unknown;
	subscription: SubscriptionStatus | null;
	subLoading: boolean;
	subError: unknown;
	login: (username: string, password: string) => Promise<void>;
	signup: (username: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
