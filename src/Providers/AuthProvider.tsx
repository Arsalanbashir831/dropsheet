import React, { ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiCaller from "@/lib/ApiCaller";
import { API_ROUTES } from "@/constants/ApiRoutes";
import { AuthContext, UserProfile } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const refreshToken = localStorage.getItem("refreshToken");

	// Profile query
	const {
		data: user,
		isLoading: userLoading,
		isError: userError,
	} = useQuery<UserProfile>({
		queryKey: ["userProfile"],
		queryFn: async () => {
			const res = await apiCaller(API_ROUTES.USER.PROFILE, "GET");
			const { username, email, date_joined } = res.data;
			return {
				username,
				email,
				dateJoined: new Date(date_joined).toLocaleDateString(),
			};
		},
		enabled: Boolean(refreshToken),
		staleTime: 5 * 60 * 1000,
	});

	// Fetch subscription status
	const {
		data: subscription,
		isLoading: subLoading,
		isError: subError,
	} = useQuery({
		queryKey: ["subscriptionStatus"],
		queryFn: async () => {
			const res = await apiCaller(API_ROUTES.BILLING.STATUS, "GET");
			return res.data;
		},
		enabled: Boolean(refreshToken),
		staleTime: 5 * 60 * 1000,
	});

	// Login mutation
	const loginMutation = useMutation({
		mutationFn: (credentials: { username: string; password: string }) =>
			apiCaller(API_ROUTES.AUTH.LOGIN, "POST", credentials),
		onSuccess: ({ data }) => {
			localStorage.setItem("accessToken", data.access);
			localStorage.setItem("refreshToken", data.refresh);
			queryClient.invalidateQueries({ queryKey: ["userProfile"] });
		},
	});

	// Signup mutation
	const signupMutation = useMutation({
		mutationFn: (info: { username: string; email: string; password: string }) =>
			apiCaller(API_ROUTES.AUTH.SIGNUP, "POST", info),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userProfile"] });
			navigate(ROUTES.PAGES.LOGIN);
		},
	});

	const login = async (username: string, password: string) => {
		await loginMutation.mutateAsync({ username, password });
	};

	const signup = async (username: string, email: string, password: string) => {
		await signupMutation.mutateAsync({ username, email, password });
	};

	// Logout
	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		queryClient.removeQueries({ queryKey: ["userProfile"] });

		navigate(ROUTES.PAGES.LOGIN);
	};

	return (
		<AuthContext.Provider
			value={{
				user: user ?? null,
				userLoading,
				userError,
				subscription: subscription ?? null,
				subLoading,
				subError,
				login,
				signup,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
