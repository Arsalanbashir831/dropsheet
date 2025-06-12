import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import type { UserContextValue } from "../context/UserContext";

export const useUser = (): UserContextValue => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
