
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { VehicleSearchForm } from "@/components/VehicleSearchForm";
import { ModuleSelector } from "@/components/ModuleSelector";
import { Footer } from "@/components/Footer";

const Index = () => {
  const handleVehicleSearch = (registration: string) => {
    console.log("Searching for vehicle:", registration);
    // TODO: Implement vehicle search logic
    // This will trigger the module selector to appear with vehicle-specific data
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

      {/* Features Section */}
      <section id="features" className="py-12">
        <ModuleSelector />
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
                <li>• Tax & MOT Status</li>
                <li>• MOT History</li>
                <li>• Safety Recalls</li>
                <li>• Rarity Information</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Build Sheet & Factory Options</h3>
              <div className="text-3xl font-bold text-primary mb-3">29p</div>
              <p className="text-sm text-muted-foreground mb-4">Exact factory specification</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Full factory specification</li>
                <li>• Optional extras list</li>
                <li>• Original pricing</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Market Insights</h3>
              <div className="text-3xl font-bold text-primary mb-3">57p</div>
              <p className="text-sm text-muted-foreground mb-4">Price trends & value</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Live price trajectory</li>
                <li>• Resale liquidity index</li>
                <li>• Colour desirability</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Maintenance Forecast</h3>
              <div className="text-3xl font-bold text-primary mb-3">57p</div>
              <p className="text-sm text-muted-foreground mb-4">Future costs & reliability</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Predictive maintenance</li>
                <li>• Running cost forecast</li>
                <li>• Reliability scoring</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Safety & Risk</h3>
              <div className="text-3xl font-bold text-primary mb-3">27p</div>
              <p className="text-sm text-muted-foreground mb-4">Safety features & risk assessment</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Crash test data</li>
                <li>• Emissions analysis</li>
                <li>• Theft risk assessment</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Provenance & Risk Check</h3>
              <div className="text-3xl font-bold text-primary mb-3">£4.00</div>
              <p className="text-sm text-muted-foreground mb-4">Legal checks & history</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Insurance write-off check</li>
                <li>• Outstanding finance</li>
                <li>• Theft records</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Salvage & Damage Insights</h3>
              <div className="text-3xl font-bold text-primary mb-3">38p</div>
              <p className="text-sm text-muted-foreground mb-4">Auction history & damage detection</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Salvage auction photos</li>
                <li>• AI damage analysis</li>
                <li>• Structural alerts</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Electric Vehicle Insights</h3>
              <div className="text-3xl font-bold text-primary mb-3">37p</div>
              <p className="text-sm text-muted-foreground mb-4">Battery & charging analysis</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Battery health & range</li>
                <li>• Charging cost forecast</li>
                <li>• Carbon footprint</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-2">Insurance & Ownership</h3>
              <div className="text-3xl font-bold text-primary mb-3">5p</div>
              <p className="text-sm text-muted-foreground mb-4">Insurance costs & group rating</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Insurance group rating</li>
                <li>• Premium estimate</li>
                <li>• Young driver warnings</li>
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
              <h3 className="text-lg font-bold text-foreground mb-2">Viewing Day Checklist</h3>
              <div className="text-3xl font-bold text-primary mb-3">18p</div>
              <p className="text-sm text-muted-foreground mb-4">Inspection & paperwork guide</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Physical inspection guide</li>
                <li>• Paperwork checklist</li>
                <li>• Model-specific points</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-card rounded-lg p-6 max-w-2xl mx-auto border border-primary/20">
            <h3 className="text-lg font-semibold mb-2">Mix & Match Pricing</h3>
            <p className="text-muted-foreground text-sm">
              Total cost depends on which modules you choose. Most buyers spend £0.50-£2.00 for practical information, 
              or £4-6 for expensive cars needing full legal checks.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
