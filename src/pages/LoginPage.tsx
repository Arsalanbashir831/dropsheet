import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"; // Import useMutation from react-query
import apiCaller from "@/lib/ApiCaller";
import { API_ROUTES } from "@/constants/ApiRoutes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Define form data interface
interface FormData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const LoginPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	console.log("LoginPage rendered");
	console.log("Current formData:", formData);

	// Mutation for login
	const loginMutation = useMutation({
		mutationFn: (data: { username: string; password: string }) =>
			apiCaller(API_ROUTES.AUTH.LOGIN, "POST", data, {}, false),
		onError: (error: any) => {
			const msg = error?.response?.data?.detail || "Login failed!";
			toast.error(msg);
			console.error("Login error:", error);
		},
		onSuccess: (data) => {
			console.log("Login successful:", data);
			localStorage.setItem("accessToken", data.data.access);
			localStorage.setItem("refreshToken", data.data.refresh);
			toast.success("Logged in successfully!");
			navigate("/dashboard");
		},
	});

	// Mutation for signup
	const signupMutation = useMutation({
		mutationFn: (data: { username: string; email: string; password: string }) =>
			apiCaller(API_ROUTES.AUTH.SIGNUP, "POST", data, {}, false),
		onError: (error: any) => {
			const msg = error?.response?.data?.detail || "Signup failed!";
			toast.error(msg);
			console.error("Signup error:", error);
		},
		onSuccess: () => {
			console.log("Signup successful");
			toast.success("Account created successfully!");
			// Auto-login after signup
			loginMutation.mutate({
				username: formData.name,
				password: formData.password,
			});
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Ensure passwords match only when signing up
		if (!isLogin && formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		// Check if username is empty before sending the request
		if (!formData.name.trim()) {
			toast.error("Username is required!");
			return;
		}

		// Use the mutate method for login/signup
		if (isLogin) {
			loginMutation.mutate({
				username: formData.name,
				password: formData.password,
			});
		} else {
			signupMutation.mutate({
				username: formData.name, // Use name for signup
				email: formData.email,
				password: formData.password,
			});
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="text-3xl font-bold text-green-600 mb-2">
						DropSheet
					</div>
					<CardTitle className="text-2xl text-gray-900">
						{isLogin ? "Welcome Back!" : "Create Your Account"}
					</CardTitle>
					<CardDescription>
						{isLogin
							? "Sign in to your account to continue"
							: "Get started with DropSheet today"}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Conditional username input */}
						<div className="space-y-2">
							<Label htmlFor="name">Username</Label>
							<Input
								id="name"
								name="name"
								type="text"
								value={formData.name}
								onChange={handleInputChange}
								required={!isLogin}
								placeholder="Enter your username"
							/>
						</div>

						{!isLogin && (
							<div className="space-y-2">
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									placeholder="Enter your email"
								/>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={handleInputChange}
									required
									placeholder="Enter your password"
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? "Hide" : "Show"}
								</Button>
							</div>
						</div>

						{!isLogin && (
							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									value={formData.confirmPassword}
									onChange={handleInputChange}
									required={!isLogin}
									placeholder="Confirm your password"
								/>
							</div>
						)}

						{isLogin && (
							<div className="text-right">
								<Button variant="link" className="h-auto p-0 text-green-600">
									Forgot Password?
								</Button>
							</div>
						)}

						<Button
							type="submit"
							className="w-full bg-green-600 hover:bg-green-700"
							disabled={
								loginMutation.status === "pending" ||
								signupMutation.status === "pending"
							}>
							{isLogin ? "Sign In" : "Create Account"}
						</Button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							{isLogin ? "Don't have an account?" : "Already have an account?"}
							<Button
								variant="link"
								className="h-auto p-0 ml-1 text-green-600"
								onClick={() => setIsLogin(!isLogin)}>
								{isLogin ? "Create one" : "Sign in"}
							</Button>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
