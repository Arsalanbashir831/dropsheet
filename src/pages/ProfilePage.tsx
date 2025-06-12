import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import SubscriptionCard from "@/components/SubscriptionCard";

const ProfilePage: React.FC = () => {
	const { user, userLoading, userError } = useAuth();

	if (userLoading) return <div>Loading profile…</div>;
	if (userError || !user)
		return <div>Error loading profile. Please try again later.</div>;

	return (
		<Layout>
			<div className="max-w-4xl mx-auto px-6 py-8">
				<nav className="text-sm text-gray-600 mb-6">Dashboard / Profile</nav>
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Your Profile
					</h1>
					<p className="text-gray-600">
						View and edit your name, email, password, and preferences.
					</p>
				</div>

				<div className="space-y-8">
					{/* Profile Info */}
					<Card>
						<CardHeader>
							<CardTitle>Profile Information</CardTitle>
							<CardDescription>
								Manage your personal information and preferences.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center gap-4">
								<Avatar className="h-20 w-20">
									<AvatarFallback className="bg-green-100 text-green-600 text-xl">
										{user.username.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<Button variant="outline">Upload Photo</Button>
							</div>

							<div className="space-y-2">
								<Label>Username</Label>
								<div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
									<span>{user.username}</span>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Email Address</Label>
								<div className="p-3 bg-gray-50 rounded-md">
									<span className="text-gray-700">{user.email}</span>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Date Joined</Label>
								<div className="p-3 bg-gray-50 rounded-md">
									<span className="text-gray-700">{user.dateJoined}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Subscription Status */}
					<SubscriptionCard />
				</div>
			</div>
		</Layout>
	);
};

export default ProfilePage;
