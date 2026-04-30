import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { VehicleSearchForm } from "@/components/VehicleSearchForm";
import { ModuleSelector } from "@/components/ModuleSelector";
import { Footer } from "@/components/Footer";
import { SnapshotBaseResponse } from "@/services/api";

const Index = () => {
  const [registration, setRegistration] = useState<string | null>(() => {
    return sessionStorage.getItem("ruut_registration");
  });
  const [snapshotData, setSnapshotData] = useState<SnapshotBaseResponse | null>(() => {
    const saved = sessionStorage.getItem("ruut_snapshotData");
    return saved ? JSON.parse(saved) : null;
  });

  const handleVehicleSearch = (reg: string, data: SnapshotBaseResponse) => {
    setRegistration(reg);
    setSnapshotData(data);

    // Smooth-scroll to the module selector after a short delay
    setTimeout(() => {
      const el = document.getElementById("features");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Vehicle Search Section */}
      <section id="search" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Check Any UK Vehicle
            </h2>
            <p className="text-xl text-muted-foreground">
              Enter a registration number to reveal the full story behind any car - from basic info to hidden problems
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <VehicleSearchForm onSearch={handleVehicleSearch} />
          </div>
        </div>
      </section>

      {/* Features / Module Selector Section */}
      <section id="features" className="py-12">
        <ModuleSelector
          registration={registration ?? undefined}
          snapshotData={snapshotData}
        />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Individual Module Pricing
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Every report starts with free basics. Add premium modules as needed - prices shown below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-green-200 bg-green-50/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Snapshot Base</h3>
              <div className="text-3xl font-bold text-green-600 mb-3">FREE</div>
              <p className="text-sm text-muted-foreground mb-4">Always included</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Tax &amp; MOT Status</li>
                <li>• MOT History</li>
                <li>• Safety Recalls</li>
                <li>• Rarity Information</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Build Sheet &amp; Factory Options</h3>
              <div className="text-3xl font-bold text-primary mb-3">29p</div>
              <p className="text-sm text-muted-foreground mb-4">Exact factory specification</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Full factory specification</li>
                <li>• Optional extras list</li>
                <li>• Original pricing</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Provenance &amp; Risk Check</h3>
              <div className="text-3xl font-bold text-primary mb-3">£4.00</div>
              <p className="text-sm text-muted-foreground mb-4">Legal checks &amp; history</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Insurance write-off check</li>
                <li>• Outstanding finance</li>
                <li>• Theft records</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Electric Vehicle Insights</h3>
              <div className="text-3xl font-bold text-primary mb-3">37p</div>
              <p className="text-sm text-muted-foreground mb-4">Battery &amp; charging analysis</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Battery health &amp; range</li>
                <li>• Charging cost forecast</li>
                <li>• Carbon footprint</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Lifestyle Fit Tools</h3>
              <div className="text-3xl font-bold text-primary mb-3">18p</div>
              <p className="text-sm text-muted-foreground mb-4">Suitability assessment</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Lifestyle fit score</li>
                <li>• Subscription checker</li>
                <li>• Tailored advice</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Pre-Purchase Checklist</h3>
              <div className="text-3xl font-bold text-primary mb-3">18p</div>
              <p className="text-sm text-muted-foreground mb-4">Inspection &amp; paperwork guide</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Physical inspection guide</li>
                <li>• Paperwork checklist</li>
                <li>• Model-specific points</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-card rounded-lg p-6 max-w-2xl mx-auto border border-primary/20">
            <h3 className="text-lg font-semibold mb-2">Mix &amp; Match Pricing</h3>
            <p className="text-muted-foreground text-sm">
              Total cost depends on which modules you choose. Most buyers spend £0.50–£2.00 for practical information,
              or £4–6 for expensive cars needing full legal checks.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
