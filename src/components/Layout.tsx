
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/dashboard" className="text-2xl font-bold text-green-600">
              DropSheet
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors ${
                  isActive("/dashboard") ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/rules" 
                className={`text-sm font-medium transition-colors ${
                  isActive("/rules") ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Rules
              </Link>
              <Link 
                to="/filtering" 
                className={`text-sm font-medium transition-colors ${
                  isActive("/filtering") ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Filtering
              </Link>
              <Link 
                to="/pricing" 
                className={`text-sm font-medium transition-colors ${
                  isActive("/pricing") ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Pricing
              </Link>
              <Link 
                to="/subscription" 
                className={`text-sm font-medium transition-colors ${
                  isActive("/subscription") ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Subscription
              </Link>
            </nav>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-100 text-green-600">AK</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/emails" className="cursor-pointer">
                    All Emails
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
