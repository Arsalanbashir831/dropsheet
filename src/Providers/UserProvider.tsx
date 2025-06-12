import React, { useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import apiCaller from "@/lib/ApiCaller";
import { API_ROUTES } from "@/constants/ApiRoutes";
import { UserContext, UserProfile } from "../context/UserContext";

// Provider props
interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["userProfile"],
		queryFn: () => apiCaller(API_ROUTES.USER.PROFILE, "GET", {}, {}, true),
		staleTime: 1000 * 60 * 5,
	});

	const [user, setUser] = useState<UserProfile | null>(null);

	useEffect(() => {
		if (data && !isLoading && !isError) {
			const { username, email, date_joined } = data.data;
			setUser({
				username,
				email,
				dateJoined: new Date(date_joined).toLocaleDateString(),
			});
		}
	}, [data, isLoading, isError]);

	return (
		<UserContext.Provider value={{ user, isLoading, isError, refetch }}>
			{children}
		</UserContext.Provider>
	);
};
