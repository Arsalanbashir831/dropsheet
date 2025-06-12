import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import apiCaller from "@/lib/ApiCaller";
import { API_ROUTES } from "@/constants/ApiRoutes";

interface Email {
	id: number;
	sender: string;
	senderEmail?: string;
	subject: string;
	snippet: string;
	received_at: string;
	labels?: string[];
}

const LABEL_OPTIONS = ["Inbox", "Work", "Alerts", "Important"];

const EmailsPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
	const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
	const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
	const [showEmailDetail, setShowEmailDetail] = useState(false);

	const {
		data: emails = [],
		isLoading,
		isError,
	} = useQuery<Email[]>({
		queryKey: ["emails"],
		queryFn: () =>
			apiCaller(API_ROUTES.EMAILS.GET, "GET").then((res) => res.data),
		staleTime: 5 * 60 * 1000,
	});

	// Filter emails by searchTerm and selectedLabel
	const filteredEmails = useMemo(
		() =>
			emails.filter((email) => {
				const matchesSearch =
					email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
					email.sender.toLowerCase().includes(searchTerm.toLowerCase());
				const matchesLabel = selectedLabel
					? email.labels?.includes(selectedLabel)
					: true;
				return matchesSearch && matchesLabel;
			}),
		[emails, searchTerm, selectedLabel]
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleLabelChange = (value: string) => {
		setSelectedLabel((prev) => (prev === value ? null : value));
	};

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedLabel(null);
	};

	const handleEmailSelect = (emailId: number) => {
		setSelectedEmails((prev) =>
			prev.includes(emailId)
				? prev.filter((id) => id !== emailId)
				: [...prev, emailId]
		);
	};

	const handleSelectAll = () => {
		setSelectedEmails(
			selectedEmails.length === filteredEmails.length
				? []
				: filteredEmails.map((e) => e.id)
		);
	};

	const handleEmailClick = (email: Email) => {
		setSelectedEmail(email);
		setShowEmailDetail(true);
	};

	if (isLoading) {
		return (
			<Layout>
				<div className="p-8 text-center">Loading emails…</div>
			</Layout>
		);
	}
	if (isError) {
		return (
			<Layout>
				<div className="p-8 text-center text-red-600">
					Failed to load emails.
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="max-w-7xl mx-auto px-6 py-8">
				<nav className="text-sm text-gray-600 mb-6">Dashboard / Emails</nav>
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">All Emails</h1>
					<p className="text-gray-600">
						View and manage all your synchronized emails.
					</p>
				</div>

				{/* Filters */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Filters</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col md:flex-row gap-4">
							<Input
								placeholder="Search by subject or sender"
								value={searchTerm}
								onChange={handleSearchChange}
								className="flex-1"
							/>
						</div>
					</CardContent>
				</Card>

				{/* Email Table */}
				<Card>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<Checkbox
											checked={selectedEmails.length === filteredEmails.length}
											onCheckedChange={handleSelectAll}
										/>
									</TableHead>
									<TableHead className="w-8">⭐</TableHead>
									<TableHead>Sender</TableHead>
									<TableHead>Subject & Snippet</TableHead>
									<TableHead>Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredEmails.map((email) => (
									<TableRow
										key={email.id}
										className={`cursor-pointer ${
											selectedEmails.includes(email.id) ? "bg-green-50" : ""
										}`}>
										<TableCell>
											<Checkbox
												checked={selectedEmails.includes(email.id)}
												onCheckedChange={() => handleEmailSelect(email.id)}
											/>
										</TableCell>
										<TableCell>
											<button className="text-lg">☆</button>
										</TableCell>
										<TableCell
											className="font-medium"
											onClick={() => handleEmailClick(email)}>
											{email.sender}
										</TableCell>
										<TableCell onClick={() => handleEmailClick(email)}>
											<div>
												<div className="font-semibold mb-1">
													{email.subject}
												</div>
												<div className="text-sm text-gray-600 truncate max-w-md">
													{email.snippet}
												</div>
											</div>
										</TableCell>
										<TableCell>
											{new Date(email.received_at).toLocaleString()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Detail Modal */}
				<Dialog open={showEmailDetail} onOpenChange={setShowEmailDetail}>
					<DialogContent className="max-w-4xl max-h-[80vh] bg-white">
						{selectedEmail && (
							<>
								<DialogHeader className="bg-gray-50 -m-6 p-6 border-b">
									<DialogTitle className="text-xl font-semibold">
										{selectedEmail.subject}
									</DialogTitle>
								</DialogHeader>

								<div className="space-y-4 max-h-96 overflow-y-auto p-6">
									<div className="text-sm text-gray-600">
										<strong>From:</strong> {selectedEmail.sender}
									</div>
									<div className="prose prose-sm max-w-none">
										{selectedEmail.snippet.split("\n").map((p, i) => (
											<p key={i} className="mb-3">
												{p}
											</p>
										))}
									</div>
								</div>

								<div className="flex justify-end bg-gray-50 -m-6 mt-6 p-6 border-t">
									<Button
										variant="ghost"
										onClick={() => setShowEmailDetail(false)}>
										Close
									</Button>
								</div>
							</>
						)}
					</DialogContent>
				</Dialog>
			</div>
		</Layout>
	);
};

export default EmailsPage;
