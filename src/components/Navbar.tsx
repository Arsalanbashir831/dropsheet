import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold gradient-text">SheetDrop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection("features")} 
                className="text-gray-600 hover:text-brand-purple transition-colors font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("pricing")} 
                className="text-gray-600 hover:text-brand-purple transition-colors font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection("faq")} 
                className="text-gray-600 hover:text-brand-purple transition-colors font-medium"
              >
                FAQ
              </button>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-gray-600 hover:text-brand-purple transition-colors font-medium flex items-center">
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Help
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>How SheetDrop Works</DialogTitle>
                    <DialogDescription>
                      Understanding filters, senders, and account limits
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Account Filter Limits</h3>
                      <p className="text-gray-700">
                        Filters are set at the account level, not per sender. Your plan determines how many total filters you can create:
                      </p>
                      <ul className="list-disc ml-6 mt-2">
                        <li><strong>Free plan:</strong> 1 filter total</li>
                        <li><strong>Pro plan:</strong> 20 filters total</li>
                      </ul>
                      <p className="text-gray-700 mt-2">
                        It's up to you how you allocate these filters across different email senders.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Email Processing Limits</h3>
                      <p className="text-gray-700">
                        Your plan also determines how many emails you can process per month:
                      </p>
                      <ul className="list-disc ml-6 mt-2">
                        <li><strong>Free plan:</strong> 10 emails/month</li>
                        <li><strong>Pro plan:</strong> 1,000 emails/month</li>
                      </ul>
                      <p className="text-gray-700 mt-2">
                        Once you reach your monthly limit, you'll need to wait until the next billing cycle or upgrade your plan to process more emails.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Filters and Google Sheets</h3>
                      <p className="text-gray-700">
                        Each filter you create corresponds to one tab in your Google Sheet. For example:
                      </p>
                      <ul className="list-disc ml-6 mt-2">
                        <li>An "Invoice" filter applied to emails from "stripe.com" creates an "Invoice-stripe" tab</li>
                        <li>A "Receipt" filter applied to "amazon.com" creates a "Receipt-amazon" tab</li>
                      </ul>
                      <p className="text-gray-700 mt-2">
                        This organized approach makes it easy to find and manage your data in one spreadsheet with multiple tabs.
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                      <p className="text-gray-700">
                        If you have any questions or need assistance, our support team is here to help.
                      </p>
                      <div className="mt-4">
                        <a 
                          href="mailto:varun.bhanot11@gmail.com" 
                          className="flex items-center text-brand-purple hover:underline"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Contact Support
                        </a>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Link 
                to={ROUTES.PAGES.PRIVACY} 
                className="text-gray-600 hover:text-brand-purple transition-colors font-medium"
              >
                Privacy
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Start Free</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-brand-purple"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-2 space-y-3 shadow-lg rounded-b-lg">
            <button 
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded w-full text-left"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
            <button 
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded w-full text-left"
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </button>
            <button 
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded w-full text-left"
              onClick={() => scrollToSection("faq")}
            >
              FAQ
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button 
                  className="flex items-center w-full py-2 px-4 text-gray-600 hover:bg-gray-100 rounded text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[95%] sm:max-w-lg max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>How SheetDrop Works</DialogTitle>
                  <DialogDescription>
                    Understanding filters, senders, and account limits
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Account Filter Limits</h3>
                    <p className="text-gray-700">
                      Filters are set at the account level. Your plan determines how many total filters you can create.
                    </p>
                    <ul className="list-disc ml-6 mt-2">
                      <li><strong>Free plan:</strong> 1 filter total</li>
                      <li><strong>Pro plan:</strong> 20 filters total</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email Processing Limits</h3>
                    <p className="text-gray-700">
                      Monthly email processing limits:
                    </p>
                    <ul className="list-disc ml-6 mt-2">
                      <li><strong>Free plan:</strong> 10 emails/month</li>
                      <li><strong>Pro plan:</strong> 1,000 emails/month</li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <a 
                      href="mailto:varun.bhanot11@gmail.com" 
                      className="flex items-center text-brand-purple hover:underline"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Link 
              to={ROUTES.PAGES.PRIVACY} 
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded w-full text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="justify-start" asChild>
                <Link to="/login">Start Free</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
