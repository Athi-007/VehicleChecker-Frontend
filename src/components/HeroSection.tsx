
import { Car, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] pt-16 flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/3 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-full">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-primary font-semibold text-lg">Ruut</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Know Your Car's
            <span className="block text-primary">True History</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Get the most detailed vehicle history report available. Only pay for the information you actually need.
            More comprehensive than any other service, at a fraction of the cost.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Check Any Car Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold border-2 hover:bg-primary/5"
              onClick={() => window.open('/example-report', '_blank')}
            >
              See Example Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <Shield className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Most Detailed Reports</h3>
              <p className="text-sm text-muted-foreground">More information than Carfax, CarVertical, or any competitor - with AI insights included</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <Zap className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Smart & Affordable</h3>
              <p className="text-sm text-muted-foreground">AI-powered insights keep costs low while delivering professional-grade analysis instantly</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <Car className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Pay For What You Need</h3>
              <p className="text-sm text-muted-foreground">Why pay £50 for a full report when you only need specific checks? Pick exactly what matters to you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
