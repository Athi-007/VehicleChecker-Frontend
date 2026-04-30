import { Car, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setReportsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const simpleNavItems = [
    { label: "How it Works", href: "/about" },
    { label: "Pricing", href: "/#pricing" }
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') return false;
      const hash = href.substring(2);
      const element = document.getElementById(hash);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom >= 0;
    }
    return location.pathname === href;
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
    console.log("Authentication not yet implemented");
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-primary font-bold text-lg">Ruut</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {simpleNavItems.slice(0, 1).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`font-medium transition-colors ${isActive(item.href)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Reports Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setReportsOpen(!reportsOpen)}
                className={`font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === '/example-report' || (location.pathname === '/' && location.hash === '#features')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Reports
                <ChevronDown className={`h-4 w-4 transition-transform ${reportsOpen ? 'rotate-180' : ''}`} />
              </button>

              {reportsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-1 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <Link
                    to="/example-report"
                    onClick={() => setReportsOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    Example Report
                  </Link>
                  <a
                    href="/#features"
                    onClick={() => setReportsOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    Features
                  </a>
                </div>
              )}
            </div>

            {/* Pricing */}
            <a
              href="/#pricing"
              className={`font-medium transition-colors ${
                location.pathname === '/' ? 'text-muted-foreground hover:text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pricing
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={handleAuthClick}>Sign In</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleAuthClick}>Get Started</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <Link
                    to="/about"
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How it Works
                  </Link>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-foreground">Reports</p>
                    <div className="pl-4 space-y-3">
                      <Link
                        to="/example-report"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Example Report
                      </Link>
                      <a
                        href="/#features"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Features
                      </a>
                    </div>
                  </div>
                  <a
                    href="/#pricing"
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                  <div className="flex flex-col gap-3 mt-6">
                    <Button variant="outline" className="w-full" onClick={handleAuthClick}>Sign In</Button>
                    <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleAuthClick}>Get Started</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* TODO: Add authentication modal/dialog here */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Authentication Coming Soon</h2>
            <p className="text-muted-foreground mb-4">
              Sign up and login functionality will be implemented in the next update.
            </p>
            <Button onClick={() => setShowAuthModal(false)} className="w-full">
              Close
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
