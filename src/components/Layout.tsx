import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const isActive = (path: string) => location.pathname === path;

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<Link
							to={ROUTES.PAGES.DASHBOARD}
							className="text-2xl font-bold text-green-600">
							SheetDrop
						</Link>

						{/* Navigation */}
						<nav className="hidden md:flex items-center space-x-8">
							<Link
								to={ROUTES.PAGES.DASHBOARD}
								className={`text-sm font-medium transition-colors ${
									isActive(ROUTES.PAGES.DASHBOARD)
										? "text-green-600"
										: "text-gray-700 hover:text-green-600"
								}`}>
								Dashboard
							</Link>
							<Link
								to={ROUTES.PAGES.RULES}
								className={`text-sm font-medium transition-colors ${
									isActive(ROUTES.PAGES.RULES)
										? "text-green-600"
										: "text-gray-700 hover:text-green-600"
								}`}>
								Rules
							</Link>
							<Link
								to={ROUTES.PAGES.FILTERING}
								className={`text-sm font-medium transition-colors ${
									isActive(ROUTES.PAGES.FILTERING)
										? "text-green-600"
										: "text-gray-700 hover:text-green-600"
								}`}>
								Filtering
							</Link>
							<Link
								to={ROUTES.PAGES.PRICING}
								className={`text-sm font-medium transition-colors ${
									isActive(ROUTES.PAGES.PRICING)
										? "text-green-600"
										: "text-gray-700 hover:text-green-600"
								}`}>
								Pricing
							</Link>
						</nav>

						{/* User Menu */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-8 w-8 rounded-full">
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-green-100 text-green-600 text-xl">
											{user?.username?.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56 bg-white"
								align="end"
								forceMount>
								<DropdownMenuItem asChild>
									<Link to={ROUTES.PAGES.PROFILE} className="cursor-pointer">
										Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link to={ROUTES.PAGES.EMAILS} className="cursor-pointer">
										All Emails
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={logout} className="cursor-pointer">
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="pt-20">{children}</main>
		</div>
	);
};

export default Layout;
