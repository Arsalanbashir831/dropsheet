
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RulesPage from "./pages/RulesPage";
import FilteringPage from "./pages/FilteringPage";
import PricingPage from "./pages/PricingPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ProfilePage from "./pages/ProfilePage";
import EmailsPage from "./pages/EmailsPage";

const queryClient = new QueryClient();

// Mock authentication state
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  const login = (email: string, name: string) => {
    setIsAuthenticated(true);
    setUser({ name, email });
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  
  return { isAuthenticated, user, login, logout };
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/filtering" element={<FilteringPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/emails" element={<EmailsPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
