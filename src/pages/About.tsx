import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, TrendingUp, Globe, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Essential Info Always Free",
      description: "MOT history, tax status, safety recalls, and basic vehicle details at no cost - forever."
    },
    {
      icon: Zap,
      title: "AI Explains Everything",
      description: "Our AI translates complex vehicle data into plain English, highlighting what actually matters to you."
    },
    {
      icon: Users,
      title: "Built for Car Buyers",
      description: "Designed specifically for people buying cars, not dealers or businesses. We speak your language."
    },
    {
      icon: TrendingUp,
      title: "Live Market Data",
      description: "Current market values, price trends, and resale predictions based on real-time data."
    },
    {
      icon: Globe,
      title: "Pay Only For What You Need",
      description: "Start with free basics, then add premium insights from just 5p. No subscriptions or hidden fees."
    },
    {
      icon: Award,
      title: "Trusted & Secure",
      description: "GDPR compliant with data from official UK sources like DVLA and DVSA."
    }
  ];

  const stats = [
    { value: "500K+", label: "Cars Checked" },
    { value: "25K+", label: "Happy Buyers" },
    { value: "Free", label: "Basic Reports" },
    { value: "11", label: "Premium Modules" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-primary">
              About Ruut
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Smart Vehicle History for Car Buyers
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We help car buyers make informed decisions with detailed vehicle history reports. 
              Get exactly the information you need, when you need it, at transparent prices.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Ruut?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're different from other vehicle check services. We put car buyers first 
              with transparent pricing and AI that actually helps you understand what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Ruut, we believe buying a car shouldn't mean paying for information you don't need. 
                  Our mission is to give every car buyer access to professional-grade vehicle intelligence 
                  at fair, transparent prices.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're not just another vehicle check service. We're car buyers ourselves, and we built 
                  Ruut to solve our own frustrations with expensive, one-size-fits-all reports.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline">Transparent Pricing</Badge>
                  <Badge variant="outline">GDPR Compliant</Badge>
                  <Badge variant="outline">UK Data Sources</Badge>
                  <Badge variant="outline">24/7 Support</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Data Sources</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• DVLA (Driver and Vehicle Licensing Agency)</li>
                    <li>• DVSA (Driver and Vehicle Standards Agency)</li>
                    <li>• Insurance Industry Database</li>
                    <li>• Vehicle Salvage Networks</li>
                    <li>• Market Price Aggregators</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;