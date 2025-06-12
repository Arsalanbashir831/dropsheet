import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
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
import { ROUTES } from "@/constants/routes";

interface FormData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const LoginPage: React.FC = () => {
	const { user, login, signup, loading } = useAuth();
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	// If already logged in, redirect
	if (user) {
		navigate(ROUTES.PAGES.DASHBOARD);
		return null;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isLogin && formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		if (!formData.name.trim()) {
			toast.error("Username is required");
			return;
		}

		try {
			if (isLogin) {
				await login(formData.name, formData.password);
				toast.success("Logged in successfully!");
			} else {
				await signup(formData.name, formData.email, formData.password);
				toast.success("Account created successfully!");
			}
			navigate(ROUTES.PAGES.DASHBOARD);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const msg =
				err?.response?.data?.detail ||
				(isLogin ? "Login failed" : "Signup failed");
			toast.error(msg);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
						{isLogin ? "Sign in to continue" : "Get started today"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Username</Label>
							<Input
								id="name"
								name="name"
								type="text"
								value={formData.name}
								onChange={handleChange}
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
									onChange={handleChange}
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
									onChange={handleChange}
									required
									placeholder="Enter your password"
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
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
									onChange={handleChange}
									required={!isLogin}
									placeholder="Confirm your password"
								/>
							</div>
						)}
						{isLogin && (
							<div className="text-right">
								<Button variant="link" className="p-0 text-green-600">
									Forgot Password?
								</Button>
							</div>
						)}
						<Button
							type="submit"
							className="w-full bg-green-600 hover:bg-green-700"
							disabled={loading}>
							{isLogin ? "Sign In" : "Create Account"}
						</Button>
					</form>
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
							<Button
								variant="link"
								className="p-0 text-green-600"
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
