import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RulesPage from "./pages/RulesPage";
import FilteringPage from "./pages/FilteringPage";
import PricingPage from "./pages/PricingPage";
import ProfilePage from "./pages/ProfilePage";
import EmailsPage from "./pages/EmailsPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import { ROUTES } from "./constants/routes";
import { AuthProvider } from "./Providers/AuthProvider";
import Index from "./pages/Index";
import CookieConsent from "./components/CookieConsent";
import CookieManager from "./components/CookieManager";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthProvider>
					<CookieManager>
						<div className="min-h-screen bg-white">
							<Routes>
								<Route path={ROUTES.PAGES.HOME} element={<Index />} />
								<Route path={ROUTES.PAGES.LOGIN} element={<LoginPage />} />
								<Route
									path={ROUTES.PAGES.DASHBOARD}
									element={<DashboardPage />}
								/>
								<Route path={ROUTES.PAGES.RULES} element={<RulesPage />} />
								<Route
									path={ROUTES.PAGES.FILTERING}
									element={<FilteringPage />}
								/>
								<Route path={ROUTES.PAGES.PRICING} element={<PricingPage />} />
								<Route path={ROUTES.PAGES.PROFILE} element={<ProfilePage />} />
								<Route path={ROUTES.PAGES.EMAILS} element={<EmailsPage />} />
								<Route path={ROUTES.PAGES.PRIVACY} element={<PrivacyPage />} />
								<Route path={ROUTES.PAGES.TERMS} element={<TermsPage />} />

								{/* Redirect root to /login */}
								<Route
									path="/"
									element={<Navigate to={ROUTES.PAGES.LOGIN} replace />}
								/>

								{/* ★ Catch-all: render NotFoundPage for any other URL */}
								<Route path="*" element={<NotFound />} />
							</Routes>
							<Toaster richColors />
							<CookieConsent />
						</div>
					</CookieManager>
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
