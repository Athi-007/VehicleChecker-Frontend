import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Car, FileText, Search, Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { VehicleReport } from "@/components/VehicleReport";
import { Footer } from "@/components/Footer";
import { vehicleService, SnapshotBaseResponse } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

// ─────────────────────────────────────────────────────────────────────────────
// Report-specific Navbar
// ─────────────────────────────────────────────────────────────────────────────
function ReportNavbar({ registration }: { registration: string }) {
  const navigate = useNavigate();

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

          <div className="hidden md:flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-sm px-3 py-1 font-mono tracking-widest">
              {registration}
            </Badge>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <FileText className="h-4 w-4" />
              <span>Full Report</span>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex items-center gap-2 border-primary/40 hover:bg-primary/5 hover:border-primary transition-all"
            >
              <Search className="h-4 w-4" />
              Check Another Vehicle
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs px-2 py-0.5 font-mono">
              {registration}
            </Badge>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                    <FileText className="h-5 w-5" />
                    Full Report
                  </div>
                  <Button onClick={() => navigate("/")} variant="outline" className="w-full flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Check Another Vehicle
                  </Button>
                  <Button onClick={() => navigate(-1)} variant="ghost" className="w-full flex items-center gap-2 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Report Page
// ─────────────────────────────────────────────────────────────────────────────
export default function ReportPage() {
  const { registration } = useParams<{ registration: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const state = (location.state as any) ?? {};

  const [snapshotData, setSnapshotData] = useState<SnapshotBaseResponse | null>(
    state.snapshotData ?? null
  );
  const [loading, setLoading] = useState(!snapshotData);
  const [error, setError] = useState<string | null>(null);

  // Module selections + postcode from ModuleSelector on the homepage
  const selectedModules: string[] = state.selectedModules ?? [];
  const postcode: string = state.postcode ?? "";

  useEffect(() => {
    if (!registration) { navigate("/"); return; }
    if (snapshotData) return;

    setLoading(true);
    vehicleService
      .getSnapshotBase(registration)
      .then((res) => {
        if (res.success && res.data) {
          setSnapshotData(res.data);
        } else {
          setError(res.error ?? "Failed to load vehicle data.");
          toast({ title: "Error loading vehicle", description: res.error ?? "Please try again.", variant: "destructive" });
        }
      })
      .catch(() => setError("Network error – could not load vehicle data."))
      .finally(() => setLoading(false));
  }, [registration]);

  const reg = registration?.toUpperCase() ?? "";

  return (
    <div className="min-h-screen bg-background">
      <ReportNavbar registration={reg} />

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
            <p className="text-muted-foreground">Loading vehicle data for {reg}…</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center gap-6 py-24 text-center">
            <p className="text-destructive text-lg font-semibold">{error}</p>
            <Button onClick={() => navigate("/")} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Another Vehicle
            </Button>
          </div>
        )}

        {snapshotData && !loading && (
          <VehicleReport
            registration={reg}
            snapshotData={snapshotData}
            selectedModules={selectedModules}
            postcode={postcode}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
