import { createContext } from "react";

export interface UserProfile {
	username: string;
	email: string;
	dateJoined: string;
}

export interface AuthContextType {
	user: UserProfile | null;
	loading: boolean;
	error: unknown;
	login: (username: string, password: string) => Promise<void>;
	signup: (username: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
