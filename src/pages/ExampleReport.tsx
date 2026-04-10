import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomepageShowcaseSections } from "@/components/HomepageShowcaseSections";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Car, Shield, TrendingUp, Wrench, AlertTriangle, CheckCircle, Info, Battery, FileText, Camera, Calculator, Target, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ExampleReport = () => {
  const sampleData = {
    registration: "AB12 CDE",
    make: "BMW",
    model: "X3 xDrive20d M Sport",
    year: 2020,
    mileage: "45,678",
    color: "Alpine White",
    fuelType: "Diesel"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              
              <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-lg p-8 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Vehicle Report</h1>
                    <p className="text-muted-foreground">Sample report for {sampleData.registration}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-card rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-semibold">{sampleData.year} {sampleData.make} {sampleData.model}</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Mileage</p>
                        <p className="font-semibold">{sampleData.mileage} miles</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">This is the most recently recorded mileage and may now be higher</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-semibold">{sampleData.color}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary */}
            <Card className="mb-6 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Target className="h-7 w-7 text-primary" />
                  Quick Summary
                </CardTitle>
                <CardDescription>At-a-glance vehicle health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-red-900">Insurance Status</span>
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <p className="text-sm text-red-700">Category S write-off detected</p>
                  </div>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-900">Finance Check</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700">No outstanding finance</p>
                  </div>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-900">MOT History</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700">Clean pass record</p>
                  </div>
                  
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-amber-900">Mileage</span>
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <p className="text-sm text-amber-700">Above average for age</p>
                  </div>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-900">Keeper Count</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700">2 previous keepers</p>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-900">Safety Rating</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700">5-star Euro NCAP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 1. Essential Overview */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">1. Essential Overview</CardTitle>
                    <CardDescription>Core vehicle information including tax status, MOT history, safety recalls, and market rarity</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Car className="h-4 w-4 text-primary" />
                      Tax Status & Expiry
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tax Status</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Annual Rate: £190 (£15.83/month)</p>
                      <p className="text-sm text-muted-foreground">Expires: 31 March 2025</p>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Outstanding Safety Recalls
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">No outstanding recalls</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Last checked: Today</p>
                      <p className="text-sm text-muted-foreground">Historical recalls: 0</p>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Rarity & Popularity
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Originally Registered</span>
                        <span className="font-semibold">8,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Currently on Road</span>
                        <span className="font-semibold text-green-600">8,456 (96%)</span>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground">Registration year: 2020</p>
                        <p className="text-xs text-muted-foreground">Market position: Top 15% in segment</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded MOT History Section */}
                <div className="bg-card rounded-lg p-4 border">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Complete MOT History & Analysis
                  </h4>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Current Status</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Valid until 24 August 2025</Badge>
                    </div>
                    
                    {/* AI Analysis Card */}
                    <div className="mt-3 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-amber-500 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-amber-900 mb-1">⚠️ Important Pattern Detected</h5>
                          <p className="text-xs text-amber-800">Repeated advisory requires attention</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 border border-amber-200">
                          <div className="flex items-start gap-2 mb-2">
                            <Badge className="bg-amber-100 text-amber-800 text-xs">Recurring Issue</Badge>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">Front Brake Disc Wear</p>
                          <p className="text-xs text-gray-700 mb-2">Advisory appears in <strong>2023 and 2024</strong> tests</p>
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-full bg-amber-400 rounded-full"></div>
                            <div>
                              <p className="text-xs text-gray-600">This is a <strong>common wear pattern</strong> for X3 models due to vehicle weight (1,850kg) and brake system design</p>
                              <p className="text-xs text-gray-600 mt-1">Typical lifespan: <strong>40,000-50,000 miles</strong></p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 border border-blue-200">
                          <div className="flex items-start gap-2 mb-2">
                            <Badge className="bg-blue-100 text-blue-800 text-xs">Minor Concern</Badge>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">Engine Oil Leak (2023)</p>
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-full bg-blue-400 rounded-full"></div>
                            <div>
                              <p className="text-xs text-gray-600">Check engine bay for any seepage during viewing</p>
                              <p className="text-xs text-gray-600 mt-1">Small leaks are <strong>common on BMW diesels</strong> and rarely worsen if addressed</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <p className="text-xs font-semibold text-green-900">Recommended Action</p>
                          </div>
                          <p className="text-xs text-green-800">Inspect brakes before purchase to assess remaining life</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* MOT Tests Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-2 font-semibold">Date</th>
                          <th className="text-left p-2 font-semibold">Mileage</th>
                          <th className="text-left p-2 font-semibold">Result</th>
                          <th className="text-left p-2 font-semibold">Advisories</th>
                          <th className="text-left p-2 font-semibold">Dangerous</th>
                          <th className="text-left p-2 font-semibold">Major</th>
                          <th className="text-left p-2 font-semibold">Minor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="hover:bg-muted/50">
                          <td className="p-2">24 Aug 2024</td>
                          <td className="p-2">45,234 mi</td>
                          <td className="p-2"><Badge className="bg-green-100 text-green-800 text-xs">Pass</Badge></td>
                          <td className="p-2 text-xs">
                            <div className="space-y-1">
                              <p className="text-amber-600">⚠ Front brake disc worn but not excessively</p>
                              <p className="text-muted-foreground">○ Rear tyre tread depth marginal (3.2mm)</p>
                            </div>
                          </td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">2</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="p-2">22 Aug 2023</td>
                          <td className="p-2">37,891 mi</td>
                          <td className="p-2"><Badge className="bg-green-100 text-green-800 text-xs">Pass</Badge></td>
                          <td className="p-2 text-xs">
                            <div className="space-y-1">
                              <p className="text-amber-600">⚠ Front brake disc worn but not excessively</p>
                              <p className="text-muted-foreground">○ Oil leak from engine - not excessive</p>
                            </div>
                          </td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">2</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="p-2">18 Aug 2022</td>
                          <td className="p-2">29,445 mi</td>
                          <td className="p-2"><Badge className="bg-green-100 text-green-800 text-xs">Pass</Badge></td>
                          <td className="p-2 text-xs text-green-600">No advisories</td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">0</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="p-2">20 Aug 2021</td>
                          <td className="p-2">21,223 mi</td>
                          <td className="p-2"><Badge className="bg-amber-100 text-amber-800 text-xs">Pass w/ Minor</Badge></td>
                          <td className="p-2 text-xs">
                            <div className="space-y-1">
                              <p className="text-amber-600">⚠ Nearside front tyre worn close to limit</p>
                              <p className="text-muted-foreground">○ Wiper blade deteriorated</p>
                            </div>
                          </td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">2</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="p-2">15 Aug 2020</td>
                          <td className="p-2">12,567 mi</td>
                          <td className="p-2"><Badge className="bg-green-100 text-green-800 text-xs">Pass</Badge></td>
                          <td className="p-2 text-xs text-green-600">No advisories</td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">0</td>
                          <td className="p-2 text-center">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Mileage Chart - Enhanced */}
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
                    <h5 className="text-sm font-semibold mb-3 flex items-center justify-between">
                      <span>Mileage Progression Chart</span>
                      <span className="text-xs text-muted-foreground">Annual average: 9,047 mi/yr</span>
                    </h5>
                    <div className="relative h-48 flex items-end justify-between gap-3 border-l-2 border-b-2 border-muted-foreground/20 pl-2 pb-2">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground -ml-8 pb-8">
                        <span>50k</span>
                        <span>40k</span>
                        <span>30k</span>
                        <span>20k</span>
                        <span>10k</span>
                        <span>0</span>
                      </div>
                      
                      {/* Bars */}
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-700 hover:to-blue-500" style={{height: '26%'}}></div>
                        <span className="text-xs mt-2 font-medium">Aug 2020</span>
                        <span className="text-xs text-muted-foreground">12,567</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-700 hover:to-blue-500" style={{height: '46%'}}></div>
                        <span className="text-xs mt-2 font-medium">Aug 2021</span>
                        <span className="text-xs text-muted-foreground">21,223</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-700 hover:to-blue-500" style={{height: '64%'}}></div>
                        <span className="text-xs mt-2 font-medium">Aug 2022</span>
                        <span className="text-xs text-muted-foreground">29,445</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-700 hover:to-blue-500" style={{height: '83%'}}></div>
                        <span className="text-xs mt-2 font-medium">Aug 2023</span>
                        <span className="text-xs text-muted-foreground">37,891</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all hover:from-green-700 hover:to-green-500" style={{height: '98%'}}></div>
                        <span className="text-xs mt-2 font-medium">Aug 2024</span>
                        <span className="text-xs text-muted-foreground font-semibold">45,234</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-background p-2 rounded">
                        <p className="text-muted-foreground">Estimated current mileage</p>
                        <p className="font-semibold text-base">~46,800 miles</p>
                      </div>
                      <div className="bg-background p-2 rounded">
                        <p className="text-muted-foreground">Average historical annual mileage</p>
                        <p className="font-semibold text-base">~9,050 miles/yr</p>
                      </div>
                    </div>
                    
                  </div>
                </div>

                {/* Consolidated AI Analysis for Essential Overview */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6 mt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI Analysis: Essential Overview</h4>
                      <p className="text-sm text-purple-700">Key insights on vehicle status and market position</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Market Position
                      </h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• xDrive20d M Sport is the optimal X3 variant</li>
                        <li>• 96% survival rate indicates strong build quality</li>
                        <li>• Strong resale outlook as diesel supply tightens</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-amber-600" />
                        Key Maintenance Note
                      </h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Front brake wear recurring (typical for X3)</li>
                        <li>• Minor oil leak noted - common on BMW diesels</li>
                        <li>• Inspect brakes before purchase</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg">
                    <p className="text-sm font-semibold text-green-900 mb-1">✓ Overall Assessment</p>
                    <p className="text-xs text-green-800">Healthy usage pattern with verifiable mileage and clean legal status. Recurring brake advisory is typical and manageable. Strong market position with excellent resale potential.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Factory Specification & Equipment */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">2. Factory Specification & Equipment</CardTitle>
                    <CardDescription>Complete build sheet showing exact equipment installed at factory plus all optional extras fitted</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Powertrain Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Car className="h-4 w-4 text-blue-600" />
                      Engine & Performance
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engine</span>
                        <span className="font-medium">2.0L TwinPower Turbo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Power</span>
                        <span className="font-medium">190 PS / 140 kW</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Torque</span>
                        <span className="font-medium">400 Nm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">0-60mph</span>
                        <span className="font-medium">7.9 seconds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Top Speed</span>
                        <span className="font-medium">130 mph</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      Transmission & Drive
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gearbox</span>
                        <span className="font-medium">8-Speed Auto</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium">Steptronic</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Drivetrain</span>
                        <span className="font-medium">xDrive AWD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Differential</span>
                        <span className="font-medium">Active Split</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Drive Mode</span>
                        <span className="font-medium">Adaptive</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-purple-600" />
                      Efficiency & Emissions
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">WLTP Combined</span>
                        <span className="font-medium">52.3 mpg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Real-World</span>
                        <span className="font-medium">45-48 mpg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CO₂ Emissions</span>
                        <span className="font-medium">142 g/km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Euro Standard</span>
                        <span className="font-medium">Euro 6d-TEMP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AdBlue Tank</span>
                        <span className="font-medium">17 liters</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Standard Equipment by Category */}
                <div className="bg-card rounded-lg p-6 border">
                  <h4 className="font-semibold text-lg mb-4">Standard M Sport Equipment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-2">Exterior</h5>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• M Sport Body Styling</li>
                        <li>• 19" M Double-Spoke Alloys</li>
                        <li>• M Sport Suspension (-10mm)</li>
                        <li>• Dark Chrome Accents</li>
                        <li>• Shadowline Exterior Trim</li>
                        <li>• Roof Rails (Satin Aluminum)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-2">Interior & Comfort</h5>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• M Sport Leather Steering Wheel</li>
                        <li>• Sport Seats (Sensatec)</li>
                        <li>• Dual-Zone Climate Control</li>
                        <li>• Ambient Lighting</li>
                        <li>• Auto-Dimming Rear Mirror</li>
                        <li>• Split-Folding Rear Seats (40:20:40)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-2">Technology & Safety</h5>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 10.25" Navigation Professional</li>
                        <li>• iDrive 7 Controller</li>
                        <li>• Active Cruise Control</li>
                        <li>• Lane Departure Warning</li>
                        <li>• Parking Sensors (F&R)</li>
                        <li>• Rear View Camera</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Optional Extras */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">Optional Extras Fitted</h4>
                    <Badge className="bg-green-100 text-green-800">High Specification</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-sm font-semibold">Panoramic Glass Sunroof</h5>
                        <Badge variant="outline" className="text-xs">Premium</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Electric tilt/slide with anti-trap, wind deflector, and sun blinds</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-sm font-semibold">Harman Kardon Surround Audio</h5>
                        <Badge variant="outline" className="text-xs">Premium</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">16 speakers, 464W amplifier, vehicle-specific tuning</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-sm font-semibold">Adaptive LED Headlights</h5>
                        <Badge variant="outline" className="text-xs">Safety</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Variable light distribution, cornering function, auto high-beam</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-sm font-semibold">Comfort Access</h5>
                        <Badge variant="outline" className="text-xs">Convenience</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Keyless entry, electric tailgate with foot sensor</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">Total Optional Equipment Value</p>
                        <p className="text-xs text-muted-foreground">Added to base vehicle price when new</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">+12-15%</p>
                    </div>
                    <p className="text-xs text-green-600 mt-2">Adds significant resale premium vs base specification</p>
                  </div>
                </div>

                {/* Dimensions & Capacities */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg p-4 border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Boot Space</p>
                    <p className="text-2xl font-bold">550L</p>
                    <p className="text-xs text-muted-foreground">1,600L seats down</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Fuel Tank</p>
                    <p className="text-2xl font-bold">65L</p>
                    <p className="text-xs text-muted-foreground">~700 mile range</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Kerb Weight</p>
                    <p className="text-2xl font-bold">1,850kg</p>
                    <p className="text-xs text-muted-foreground">xDrive model</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Towing</p>
                    <p className="text-2xl font-bold">2,000kg</p>
                    <p className="text-xs text-muted-foreground">Braked trailer</p>
                  </div>
                </div>

                {/* Consolidated AI Analysis */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <Car className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI Analysis: Specification & Equipment</h4>
                      <p className="text-sm text-purple-700">Key highlights of this vehicle's specification</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Performance & Efficiency</h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• 0-60mph in 7.9s with 400Nm torque</li>
                        <li>• Real-world 45-50 mpg achievable</li>
                        <li>• xDrive AWD for all-weather capability</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Premium Equipment</h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Panoramic sunroof (+12% resale value)</li>
                        <li>• Harman Kardon audio (rare option)</li>
                        <li>• Adaptive LED headlights</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg">
                    <p className="text-sm font-semibold text-green-900 mb-1">✓ Specification Verdict</p>
                    <p className="text-xs text-green-800">Exceptionally well-specified X3 with optimal powertrain and highly desirable options. M Sport package and premium equipment will command strong resale values.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Market Analysis & Valuation */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">3. Market Analysis & Valuation</CardTitle>
                    <CardDescription>AI-powered market analysis with price trends, demand indicators, and predicted valuations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* AI-Generated Market Analysis Section */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6 mb-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI-Powered Market Analysis</h4>
                      <p className="text-sm text-purple-700">The data in this section has been supercharged by AI</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Price Predictions */}
                  <div className="bg-primary/5 rounded-lg p-6 border-2 border-primary/20">
                    <h4 className="font-semibold mb-4 text-lg">Current Market Valuations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="text-sm font-semibold text-muted-foreground mb-2">Main Dealer</h5>
                        <p className="text-3xl font-bold text-primary">£32,495</p>
                        <p className="text-xs text-muted-foreground mt-1">Forecourt retail price</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="text-sm font-semibold text-muted-foreground mb-2">Private Sale</h5>
                        <p className="text-3xl font-bold text-blue-600">£29,750</p>
                        <p className="text-xs text-muted-foreground mt-1">Private market value</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border">
                        <h5 className="text-sm font-semibold text-muted-foreground mb-2">Trade-In Value</h5>
                        <p className="text-3xl font-bold text-amber-600">£26,200</p>
                        <p className="text-xs text-muted-foreground mt-1">Part-exchange offer</p>
                      </div>
                    </div>
                  </div>

                  {/* Historical Price Data */}
                  <div className="bg-muted/30 rounded-lg p-6 border">
                    <h4 className="font-semibold mb-4">Historical Price Trends (2020 BMW X3 xDrive20d M Sport)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-semibold">Year</th>
                            <th className="text-left p-3 font-semibold">Average Mileage</th>
                            <th className="text-left p-3 font-semibold">Private Sale</th>
                            <th className="text-left p-3 font-semibold">Trade-In</th>
                            <th className="text-left p-3 font-semibold">% Change YoY</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">2021</td>
                            <td className="p-3">15,000 mi</td>
                            <td className="p-3 font-semibold">£38,500</td>
                            <td className="p-3">£35,200</td>
                            <td className="p-3 text-red-600">-23% (from new)</td>
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">2022</td>
                            <td className="p-3">25,000 mi</td>
                            <td className="p-3 font-semibold">£34,200</td>
                            <td className="p-3">£31,000</td>
                            <td className="p-3 text-red-600">-11.2%</td>
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">2023</td>
                            <td className="p-3">35,000 mi</td>
                            <td className="p-3 font-semibold">£28,400</td>
                            <td className="p-3">£25,100</td>
                            <td className="p-3 text-red-600">-17.0%</td>
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">2024</td>
                            <td className="p-3">45,000 mi</td>
                            <td className="p-3 font-semibold">£29,750</td>
                            <td className="p-3">£26,200</td>
                            <td className="p-3 text-green-600">+4.8%</td>
                          </tr>
                          <tr className="hover:bg-muted/50 bg-blue-50">
                            <td className="p-3 font-bold">2025 (est.)</td>
                            <td className="p-3">55,000 mi</td>
                            <td className="p-3 font-bold text-blue-600">£30,900</td>
                            <td className="p-3 font-bold">£27,200</td>
                            <td className="p-3 text-green-600">+3.9%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Value Over Time Chart */}
                  <div className="bg-muted/30 rounded-lg p-6 border">
                    <h4 className="font-semibold mb-4 flex items-center justify-between">
                      <span>12-Month Price Trajectory</span>
                      <Badge className="bg-amber-100 text-amber-800">Slight Depreciation</Badge>
                    </h4>
                    <div className="relative h-56">
                      {/* Chart with grid */}
                      <div className="absolute inset-0 flex flex-col justify-between text-xs text-muted-foreground pr-16">
                        <div className="flex items-center"><span className="w-12">£31k</span><div className="flex-1 border-t border-dashed border-muted-foreground/20"></div></div>
                        <div className="flex items-center"><span className="w-12">£30k</span><div className="flex-1 border-t border-dashed border-muted-foreground/20"></div></div>
                        <div className="flex items-center"><span className="w-12">£29k</span><div className="flex-1 border-t border-dashed border-muted-foreground/20"></div></div>
                        <div className="flex items-center"><span className="w-12">£28k</span><div className="flex-1 border-t border-dashed border-muted-foreground/20"></div></div>
                        <div className="flex items-center"><span className="w-12">£27k</span><div className="flex-1 border-t border-dashed border-muted-foreground/20"></div></div>
                      </div>
                      
                      {/* Line chart - showing gradual depreciation */}
                      <div className="absolute inset-0 pl-12 pr-4 pb-6 flex items-end">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <polyline
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            points="0,42 15,44 30,47 45,49 60,52 75,55 90,57 100,58"
                          />
                          <polyline
                            fill="url(#gradient)"
                            points="0,42 15,44 30,47 45,49 60,52 75,55 90,57 100,58 100,100 0,100"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
                              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05"/>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      
                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-12 right-4 flex justify-between text-xs text-muted-foreground">
                        <span>Dec '23</span>
                        <span>Mar '24</span>
                        <span>Jun '24</span>
                        <span>Sep '24</span>
                        <span>Dec '24</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">1-Month Change</p>
                        <p className="text-sm font-semibold text-amber-600">-£180 (-0.6%)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">3-Month Change</p>
                        <p className="text-sm font-semibold text-amber-600">-£420 (-1.4%)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">12-Month Change</p>
                        <p className="text-sm font-semibold text-amber-600">-£850 (-2.8%)</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Resale Liquidity */}
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Resale Liquidity Index
                      </h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 bg-green-200 rounded-full h-4">
                          <div className="bg-green-600 h-4 rounded-full flex items-center justify-end pr-2" style={{width: '78%'}}>
                            <span className="text-xs text-white font-bold">78%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average sale time</span>
                          <span className="font-semibold">18 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Segment average</span>
                          <span>24 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Views per listing</span>
                          <span className="font-semibold">347</span>
                        </div>
                      </div>
                      <p className="text-xs text-blue-600 mt-3">UK market data aggregation</p>
                      <div className="mt-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-green-600 text-white text-xs">Fast Seller</Badge>
                          <p className="text-xs font-semibold text-green-900">25% Faster Than Average</p>
                        </div>
                        <p className="text-xs text-gray-700">High viewing numbers indicate strong liquidity - easy resale when needed</p>
                      </div>
                    </div>
                    
                    {/* Color Desirability */}
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-3">Colour Desirability</h4>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-muted"></div>
                        <div>
                          <p className="font-semibold">Alpine White</p>
                          <Badge className="bg-green-100 text-green-800 text-xs">+£650 premium</Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs">
                        <p className="text-muted-foreground">Most desired colour in segment</p>
                        <p className="text-muted-foreground">Market share: 28% of listings</p>
                        <p className="text-muted-foreground">Days to sell: 14 (vs 21 avg)</p>
                      </div>
                      <p className="text-xs text-blue-600 mt-3">Data: Marketcheck Analysis</p>
                      <div className="mt-3 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-purple-600 text-white text-xs">Premium Color</Badge>
                          <p className="text-xs font-semibold text-purple-900">Widest Buyer Appeal</p>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-2">
                          <span className="text-gray-600">Sells in 14 days</span>
                          <span className="text-gray-900 font-semibold">vs 21 avg</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Demand Indicators */}
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-3">Demand Indicators</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Search Volume</span>
                            <span className="text-xs font-semibold">High</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Supply vs Demand</span>
                            <span className="text-xs font-semibold text-green-600">Favorable</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Price Stability</span>
                            <span className="text-xs font-semibold">Strong</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{width: '88%'}}></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-purple-600 bg-purple-50 p-2 rounded mt-3">
                        <strong>Market Insight:</strong> All key demand metrics strong - high search interest with constrained supply creates seller's market conditions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Running Costs & Maintenance Forecast */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">4. Running Costs & Maintenance Forecast</CardTitle>
                    <CardDescription>AI-powered cost predictions for servicing, repairs, fuel, and consumables</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* AI-Generated Running Costs Section */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6 mb-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI-Powered Cost Analysis</h4>
                      <p className="text-sm text-purple-700">The data in this section has been supercharged by AI</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Service Schedule */}
                  <div className="bg-card rounded-lg p-6 border">
                    <h4 className="font-semibold mb-4">Service Schedule & Costs</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-semibold">Service Type</th>
                            <th className="text-left p-3 font-semibold">Frequency</th>
                            <th className="text-left p-3 font-semibold">Main Dealer</th>
                            <th className="text-left p-3 font-semibold">Independent</th>
                            <th className="text-left p-3 font-semibold">Items Included</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">Oil Service</td>
                            <td className="p-3">12 months / 10,000 miles</td>
                            <td className="p-3 font-semibold">£285</td>
                            <td className="p-3 font-semibold text-green-600">£165</td>
                            <td className="p-3 text-xs">Engine oil, oil filter, inspection</td>
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">Full Service</td>
                            <td className="p-3">24 months / 20,000 miles</td>
                            <td className="p-3 font-semibold">£520</td>
                            <td className="p-3 font-semibold text-green-600">£320</td>
                            <td className="p-3 text-xs">Oil, filters (air, cabin, fuel), fluids check</td>
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">Major Service</td>
                            <td className="p-3">4 years / 40,000 miles</td>
                            <td className="p-3 font-semibold">£790</td>
                            <td className="p-3 font-semibold text-green-600">£480</td>
                            <td className="p-3 text-xs">Full service + brake fluid, gearbox check</td>
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">Brake Fluid</td>
                            <td className="p-3">24 months</td>
                            <td className="p-3 font-semibold">£95</td>
                            <td className="p-3 font-semibold text-green-600">£65</td>
                            <td className="p-3 text-xs">Brake fluid replacement</td>
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="p-3 font-medium">Coolant</td>
                            <td className="p-3">4 years</td>
                            <td className="p-3 font-semibold">£145</td>
                            <td className="p-3 font-semibold text-green-600">£95</td>
                            <td className="p-3 text-xs">Coolant flush and replacement</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {/* AI Service Analysis */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Wrench className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-blue-900">Service Recommendations</h5>
                          <p className="text-xs text-blue-700">Based on 45k mileage & 9k mi/yr usage</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <p className="text-xs font-semibold">Annual Service Budget</p>
                        </div>
                        <p className="text-lg font-bold text-green-600">£400-500</p>
                        <p className="text-xs text-gray-600 mt-1">Independent specialist estimate</p>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <Badge className="bg-green-100 text-green-800 text-xs">Savings</Badge>
                          <p className="text-xs text-gray-700">Independent specialists save <strong>35-40%</strong> vs main dealer</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge className="bg-blue-100 text-blue-800 text-xs">Warranty</Badge>
                          <p className="text-xs text-gray-700">No impact for vehicles over 3 years old</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Common Repairs & Costs */}
                  <div className="bg-card rounded-lg p-6 border">
                    <h4 className="font-semibold mb-4">Common Wear Items & Expected Costs</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm">Front Brake Pads & Discs</span>
                          <span className="font-semibold text-sm">£320-£480</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Typically last 40,000-50,000 miles. Consider inspection given advisory history.</p>
                        
                        <div className="flex justify-between items-center border-b pb-2 mt-3">
                          <span className="text-sm">Rear Brake Pads & Discs</span>
                          <span className="font-semibold text-sm">£280-£420</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Last longer than fronts - typically 60,000-70,000 miles.</p>
                        
                        <div className="flex justify-between items-center border-b pb-2 mt-3">
                          <span className="text-sm">Set of 4 Tyres (Premium)</span>
                          <span className="font-semibold text-sm">£650-£850</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Size: 245/45 R20. Premium brands recommended for xDrive system.</p>
                        
                        <div className="flex justify-between items-center border-b pb-2 mt-3">
                          <span className="text-sm">Battery Replacement</span>
                          <span className="font-semibold text-sm">£220-£280</span>
                        </div>
                        <p className="text-xs text-muted-foreground">AGM battery typically lasts 5-7 years. Coding required after replacement.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm">AdBlue Top-Up</span>
                          <span className="font-semibold text-sm">£15-£25</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Required every 6,000-8,000 miles. Essential for diesel emissions.</p>
                        
                        <div className="flex justify-between items-center border-b pb-2 mt-3">
                          <span className="text-sm">DPF Cleaning/Regeneration</span>
                          <span className="font-semibold text-sm">£150-£300</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Rarely needed if driven regularly on longer journeys.</p>
                        
                        <div className="flex justify-between items-center border-b pb-2 mt-3">
                          <span className="text-sm">Wiper Blades (Pair)</span>
                          <span className="font-semibold text-sm">£35-£55</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Replace annually for optimal visibility.</p>
                        
                        <div className="flex justify-between items-center border-b pb-2 mt-3">
                          <span className="text-sm">Air Conditioning Service</span>
                          <span className="font-semibold text-sm">£95-£140</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended every 2 years to maintain efficiency.</p>
                      </div>
                    </div>
                    
                    {/* AI Urgent Items Alert */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-4 mt-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-amber-500 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-amber-900">⚠️ Recommended Inspections</h5>
                          <p className="text-xs text-amber-700">Based on MOT advisory history</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 border-2 border-amber-300">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-red-100 text-red-800 text-xs">Priority</Badge>
                            <p className="text-sm font-semibold">Front Brake Inspection</p>
                          </div>
                          <p className="text-xs text-gray-700">Discs and pads flagged in multiple MOTs - assess remaining life</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 border border-amber-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-amber-100 text-amber-800 text-xs">Soon</Badge>
                            <p className="text-sm font-semibold">Rear Tyre Replacement</p>
                          </div>
                          <p className="text-xs text-gray-700">Tread approaching minimum (3.2mm) - need replacing within 3,000-5,000 miles</p>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="flex items-center gap-2">
                            <Calculator className="h-4 w-4 text-green-600" />
                            <p className="text-xs font-semibold text-green-900">First Year Budget: £800-1,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3-Year Cost Forecast */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-3">Annual Running Costs</h4>
                      <p className="text-3xl font-bold text-primary mb-2">£3,840</p>
                      <p className="text-xs text-muted-foreground mb-3">Based on 12,000 miles/year</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Fuel</span>
                          <span className="font-semibold">£1,850</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Road Tax</span>
                          <span className="font-semibold">£190</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insurance (est.)</span>
                          <span className="font-semibold">£680</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service & Maintenance</span>
                          <span className="font-semibold">£520</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tyres (annual avg.)</span>
                          <span className="font-semibold">£220</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-semibold">MOT</span>
                          <span className="font-semibold">£55</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">vs £4,380 class average</p>
                    </div>
                    
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-3">Reliability Score</h4>
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative w-32 h-32">
                          <svg className="transform -rotate-90 w-32 h-32">
                            <circle cx="64" cy="64" r="56" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
                            <circle cx="64" cy="64" r="56" stroke="hsl(var(--primary))" strokeWidth="8" fill="none"
                              strokeDasharray="351.86" strokeDashoffset="63.33" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold">8.2</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-800">Above Average</Badge>
                        <p className="text-xs text-muted-foreground mt-2">Based on 5,400+ MOT records</p>
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-3">3-Year Ownership Cost</h4>
                      <p className="text-3xl font-bold text-primary mb-2">£11,520</p>
                      <p className="text-xs text-muted-foreground mb-3">Total running costs over 3 years</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Cost per mile</span>
                          <span className="font-semibold">32p</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Monthly average</span>
                          <span className="font-semibold">£320</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t">
                        <p className="text-xs font-semibold mb-2">Fuel Economy</p>
                        <div className="flex justify-between text-xs">
                          <span>Combined (real-world)</span>
                          <span className="font-semibold">45-48 mpg</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>WLTP Official</span>
                          <span>52.3 mpg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>

            {/* 5. Safety Assessment */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">5. Safety Assessment</CardTitle>
                    <CardDescription>Crash test results, safety features, emissions analysis, and local theft risk</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Crash Test Ratings */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Euro NCAP Crash Test Results
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-baseline gap-2 mb-3">
                        <span className="text-6xl font-bold text-green-600">5</span>
                        <span className="text-3xl text-green-500">★★★★★</span>
                      </div>
                      <p className="text-sm font-semibold text-green-900 mb-2">Overall Rating</p>
                      <Badge className="bg-green-100 text-green-800">Excellent Safety</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Adult Occupant</span>
                          <span className="text-lg font-bold text-green-600">93%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '93%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Child Occupant</span>
                          <span className="text-lg font-bold text-green-600">88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Vulnerable Road Users</span>
                          <span className="text-lg font-bold text-amber-600">81%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{width: '81%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Safety Assist</span>
                          <span className="text-lg font-bold text-green-600">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emissions Analysis */}
                <div className="bg-card rounded-lg p-6 border">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Emissions Drift Analysis
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="h-32 bg-gradient-to-t from-green-100 to-transparent rounded-lg p-4 flex items-end justify-between gap-2">
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div className="bg-green-500 rounded-t" style={{width: '100%', height: '70px'}}></div>
                          <span className="text-xs text-muted-foreground">2022</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div className="bg-green-500 rounded-t" style={{width: '100%', height: '75px'}}></div>
                          <span className="text-xs text-muted-foreground">2023</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div className="bg-green-400 rounded-t" style={{width: '100%', height: '80px'}}></div>
                          <span className="text-xs text-muted-foreground">2024</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div className="bg-green-400 rounded-t" style={{width: '100%', height: '75px'}}></div>
                          <span className="text-xs text-muted-foreground">Current</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-medium text-green-700">Stable - within normal range</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <p className="text-sm font-semibold text-green-900">DPF Health: Good</p>
                        </div>
                        <p className="text-xs text-gray-700">No signs of diesel particulate filter blockage</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <p className="text-sm font-semibold text-green-900">EGR System: Normal</p>
                        </div>
                        <p className="text-xs text-gray-700">Emissions recirculation working correctly</p>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 mb-1">Likely Usage Pattern</p>
                        <p className="text-xs text-gray-700">Regular motorway driving helps keep DPF clear</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theft Risk Analysis */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Vehicle Theft & Crime Analysis
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                      <p className="text-xs text-muted-foreground mb-2">Local Area Risk</p>
                      <Badge className="bg-amber-100 text-amber-800 mb-3">Medium Risk</Badge>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Overall crime rate</span>
                          <span className="font-semibold">18/1,000</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-amber-600">Vehicle crime</span>
                          <span className="font-semibold text-amber-600">2.4/1,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                      <p className="text-xs text-muted-foreground mb-2">BMW X3 Theft Data</p>
                      <p className="text-2xl font-bold text-amber-600 mb-2">47</p>
                      <p className="text-xs text-gray-700">UK thefts in 2024</p>
                      <Badge className="bg-amber-100 text-amber-800 text-xs mt-2">Moderate Frequency</Badge>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-red-200">
                      <p className="text-xs text-muted-foreground mb-2">Primary Vulnerability</p>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <p className="text-sm font-semibold text-red-900">Keyless Entry</p>
                      </div>
                      <p className="text-xs text-gray-700">Relay attack susceptibility</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-amber-300">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900 mb-2">Recommended Security Measures</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <p className="text-xs text-gray-700">Steering wheel lock (£40-80)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <p className="text-xs text-gray-700">GPS tracker (£150-300)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <p className="text-xs text-gray-700">Faraday pouch for keys (£10-20)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <p className="text-xs text-gray-700">Driveway/garage parking</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consolidated AI Analysis */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI Analysis: Safety Assessment</h4>
                      <p className="text-sm text-purple-700">Comprehensive safety and security evaluation</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <h5 className="text-sm font-bold text-gray-900">Crash Safety</h5>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">• Top 5-star Euro NCAP rating</p>
                      <p className="text-xs text-gray-700 mb-2">• Excellent adult (93%) & child (88%) protection</p>
                      <p className="text-xs text-gray-700">• Lacks latest pedestrian detection vs 2023+ models</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <h5 className="text-sm font-bold text-gray-900">Emissions Health</h5>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">• Stable trend indicates good DPF/EGR health</p>
                      <p className="text-xs text-gray-700 mb-2">• No signs of diesel system issues</p>
                      <p className="text-xs text-gray-700">• Likely regular motorway use pattern</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                        <h5 className="text-sm font-bold text-gray-900">Theft Risk</h5>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">• Medium risk area with moderate X3 theft rate</p>
                      <p className="text-xs text-gray-700 mb-2">• Keyless entry relay attacks common</p>
                      <p className="text-xs text-gray-700">• Budget £200-400 for security upgrades</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-semibold text-green-900">AI Verdict: Strong Safety Profile</p>
                    </div>
                    <p className="text-xs text-green-800">Excellent crash protection and clean emissions health. Invest in anti-theft measures given keyless vulnerabilities.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 6. Provenance & Legal Checks */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">6. Provenance & Legal Checks</CardTitle>
                    <CardDescription>Write-off status, finance checks, theft markers, keeper history, and import records</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">Insurance Write-Off Check</h4>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-xs text-green-600">No Category Marker</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">Outstanding Finance</h4>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-xs text-green-600">No Active Agreements</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">Stolen Vehicle Marker</h4>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-xs text-green-600">Not Reported Stolen</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border">
                      <h4 className="font-semibold text-sm mb-1">Previous Plates & Keepers</h4>
                      <p className="text-xs text-muted-foreground">Plates: 1 (Original)</p>
                      <p className="text-xs text-muted-foreground">Keepers: 2 Previous</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">Export/Import History</h4>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-xs text-green-600">UK Vehicle - No Import</p>
                      <p className="text-xs text-muted-foreground">Continuous MOT history</p>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI Analysis: Provenance & Legal Status</h4>
                      <p className="text-sm text-purple-700">Complete legal and ownership history assessment</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h5 className="text-sm font-bold text-gray-900">Clean Record</h5>
                      </div>
                      <p className="text-xs text-gray-700">• No write-off category</p>
                      <p className="text-xs text-gray-700">• No outstanding finance</p>
                      <p className="text-xs text-gray-700">• Not reported stolen</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Car className="h-5 w-5 text-blue-600" />
                        <h5 className="text-sm font-bold text-gray-900">Ownership</h5>
                      </div>
                      <p className="text-xs text-gray-700">• 2 previous keepers - excellent</p>
                      <p className="text-xs text-gray-700">• Original registration plate</p>
                      <p className="text-xs text-gray-700">• Suggests careful ownership</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <h5 className="text-sm font-bold text-gray-900">UK Origin</h5>
                      </div>
                      <p className="text-xs text-gray-700">• UK vehicle, no import</p>
                      <p className="text-xs text-gray-700">• Continuous MOT history</p>
                      <p className="text-xs text-gray-700">• No spec discrepancies</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-semibold text-green-900">AI Verdict: Exemplary Provenance</p>
                    </div>
                    <p className="text-xs text-green-800">Perfect legal status with low keeper count and UK origin. Safe to proceed with purchase - verify VIN matches V5C.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 7. Auction & Damage History */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Camera className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">7. Auction & Damage History</CardTitle>
                    <CardDescription>Salvage auction records and AI-powered structural damage detection</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Salvage Auction Photos</h4>
                    <div className="bg-green-100 border-2 border-green-300 rounded p-4 text-center">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium text-green-800">No Auction Record Found</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Recalls Check</h4>
                    <div className="bg-green-100 border-2 border-green-300 rounded p-4 text-center">
                      <Shield className="h-12 w-12 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium text-green-800">No Outstanding Recalls</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Verified against DVSA recall database</p>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI Analysis: Damage & Recalls</h4>
                      <p className="text-sm text-purple-700">Structural damage and safety recall assessment</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h5 className="text-sm font-bold text-gray-900">No Salvage History</h5>
                      </div>
                      <p className="text-xs text-gray-700">• No auction records found</p>
                      <p className="text-xs text-gray-700">• No structural damage detected</p>
                      <p className="text-xs text-gray-700">• Clean damage history</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <h5 className="text-sm font-bold text-gray-900">No Recalls</h5>
                      </div>
                      <p className="text-xs text-gray-700">• DVSA database verified</p>
                      <p className="text-xs text-gray-700">• No outstanding recalls</p>
                      <p className="text-xs text-gray-700">• All safety items current</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-semibold text-green-900">AI Verdict: Clean Structural Record</p>
                    </div>
                    <p className="text-xs text-green-800">No damage history or outstanding recalls detected. Vehicle has clean structural integrity.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 8. Electric Vehicle Analysis */}
            <Card className="mb-6 opacity-60">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Battery className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-xl text-muted-foreground">8. EV Battery & Charging Status</CardTitle>
                    <CardDescription>Specialised modules for battery cars</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <Info className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Not applicable - Diesel vehicle</p>
                  <p className="text-xs text-muted-foreground mt-2">This section includes Battery Health & Range, Charging Cost Forecast, and Lifetime Carbon Footprint for electric vehicles</p>
                </div>
              </CardContent>
            </Card>

            {/* 9. Insurance Analysis */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-xl text-muted-foreground">9. Insurance Cost & Group Rating</CardTitle>
                    <CardDescription>Indicative insurance cost and group rating</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Insurance Group Rating</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">29E</span>
                      <span className="text-sm text-muted-foreground">/ 50</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Mid-range premium group</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">First Year Premium Range</h4>
                    <div className="flex items-baseline gap-2 mb-2">
                      <p className="text-2xl font-bold text-primary">£680</p>
                      <span className="text-sm text-muted-foreground">to</span>
                      <p className="text-2xl font-bold text-amber-600">£1,950</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Experienced driver (35yr, full NCB) to new driver (21yr, 0 NCB)</p>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI Analysis: Insurance Costs</h4>
                      <p className="text-sm text-purple-700">Group rating and premium estimates</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Group 29E Analysis</h5>
                      <p className="text-xs text-gray-700">• Higher than base X3 due to M Sport spec</p>
                      <p className="text-xs text-gray-700">• 190hp output impacts rating</p>
                      <p className="text-xs text-gray-700">• Mid-range for premium SUV segment</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Premium Factors</h5>
                      <p className="text-xs text-gray-700">• £680 with full NCB & 35+ age</p>
                      <p className="text-xs text-gray-700">• £1,950 for young/new drivers</p>
                      <p className="text-xs text-gray-700">• Theft risk impacts premiums</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      <p className="text-sm font-semibold text-blue-900">AI Verdict: Moderate Insurance Costs</p>
                    </div>
                    <p className="text-xs text-blue-800">Group 29E is reasonable for this spec. Shop around for best rates - experienced drivers can find competitive premiums.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 10. Lifestyle Suitability */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Car className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-xl text-muted-foreground">10. Lifestyle & Usage Compatibility</CardTitle>
                    <CardDescription>Assess if the car suits your everyday life</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Lifestyle Fit Score</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Boot Space</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-green-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div>
                          </div>
                          <span className="text-xs font-medium">Excellent</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Towing Capacity</span>
                        <span className="text-xs font-medium">2,000 kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Turning Circle</span>
                        <span className="text-xs">12.1m</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Infotainment Subscriptions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">BMW ConnectedDrive</span>
                        <Badge className="bg-amber-100 text-amber-800">Expired</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Renewal: £99/year</p>
                      <p className="text-xs text-muted-foreground">Features: Real-time traffic, remote services</p>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <Car className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI Analysis: Lifestyle Compatibility</h4>
                      <p className="text-sm text-purple-700">How this vehicle fits your daily needs</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h5 className="text-sm font-bold text-gray-900">Family Suitability</h5>
                      </div>
                      <p className="text-xs text-gray-700">• 550L boot - excellent for families</p>
                      <p className="text-xs text-gray-700">• 2,000kg towing for caravans</p>
                      <p className="text-xs text-gray-700">• 5 seats with spacious rear</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <h5 className="text-sm font-bold text-gray-900">Subscription Costs</h5>
                      </div>
                      <p className="text-xs text-gray-700">• ConnectedDrive expired</p>
                      <p className="text-xs text-gray-700">• £99/yr for navigation services</p>
                      <p className="text-xs text-gray-700">• Consider in ownership costs</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-semibold text-green-900">AI Verdict: Excellent All-Rounder</p>
                    </div>
                    <p className="text-xs text-green-800">Ideal for families and versatile lifestyle needs. Budget £99/yr for subscription services if you want connected features.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 11. Inspection Checklist */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-xl text-muted-foreground">11. Pre-Purchase Inspection Guide</CardTitle>
                    <CardDescription>Personalised inspection guide for physical viewing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Model-Specific Physical Inspection</h4>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">✓ Check EGR valve for carbon buildup</p>
                      <p className="text-xs text-muted-foreground">✓ Inspect DPF regeneration cycle</p>
                      <p className="text-xs text-amber-600">⚠️ Test all parking sensors (common failure)</p>
                      <p className="text-xs text-amber-600">⚠️ Check panoramic sunroof drains</p>
                      <p className="text-xs text-muted-foreground">✓ Verify iDrive system boots correctly</p>
                      <p className="text-xs text-amber-600">⚠️ Inspect front suspension bushes</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Paperwork Checklist</h4>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">✓ VIN matches V5C (check door pillar)</p>
                      <p className="text-xs text-muted-foreground">✓ Service history: 4 stamps expected</p>
                      <p className="text-xs text-muted-foreground">✓ Verify keeper count (should be 3)</p>
                      <p className="text-xs text-muted-foreground">✓ Check for import documentation</p>
                      <p className="text-xs text-muted-foreground">✓ Original purchase invoice if available</p>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-900">AI Analysis: Pre-Purchase Priorities</h4>
                      <p className="text-sm text-purple-700">Critical inspection points from 2,500+ X3 MOT records</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <h5 className="text-sm font-bold text-gray-900">Priority Checks</h5>
                      </div>
                      <p className="text-xs text-gray-700">• Parking sensors (fail often)</p>
                      <p className="text-xs text-gray-700">• Sunroof drains (leak risk)</p>
                      <p className="text-xs text-gray-700">• Front suspension bushes</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Wrench className="h-5 w-5 text-blue-600" />
                        <h5 className="text-sm font-bold text-gray-900">Diesel Systems</h5>
                      </div>
                      <p className="text-xs text-gray-700">• EGR valve carbon buildup</p>
                      <p className="text-xs text-gray-700">• DPF regeneration cycle</p>
                      <p className="text-xs text-gray-700">• iDrive system function</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        <h5 className="text-sm font-bold text-gray-900">Documentation</h5>
                      </div>
                      <p className="text-xs text-gray-700">• VIN matches V5C</p>
                      <p className="text-xs text-gray-700">• 4 service stamps expected</p>
                      <p className="text-xs text-gray-700">• Keeper count verified</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      <p className="text-sm font-semibold text-blue-900">AI Verdict: Focus on Common Issues</p>
                    </div>
                    <p className="text-xs text-blue-800">Prioritize parking sensors, sunroof drains, and front suspension during viewing. These are the most common X3 failure points based on MOT data.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-primary/5 rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold mb-4">Ready to check your own vehicle?</h3>
                <p className="text-muted-foreground mb-6">Get instant access to basic information, then add only the modules you need.</p>
                <Link to="/">
                  <Button size="lg" className="px-8">Start Your Vehicle Check</Button>
                </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Separator and Additional Showcase Sections */}
      <div className="container mx-auto px-4 max-w-5xl">
        <Separator className="my-12" />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">More Example Data Modules</h2>
          <p className="text-muted-foreground">See how different vehicle scenarios are presented in our reports</p>
        </div>
      </div>
      <HomepageShowcaseSections />
      </div>
      
      <Footer />
    </div>
  );
};

export default ExampleReport;
