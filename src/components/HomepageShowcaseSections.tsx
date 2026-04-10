import { Battery, Zap, Leaf, AlertTriangle, ShieldAlert, FileWarning, Car, Camera, Hammer, AlertCircle, CheckCircle, XCircle, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const HomepageShowcaseSections = () => {
  return (
    <div className="space-y-16">
      {/* EV Battery & Charging Section */}
      <section className="py-16 bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
              Electric Vehicle Insights
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              EV Battery & Charging Status
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Example data for a 2021 Tesla Model 3 Long Range
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-green-200/50 dark:border-green-800/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50">
                    <Battery className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Battery Health Analysis</CardTitle>
                    <p className="text-sm text-muted-foreground">Based on DVSA MOT mileage records and manufacturer data</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Battery Health */}
                  <div className="bg-background/60 rounded-xl p-5 border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Battery className="h-5 w-5 text-green-500" />
                      <span className="font-semibold text-foreground">Battery Health</span>
                    </div>
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">94%</div>
                    <p className="text-sm text-muted-foreground mb-3">Estimated remaining capacity</p>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <p className="text-xs text-green-700 dark:text-green-300 flex items-start gap-2">
                        <Zap className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>AI Insight:</strong> Battery degradation of 6% over 3 years is better than the fleet average of 8%. This vehicle has been well-maintained with consistent charging patterns.</span>
                      </p>
                    </div>
                  </div>

                  {/* Range Estimate */}
                  <div className="bg-background/60 rounded-xl p-5 border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-foreground">Current Range</span>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">326 mi</div>
                    <p className="text-sm text-muted-foreground mb-3">Estimated real-world range</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Original Range:</span>
                        <span className="font-medium">348 miles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Range Loss:</span>
                        <span className="font-medium text-amber-600">-22 miles</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
                        <Zap className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>AI Insight:</strong> Range degradation is within expected parameters for a vehicle with 34,521 miles.</span>
                      </p>
                    </div>
                  </div>

                  {/* Charging Cost */}
                  <div className="bg-background/60 rounded-xl p-5 border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-amber-500" />
                      <span className="font-semibold text-foreground">Charging Costs</span>
                    </div>
                    <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">£0.05<span className="text-lg">/mi</span></div>
                    <p className="text-sm text-muted-foreground mb-3">Average cost per mile</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Home Charging (7kW):</span>
                        <span className="font-medium">£0.04/mi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Public DC Fast:</span>
                        <span className="font-medium">£0.12/mi</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                      <p className="text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
                        <Leaf className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>AI Insight:</strong> Switching to Octopus Go tariff could save approximately £180/year based on average usage patterns.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Carbon Footprint */}
                <div className="mt-6 p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="h-5 w-5 text-emerald-600" />
                    <span className="font-semibold text-foreground">Lifetime Carbon Footprint</span>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">8.2 tonnes</div>
                      <p className="text-xs text-muted-foreground">Manufacturing CO₂</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">1.4 tonnes</div>
                      <p className="text-xs text-muted-foreground">Driving CO₂ (to date)</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">9.6 tonnes</div>
                      <p className="text-xs text-muted-foreground">Total Lifetime</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">-4.8 tonnes</div>
                      <p className="text-xs text-muted-foreground">Saved vs Petrol Equivalent</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Provenance & Risk Section - Problem Vehicle */}
      <section className="py-16 bg-gradient-to-br from-red-50/50 to-orange-50/30 dark:from-red-950/20 dark:to-orange-950/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
              Provenance & Risk Registers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vehicle With Multiple Red Flags
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Example showing a 2019 BMW 320d with serious history issues
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-red-200/50 dark:border-red-800/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                    <ShieldAlert className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Provenance Check Results</CardTitle>
                    <p className="text-sm text-muted-foreground">Data from Car Analytics trade feed, DVLA, HMRC NOVA</p>
                  </div>
                  <Badge variant="destructive" className="ml-auto">4 Issues Found</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Write-Off */}
                  <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border border-red-200 dark:border-red-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-700 dark:text-red-400">Insurance Write-Off</span>
                      <Badge variant="destructive" className="ml-auto text-xs">CATEGORY S</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Write-Off Date:</span>
                        <span className="font-medium">14 March 2022</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium text-red-600">S - Structural Damage</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Insurer:</span>
                        <span className="font-medium">Admiral Insurance</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
                      <p className="text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>AI Warning:</strong> Category S indicates structural damage was sustained. Professional inspection is essential before purchase. Resale value typically reduced by 30-50%.</span>
                      </p>
                    </div>
                  </div>

                  {/* Outstanding Finance */}
                  <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-5 border border-orange-200 dark:border-orange-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <FileWarning className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold text-orange-700 dark:text-orange-400">Outstanding Finance</span>
                      <Badge className="ml-auto text-xs bg-orange-200 text-orange-800">ACTIVE</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Finance Type:</span>
                        <span className="font-medium">HP Agreement</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Finance Company:</span>
                        <span className="font-medium">BMW Financial Services</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Agreement Date:</span>
                        <span className="font-medium">September 2019</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                      <p className="text-xs text-orange-700 dark:text-orange-300 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>AI Warning:</strong> Do not purchase until seller provides settlement letter. The finance company legally owns this vehicle until the balance is cleared.</span>
                      </p>
                    </div>
                  </div>

                  {/* Stolen Marker */}
                  <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border border-red-200 dark:border-red-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldAlert className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-700 dark:text-red-400">Stolen Vehicle Marker</span>
                      <Badge variant="destructive" className="ml-auto text-xs">ALERT</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium text-red-600">Previously Reported Stolen</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reported Date:</span>
                        <span className="font-medium">28 January 2022</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recovered:</span>
                        <span className="font-medium">02 February 2022</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
                      <p className="text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>AI Warning:</strong> Vehicle was reported stolen and later recovered. Verify V5C carefully and check VIN matches all panels. Consider requesting police confirmation of status.</span>
                      </p>
                    </div>
                  </div>

                  {/* Export/Import History */}
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-5 border border-amber-200 dark:border-amber-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Car className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-amber-700 dark:text-amber-400">Export & Import History</span>
                      <Badge className="ml-auto text-xs bg-amber-200 text-amber-800">IMPORTED</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NOVA Declaration:</span>
                        <span className="font-medium">Yes - September 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Import Country:</span>
                        <span className="font-medium">Ireland</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">MOT Gap:</span>
                        <span className="font-medium text-amber-600">18 months</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                      <p className="text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>AI Warning:</strong> 18-month MOT gap coincides with export period. Irish NCT history unavailable. Mileage cannot be verified for this period - potential clocking risk.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Plate History */}
                <div className="mt-6 p-5 bg-background/60 rounded-xl border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold text-foreground">Previous Plates & Keeper Timeline</span>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-mono font-bold text-lg">BD19 XYZ</div>
                      <p className="text-xs text-muted-foreground">Original Plate</p>
                      <p className="text-xs text-muted-foreground">Mar 2019 - Jan 2022</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-mono font-bold text-lg">191-D-12345</div>
                      <p className="text-xs text-muted-foreground">Irish Plate</p>
                      <p className="text-xs text-muted-foreground">Mar 2022 - Sep 2023</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-mono font-bold text-lg">YH23 ABC</div>
                      <p className="text-xs text-muted-foreground">Re-registered UK</p>
                      <p className="text-xs text-muted-foreground">Sep 2023 - Present</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/50">
                      <div className="font-bold text-lg text-red-600">5 Keepers</div>
                      <p className="text-xs text-red-600">High Turnover</p>
                      <p className="text-xs text-muted-foreground">in 4.5 years</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/50">
                    <p className="text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span><strong>AI Warning:</strong> 5 keepers in under 5 years is unusually high. Combined with write-off history, stolen marker, and export, this vehicle presents significant risk. We strongly advise against purchase.</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Salvage & Damage Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50/50 to-slate-50/30 dark:from-purple-950/20 dark:to-slate-950/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
              Salvage & Damage Insights
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Auction History & Structural Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Example showing a 2020 Mercedes-Benz A200 with salvage history
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-purple-200/50 dark:border-purple-800/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                    <Camera className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Salvage Auction Records</CardTitle>
                    <p className="text-sm text-muted-foreground">Images and data from Copart UK auction</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Auction Photos Grid */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Salvage Auction Photos - Lot #45892731
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-300/50 to-transparent"></div>
                      <div className="text-center z-10">
                        <Car className="h-8 w-8 mx-auto text-slate-500 mb-1" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Front View</span>
                      </div>
                      <Badge variant="destructive" className="absolute top-2 right-2 text-xs">Damage</Badge>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-300/50 to-transparent"></div>
                      <div className="text-center z-10">
                        <Car className="h-8 w-8 mx-auto text-slate-500 mb-1" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Driver Side</span>
                      </div>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-300/50 to-transparent"></div>
                      <div className="text-center z-10">
                        <Car className="h-8 w-8 mx-auto text-slate-500 mb-1" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Interior</span>
                      </div>
                      <Badge className="absolute top-2 right-2 text-xs bg-orange-200 text-orange-800">Airbags</Badge>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-300/50 to-transparent"></div>
                      <div className="text-center z-10">
                        <Car className="h-8 w-8 mx-auto text-slate-500 mb-1" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Engine Bay</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800/50">
                    <p className="text-xs text-purple-700 dark:text-purple-300 flex items-start gap-2">
                      <Camera className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span><strong>AI Vision Analysis:</strong> Front-end collision detected. Driver airbag deployment visible in interior photo. Front bumper, bonnet, and headlight damage confirmed. Radiator support may be compromised.</span>
                    </p>
                  </div>
                </div>

                {/* Auction Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-background/60 rounded-xl p-5 border border-border/50">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Hammer className="h-4 w-4" />
                      Auction Sale Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Auction House:</span>
                        <span className="font-medium">Copart UK - Leeds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sale Date:</span>
                        <span className="font-medium">18 November 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lot Number:</span>
                        <span className="font-medium">#45892731</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sale Price:</span>
                        <span className="font-medium">£8,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pre-Accident Value:</span>
                        <span className="font-medium">£19,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Damage Estimate:</span>
                        <span className="font-medium text-red-600">£11,050 (57%)</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Structural Alert */}
                  <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border border-red-200 dark:border-red-800/50">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-700 dark:text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      AI Structural Damage Alert
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-sm">Front Chassis Rails</span>
                          <p className="text-xs text-muted-foreground">Potential deformation detected from impact angle</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-sm">Airbag Deployment</span>
                          <p className="text-xs text-muted-foreground">Driver front airbag confirmed deployed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-sm">A-Pillar</span>
                          <p className="text-xs text-muted-foreground">Requires physical inspection - inconclusive from photos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outstanding Recalls */}
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-5 border border-amber-200 dark:border-amber-800/50">
                  <h4 className="font-semibold mb-4 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                    Outstanding Safety Recalls
                    <Badge className="ml-2 bg-amber-200 text-amber-800">2 Open</Badge>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-background/80 rounded-lg p-4 border border-amber-200/50 dark:border-amber-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs border-red-300 text-red-600">High Priority</Badge>
                        <span className="text-xs text-muted-foreground">R/2023/142</span>
                      </div>
                      <h5 className="font-medium text-sm mb-1">Brake Hydraulic Unit Software</h5>
                      <p className="text-xs text-muted-foreground mb-2">Potential loss of power braking assistance under specific conditions. Software update required.</p>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Issued:</span> <span className="font-medium">August 2023</span>
                      </div>
                    </div>
                    <div className="bg-background/80 rounded-lg p-4 border border-amber-200/50 dark:border-amber-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs border-amber-300 text-amber-600">Medium Priority</Badge>
                        <span className="text-xs text-muted-foreground">R/2022/089</span>
                      </div>
                      <h5 className="font-medium text-sm mb-1">Fuel Pump Control Module</h5>
                      <p className="text-xs text-muted-foreground mb-2">Fuel pump may fail causing engine stall. Module replacement required.</p>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Issued:</span> <span className="font-medium">March 2022</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                    <p className="text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span><strong>AI Warning:</strong> Both recalls remain incomplete for this VIN. The brake recall is safety-critical and should be addressed immediately by Mercedes-Benz. Recalls are free of charge regardless of warranty status.</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
