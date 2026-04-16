import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Shield, 
  TrendingUp, 
  Wrench, 
  AlertTriangle, 
  FileText, 
  Camera, 
  Battery, 
  Calculator, 
  Target, 
  CheckCircle,
  CreditCard,
  Eye
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  costToService: number;
  priceToUser: number;
  aiEnhancement: string;
  features: string[];
  category: string;
  isFree: boolean;
}

const modules: Module[] = [
  {
    id: "snapshot",
    title: "Snapshot Base",
    description: "Always included, delivered immediately after plate entry",
    icon: Car,
    costToService: 0,
    priceToUser: 0,
    aiEnhancement: "AI highlights repeated MOT advisories and groups recalls by severity, comments on rarity trend",
    features: [
      "Tax Status, Amount and Expiry - Vehicle Excise Duty status and renewal date",
      "MOT History and Next Due - Last ten MOT results and mileage lines",
      "Outstanding Safety Recalls - Open recall campaigns for the vehicle",
      "Rarity Count - Number of identical models licensed in UK"
    ],
    category: "Essential",
    isFree: true
  },
  {
    id: "build-sheet",
    title: "Build Sheet & Factory Options",
    description: "Exact equipment installed at the factory plus optional extras",
    icon: FileText,
    costToService: 10,
    priceToUser: 29,
    aiEnhancement: "AI groups items by category and highlights highest value extras",
    features: [
      "Full Factory Specification - Engine, gearbox, trim, standard kit",
      "Optional Extras List - Every factory option with original price"
    ],
    category: "Specification",
    isFree: false
  },
  {
    id: "market-insights",
    title: "Market Insights",
    description: "Price behaviour and demand indicators",
    icon: TrendingUp,
    costToService: 15,
    priceToUser: 57,
    aiEnhancement: "AI writes price sentiment summary, notes speed against class average, and comments on popular colours",
    features: [
      "Live Price Trajectory - Graph of historical asking prices",
      "Resale Liquidity Index - How quickly similar cars sell",
      "Colour Desirability Uplift - Premium or discount by paint colour"
    ],
    category: "Market",
    isFree: false
  },
  {
    id: "maintenance",
    title: "Maintenance & Cost Forecast",
    description: "Predicts upkeep costs based on mileage and usage",
    icon: Wrench,
    costToService: 10,
    priceToUser: 57,
    aiEnhancement: "AI flags urgent items, points out largest cost line, and explains reliability score in plain language",
    features: [
      "Predictive Maintenance Calendar - Projected service items and timing",
      "Running Cost Forecast - Fuel, tax and consumables over three years",
      "Reliability Score - Rating from MOT failure and recall data"
    ],
    category: "Maintenance",
    isFree: false
  },
  {
    id: "safety",
    title: "Safety & Risk",
    description: "Assesses occupant safety and local crime risk",
    icon: Shield,
    costToService: 0,
    priceToUser: 27,
    aiEnhancement: "AI notes missing safety features, suggests possible causes for emissions drift, and recommends security items",
    features: [
      "Crash Test and Safety Tech - Euro NCAP rating and fitted driver assistance",
      "Emissions Drift Trend - Opacity or NOx slope compared with peers",
      "Theft and Break-in Hotspot - Crime density near buyer postcode"
    ],
    category: "Safety",
    isFree: false
  },
  {
    id: "provenance",
    title: "Provenance & Risk Registers",
    description: "Legal status and hidden history checks",
    icon: AlertTriangle,
    costToService: 270,
    priceToUser: 400,
    aiEnhancement: "AI explains implications, settlement process, urges V5C verification, notes high churn, and explains import impact",
    features: [
      "Insurance Write-Off Category - Shows category and date of total loss",
      "Outstanding Finance - Finance agreements on the vehicle",
      "Stolen Vehicle Marker - Police and insurer theft records",
      "Previous Plates and Keeper Timeline - Plate transfers and keeper count",
      "Export and Import History - NOVA declarations and MOT gaps"
    ],
    category: "Legal",
    isFree: false
  },
  {
    id: "salvage",
    title: "Salvage & Damage Insights",
    description: "Auction history and structural damage clues",
    icon: Camera,
    costToService: 5,
    priceToUser: 38,
    aiEnhancement: "Vision model detects airbag deployment and highlights deformation areas with commentary",
    features: [
      "Salvage Auction Photos - Thumbnails and sale price if match found",
      "AI Structural Damage Alert - Highlights deformation areas in images"
    ],
    category: "Damage",
    isFree: false
  },
  {
    id: "electric",
    title: "Electric Vehicle Insights",
    description: "Specialised modules for battery cars",
    icon: Battery,
    costToService: 7,
    priceToUser: 37,
    aiEnhancement: "AI compares to fleet average, suggests cheaper tariffs, and gives relatable carbon examples",
    features: [
      "Battery Health and Range - Remaining capacity and projected range",
      "Charging Cost Forecast - Projected spend at home and public chargers",
      "Lifetime Carbon Footprint - Total carbon emitted to date"
    ],
    category: "Electric",
    isFree: false
  },
  {
    id: "insurance",
    title: "Insurance & Ownership",
    description: "Indicative insurance cost and group rating",
    icon: Calculator,
    costToService: 0,
    priceToUser: 5,
    aiEnhancement: "AI explains impact on premium and warns about young driver surcharge",
    features: [
      "Insurance Group Rating - ABI group number and comment",
      "First Year Premium Estimate - Quote via affiliate API"
    ],
    category: "Insurance",
    isFree: false
  },
  {
    id: "lifestyle",
    title: "Lifestyle Fit Tools",
    description: "Helps assess if the car suits everyday life",
    icon: Target,
    costToService: 0,
    priceToUser: 18,
    aiEnhancement: "AI offers tailored advice and warns of expiring trials",
    features: [
      "Lifestyle Fit Score - Boot space, towing, turning circle comparison",
      "Infotainment Subscription Checker - Connected service fees and renewals"
    ],
    category: "Lifestyle",
    isFree: false
  },
  {
    id: "viewing",
    title: "Viewing Day Checklist",
    description: "Personalised inspection guide for physical viewing and paperwork check",
    icon: Eye,
    costToService: 1,
    priceToUser: 18,
    aiEnhancement: "AI compiles model-specific inspection list with severity flags and highlights anomalies from provenance data",
    features: [
      "Model Specific Physical Inspection - Points to examine on body, chassis, interior and electrical systems",
      "Paperwork Checklist - Step by step guide to verify VIN match, service history gaps, import documentation"
    ],
    category: "Inspection",
    isFree: false
  }
];

export function ModuleSelector() {
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set(["snapshot"]));

  const toggleModule = (moduleId: string) => {
    const newSelected = new Set(selectedModules);
    if (moduleId === "snapshot") return; // Can't deselect snapshot
    
    if (newSelected.has(moduleId)) {
      newSelected.delete(moduleId);
    } else {
      newSelected.add(moduleId);
    }
    setSelectedModules(newSelected);
  };

  const calculateTotal = () => {
    return Array.from(selectedModules)
      .map(id => modules.find(m => m.id === id))
      .filter(Boolean)
      .reduce((sum, module) => sum + (module?.priceToUser || 0), 0);
  };

  const handleGenerateReport = () => {
    console.log("Generating report with modules:", Array.from(selectedModules));
    console.log("Total cost:", calculateTotal());
    // TODO: Integrate with API service and Stripe checkout
  };

  const formatPrice = (pence: number) => {
    if (pence === 0) return "Free";
    if (pence < 100) return `${pence}p`;
    return `£${(pence / 100).toFixed(2)}`;
  };

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Build Your Perfect Report</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mix and match exactly what you want to know. Every report starts with free basics,
            then you add only the information that matters for your situation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {modules.map((module) => {
              const isSelected = selectedModules.has(module.id);
              const Icon = module.icon;
              
              return (
                <Card 
                  key={module.id} 
                  className={`transition-all duration-300 hover:shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-primary shadow-md bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <Badge variant={module.isFree ? "secondary" : "outline"}>
                              {module.category}
                            </Badge>
                            <Badge variant={module.isFree ? "default" : "secondary"} className="font-bold">
                              {formatPrice(module.priceToUser)}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm">
                            {module.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Switch
                        checked={isSelected}
                        onCheckedChange={() => toggleModule(module.id)}
                        disabled={module.id === "snapshot"}
                        className="ml-4"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3">
                        {module.features.map((feature, index) => {
                          const [title, description] = feature.split(' - ');
                          return (
                            <div 
                              key={index} 
                              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/30"
                            >
                              <div className="mt-0.5">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">{title}</p>
                                {description && (
                                  <p className="text-xs text-muted-foreground mt-1">{description}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-sm text-primary font-medium">
                          AI Enhancement: {module.aiEnhancement}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {Array.from(selectedModules).map(id => {
                      const module = modules.find(m => m.id === id);
                      if (!module) return null;
                      
                      return (
                        <div key={id} className="flex justify-between items-center text-sm">
                          <span className="text-foreground pr-2">{module.title}</span>
                          <span className="font-medium whitespace-nowrap">{formatPrice(module.priceToUser)}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={handleGenerateReport}
                  >
                    Generate Report
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment via Stripe. Reports cached for 24 hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
