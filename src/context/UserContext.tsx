import { createContext } from "react";

// Define the shape of user data
export interface UserProfile {
	username: string;
	email: string;
	dateJoined: string;
}

// Context value type
export interface UserContextValue {
	user: UserProfile | null;
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
}

// Create context
export const UserContext = createContext<UserContextValue | undefined>(
	undefined
);
