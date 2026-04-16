import { Car, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navItems = [
    { label: "How it Works", href: "/about" },
    { label: "Example Report", href: "/example-report" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" }
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      // For hash links, only consider active if we're on home page and the hash matches current scroll position
      if (location.pathname !== '/') return false;

      // Get the hash part
      const hash = href.substring(2);

      const element = document.getElementById(hash);
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      // Consider active if the section is in the upper half of the viewport
      return rect.top <= window.innerHeight / 2 && rect.bottom >= 0;
    }
    return location.pathname === href;
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
    // TODO: Implement proper authentication modal
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
            {navItems.map((item) => (
              item.href.startsWith('/#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-medium transition-colors ${location.pathname === '/' && item.label === "Features"
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                </a>
              ) : (
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
              )
            ))}
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
                  {navItems.map((item) => (
                    item.href.startsWith('/#') ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
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
