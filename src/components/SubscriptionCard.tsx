import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export const SubscriptionCard = () => {
	const { subscription, subLoading, subError } = useAuth();
	if (subLoading) return <div>Loading subscription status...</div>;
	if (subError || !subscription) {
		return (
			<div>Error loading subscription status. Please try again later.</div>
		);
	}
	return (
		<Card className="bg-green-50 border-green-200">
			<CardHeader>
				<CardTitle className="text-green-800">
					Your Subscription Status
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<div>
					<strong className="font-semibold text-green-800">In Trial:</strong>{" "}
					<span className="text-green-700">
						{subscription.in_trial ? "Yes" : "No"}
					</span>
				</div>
				<div>
					<strong className="font-semibold text-green-800">Trial Ends:</strong>{" "}
					<span className="text-green-700">
						{subscription.trial_ends
							? new Date(subscription.trial_ends).toLocaleDateString()
							: "—"}
					</span>
				</div>
				<div>
					<strong className="font-semibold text-green-800">Has Paid:</strong>{" "}
					<span className="text-green-700">
						{subscription.has_paid ? "Yes" : "No"}
					</span>
				</div>
				<div>
					<strong className="font-semibold text-green-800">
						Access Granted:
					</strong>{" "}
					<span className="text-green-700">
						{subscription.access_granted ? "Yes" : "No"}
					</span>
				</div>
				<div>
					<strong className="font-semibold text-green-800">Paid At:</strong>{" "}
					<span className="text-green-700">
						{subscription.paid_at
							? new Date(subscription.paid_at).toLocaleDateString()
							: "—"}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default SubscriptionCard;
