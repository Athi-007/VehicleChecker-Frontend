import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Car, Shield, FileText, AlertTriangle, CheckCircle, Info,
  Battery, Eye, Heart, Wrench, TrendingUp, Users, Key, Loader2, MapPin
} from "lucide-react";
import {
  vehicleService,
  SnapshotBaseResponse,
  BuildSheetResponse,
  ProvenanceResponse,
  EVInsightsResponse,
  LifestyleFitResponse,
  PrePurchaseInspectionsResponse,
  SafetyAssessmentResponse,
  ApiResponse,
} from "@/services/api";

interface VehicleReportProps {
  registration: string;
  snapshotData: SnapshotBaseResponse;
}

interface ModuleData {
  buildSheet: ApiResponse<BuildSheetResponse> | null;
  safety: ApiResponse<SafetyAssessmentResponse> | null;
  provenance: ApiResponse<ProvenanceResponse> | null;
  evInsights: ApiResponse<EVInsightsResponse> | null;
  lifestyleFit: ApiResponse<LifestyleFitResponse> | null;
  prePurchase: ApiResponse<PrePurchaseInspectionsResponse> | null;
}

export function VehicleReport({ registration, snapshotData }: VehicleReportProps) {
  const [moduleData, setModuleData] = useState<ModuleData>({
    buildSheet: null,
    safety: null,
    provenance: null,
    evInsights: null,
    lifestyleFit: null,
    prePurchase: null,
  });
  const [loadingModules, setLoadingModules] = useState<Set<string>>(new Set());
  const [loadingAll, setLoadingAll] = useState(false);

  // Safety module: address is required by the API
  const [safetyAddress, setSafetyAddress] = useState("");
  const [showSafetyAddressInput, setShowSafetyAddressInput] = useState(false);
  // "Load All" address prompt
  const [showAllAddressInput, setShowAllAddressInput] = useState(false);
  const [allAddress, setAllAddress] = useState("");

  const fetchModule = async (moduleId: string, extra?: { address?: string }) => {
    setLoadingModules(prev => new Set(prev).add(moduleId));
    try {
      let result: any;
      switch (moduleId) {
        case 'build-sheet':
          result = await vehicleService.getBuildSheet(registration);
          setModuleData(prev => ({ ...prev, buildSheet: result }));
          break;
        case 'safety': {
          const addr = extra?.address ?? safetyAddress;
          result = await vehicleService.getSafetyAssessment(registration, addr);
          setModuleData(prev => ({ ...prev, safety: result }));
          break;
        }
        case 'provenance':
          result = await vehicleService.getProvenance(registration);
          setModuleData(prev => ({ ...prev, provenance: result }));
          break;
        case 'ev-insights':
          result = await vehicleService.getEVInsights(registration);
          setModuleData(prev => ({ ...prev, evInsights: result }));
          break;
        case 'lifestyle-fit':
          result = await vehicleService.getLifestyleFit(registration);
          setModuleData(prev => ({ ...prev, lifestyleFit: result }));
          break;
        case 'pre-purchase':
          result = await vehicleService.getPrePurchaseInspections(registration);
          setModuleData(prev => ({ ...prev, prePurchase: result }));
          break;
      }
    } finally {
      setLoadingModules(prev => {
        const next = new Set(prev);
        next.delete(moduleId);
        return next;
      });
    }
  };

  const fetchAllModules = async (address: string) => {
    setLoadingAll(true);
    setShowAllAddressInput(false);
    try {
      const results = await vehicleService.fetchAllModules(registration, address);
      setModuleData({
        buildSheet: results.buildSheet,
        safety: results.safety,
        provenance: results.provenance,
        evInsights: results.evInsights,
        lifestyleFit: results.lifestyleFit,
        prePurchase: results.prePurchase,
      });
    } finally {
      setLoadingAll(false);
    }
  };

  const { vehicle_info: info, mot_history: mot, tax_status: tax, rarity_count: rarity, recalls, ai_analysis } = snapshotData;

  return (
    <div className="space-y-6">
      {/* ======= SNAPSHOT BASE (always shown) ======= */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">
                {info.year} {info.make} {info.model}
              </CardTitle>
              <CardDescription>
                Snapshot Base — {info.registration} • {info.color} • {info.mileage?.toLocaleString()} miles
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">FREE</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tax & MOT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 border">
              <h4 className="font-semibold mb-2 text-sm">Tax Status</h4>
              <Badge className={tax.tax_status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {tax.tax_status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">£{tax.annual_rate}/year • Expires {tax.expires}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <h4 className="font-semibold mb-2 text-sm">MOT Status</h4>
              <Badge className={mot.current_status === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {mot.current_status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">Valid until {mot.valid_until}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <h4 className="font-semibold mb-2 text-sm">Health Score</h4>
              <div className="text-2xl font-bold text-primary">{ai_analysis.overall_assessment.health_score}/10</div>
              <p className="text-xs text-muted-foreground mt-1">{ai_analysis.overall_assessment.confidence} confidence</p>
            </div>
          </div>

          {/* MOT History */}
          <div className="bg-card rounded-lg p-4 border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-primary" />
              MOT History ({mot.test_history.length} tests)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-2 font-semibold">Date</th>
                    <th className="text-left p-2 font-semibold">Mileage</th>
                    <th className="text-left p-2 font-semibold">Result</th>
                    <th className="text-left p-2 font-semibold">Advisories</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mot.test_history.map((test, i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="p-2">{test.date}</td>
                      <td className="p-2">{Number(test.mileage).toLocaleString()} mi</td>
                      <td className="p-2">
                        <Badge className={`text-xs ${test.result === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {test.result}
                        </Badge>
                      </td>
                      <td className="p-2 text-xs">
                        {test.advisories.length > 0 ? (
                          <ul className="space-y-1">
                            {test.advisories.map((a, j) => (
                              <li key={j} className="text-amber-600">⚠ {a}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-green-600">No advisories</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
              <div className="bg-muted/30 p-2 rounded">
                <p className="text-muted-foreground">Est. current mileage</p>
                <p className="font-semibold">{mot.estimated_current_mileage?.toLocaleString()} miles</p>
              </div>
              <div className="bg-muted/30 p-2 rounded">
                <p className="text-muted-foreground">Avg annual mileage</p>
                <p className="font-semibold">{mot.average_annual_mileage?.toLocaleString()} mi/year</p>
              </div>
            </div>
          </div>

          {/* Rarity */}
          <div className="bg-card rounded-lg p-4 border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Rarity — {rarity.make} {rarity.model}
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total registered</p>
                <p className="font-semibold">{rarity.total.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Active on road</p>
                <p className="font-semibold text-green-600">{rarity.active.toLocaleString()} ({rarity.active_percent}%)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Off road / scrapped</p>
                <p className="font-semibold text-red-600">{rarity.inactive.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Recalls */}
          {recalls.number_of_recalls > 0 && (
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-900">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Safety Recalls ({recalls.number_of_recalls})
              </h4>
              <div className="space-y-3">
                {recalls.recalls_data.map((recall, i) => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-amber-200">
                    <p className="text-sm font-medium text-amber-900">{recall.concern}</p>
                    <p className="text-xs text-muted-foreground mt-1">Remedy: {recall.remedy}</p>
                    <p className="text-xs text-muted-foreground">Vehicles affected: {recall.number_of_vehicles_affected?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis */}
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-purple-900">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              AI Analysis
            </h4>
            <p className="text-sm text-purple-800 mb-3">{ai_analysis.overall_assessment.recommendation}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h5 className="text-xs font-bold text-green-800 mb-1">Strengths</h5>
                <ul className="text-xs space-y-1">
                  {ai_analysis.market_position.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-1"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 shrink-0" /> {s}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h5 className="text-xs font-bold text-red-800 mb-1">Risks</h5>
                <ul className="text-xs space-y-1">
                  {ai_analysis.market_position.risks.map((r, i) => (
                    <li key={i} className="flex items-start gap-1"><AlertTriangle className="h-3 w-3 text-red-600 mt-0.5 shrink-0" /> {r}</li>
                  ))}
                </ul>
              </div>
            </div>
            {mot.ai_insights.recommended_actions.length > 0 && (
              <div className="mt-3 bg-green-50 rounded-lg p-3 border border-green-200">
                <h5 className="text-xs font-bold text-green-900 mb-1">Recommended Actions</h5>
                <ul className="text-xs space-y-1">
                  {mot.ai_insights.recommended_actions.map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ======= LOAD ALL MODULES BUTTON ======= */}
      <div className="text-center space-y-3">
        {!showAllAddressInput ? (
          <Button
            onClick={() => setShowAllAddressInput(true)}
            disabled={loadingAll}
            size="lg"
            className="px-8"
          >
            {loadingAll ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading All Modules...
              </>
            ) : (
              <>Load All Report Modules</>
            )}
          </Button>
        ) : (
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-card border border-border rounded-xl p-4 shadow-sm max-w-xl mx-auto w-full">
            <MapPin className="h-5 w-5 text-amber-500 shrink-0" />
            <Input
              placeholder="Enter address for Safety Assessment (e.g. 10 Downing St, London)"
              value={allAddress}
              onChange={e => setAllAddress(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && allAddress.trim() && fetchAllModules(allAddress.trim())}
              className="flex-1"
            />
            <Button
              onClick={() => allAddress.trim() && fetchAllModules(allAddress.trim())}
              disabled={!allAddress.trim()}
              size="sm"
              className="shrink-0"
            >
              Load All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllAddressInput(false)}
              className="shrink-0"
            >
              Cancel
            </Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Address is needed for the Safety &amp; Risk Assessment module • Or load individual sections below
        </p>
      </div>

      {/* ======= 2. BUILD SHEET ======= */}
      <ModuleCard
        title="Build Sheet & Factory Options"
        icon={<FileText className="h-5 w-5 text-blue-600" />}
        isLoaded={!!moduleData.buildSheet}
        isLoading={loadingModules.has('build-sheet') || loadingAll}
        onLoad={() => fetchModule('build-sheet')}
        error={moduleData.buildSheet?.success === false ? moduleData.buildSheet.error : undefined}
      >
        {moduleData.buildSheet?.data && <BuildSheetSection data={moduleData.buildSheet.data} />}
      </ModuleCard>

      {/* ======= 3. SAFETY ASSESSMENT ======= */}
      <ModuleCard
        title="Safety & Risk Assessment"
        icon={<Shield className="h-5 w-5 text-amber-600" />}
        isLoaded={!!moduleData.safety}
        isLoading={loadingModules.has('safety') || loadingAll}
        onLoad={() => setShowSafetyAddressInput(true)}
        error={moduleData.safety?.success === false ? moduleData.safety.error : undefined}
      >
        {/* Address input shown before fetching */}
        {showSafetyAddressInput && !moduleData.safety && (
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
            <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
            <span className="text-xs text-amber-800 shrink-0">Address required:</span>
            <Input
              placeholder="e.g. 10 Downing St, London SW1A 2AA"
              value={safetyAddress}
              onChange={e => setSafetyAddress(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && safetyAddress.trim()) {
                  setShowSafetyAddressInput(false);
                  fetchModule('safety', { address: safetyAddress.trim() });
                }
              }}
              className="flex-1 text-sm"
            />
            <Button
              size="sm"
              onClick={() => {
                if (safetyAddress.trim()) {
                  setShowSafetyAddressInput(false);
                  fetchModule('safety', { address: safetyAddress.trim() });
                }
              }}
              disabled={!safetyAddress.trim()}
              className="shrink-0"
            >
              Confirm
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowSafetyAddressInput(false)}
              className="shrink-0"
            >
              Cancel
            </Button>
          </div>
        )}
        {moduleData.safety?.data && <SafetyAssessmentSection data={moduleData.safety.data} />}
      </ModuleCard>

      {/* ======= 4. PROVENANCE ======= */}
      <ModuleCard
        title="Provenance & Risk Registers"
        icon={<Key className="h-5 w-5 text-red-600" />}
        isLoaded={!!moduleData.provenance}
        isLoading={loadingModules.has('provenance') || loadingAll}
        onLoad={() => fetchModule('provenance')}
        error={moduleData.provenance?.success === false ? moduleData.provenance.error : undefined}
      >
        {moduleData.provenance?.data && <ProvenanceSection data={moduleData.provenance.data} />}
      </ModuleCard>

      {/* ======= 5. EV INSIGHTS ======= */}
      <ModuleCard
        title="Electric Vehicle Insights"
        icon={<Battery className="h-5 w-5 text-green-600" />}
        isLoaded={!!moduleData.evInsights}
        isLoading={loadingModules.has('ev-insights') || loadingAll}
        onLoad={() => fetchModule('ev-insights')}
        error={moduleData.evInsights?.success === false ? moduleData.evInsights.error : undefined}
      >
        {moduleData.evInsights?.data && <EVInsightsSection data={moduleData.evInsights.data} />}
      </ModuleCard>

      {/* ======= 6. LIFESTYLE FIT ======= */}
      <ModuleCard
        title="Lifestyle Fit Tools"
        icon={<Heart className="h-5 w-5 text-pink-600" />}
        isLoaded={!!moduleData.lifestyleFit}
        isLoading={loadingModules.has('lifestyle-fit') || loadingAll}
        onLoad={() => fetchModule('lifestyle-fit')}
        error={moduleData.lifestyleFit?.success === false ? moduleData.lifestyleFit.error : undefined}
      >
        {moduleData.lifestyleFit?.data && <LifestyleFitSection data={moduleData.lifestyleFit.data} />}
      </ModuleCard>

      {/* ======= 7. PRE-PURCHASE INSPECTIONS ======= */}
      <ModuleCard
        title="Pre-Purchase Inspections (Viewing Day)"
        icon={<Eye className="h-5 w-5 text-indigo-600" />}
        isLoaded={!!moduleData.prePurchase}
        isLoading={loadingModules.has('pre-purchase') || loadingAll}
        onLoad={() => fetchModule('pre-purchase')}
        error={moduleData.prePurchase?.success === false ? moduleData.prePurchase.error : undefined}
      >
        {moduleData.prePurchase?.data && <PrePurchaseSection data={moduleData.prePurchase.data} />}
      </ModuleCard>
    </div>
  );
}

// ============================================================
// Reusable Module Card wrapper
// ============================================================
function ModuleCard({
  title, icon, isLoaded, isLoading, onLoad, error, children
}: {
  title: string;
  icon: React.ReactNode;
  isLoaded: boolean;
  isLoading: boolean;
  onLoad: () => void;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          {!isLoaded && !isLoading && (
            <Button variant="outline" size="sm" onClick={onLoad}>
              Load Data
            </Button>
          )}
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          )}
          {isLoaded && !error && (
            <Badge className="bg-green-100 text-green-800">Loaded</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Failed to load data</p>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
          </div>
        )}
        {!isLoaded && !isLoading && !error && (
          <p className="text-sm text-muted-foreground">Click "Load Data" to fetch this module's data.</p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

// ============================================================
// Build Sheet Section
// ============================================================
function BuildSheetSection({ data }: { data: BuildSheetResponse }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="text-sm font-semibold mb-2">Engine</h5>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Capacity</span><span className="font-medium">{data.specifications.engine.capacity}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{data.specifications.engine.aspiration}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Power</span><span className="font-medium">{data.specifications.performance.power.Bhp} BHP</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Torque</span><span className="font-medium">{data.specifications.performance.torque.Nm} Nm</span></div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h5 className="text-sm font-semibold mb-2">Transmission</h5>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Gearbox</span><span className="font-medium">{data.specifications.transmission_drive.gearbox}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Gears</span><span className="font-medium">{data.specifications.transmission_drive.gears}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Drivetrain</span><span className="font-medium">{data.specifications.transmission_drive.drivetrain}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Drive Axle</span><span className="font-medium">{data.specifications.transmission_drive.driving_axle}</span></div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h5 className="text-sm font-semibold mb-2">Efficiency</h5>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Combined MPG</span><span className="font-medium">{data.specifications.efficiency_emissions.wltp_combined_mpg}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">CO₂</span><span className="font-medium">{data.specifications.efficiency_emissions.co2_emissions_gkm} g/km</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Euro Standard</span><span className="font-medium">{data.specifications.efficiency_emissions.euro_standard}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card rounded-lg p-3 border text-center">
          <p className="text-xs text-muted-foreground">Boot Space</p>
          <p className="text-lg font-bold">{data.additional_specs.boot_space.litres}L</p>
        </div>
        <div className="bg-card rounded-lg p-3 border text-center">
          <p className="text-xs text-muted-foreground">Fuel Tank</p>
          <p className="text-lg font-bold">{data.additional_specs.fuel_tank.capacity_litres}L</p>
        </div>
        <div className="bg-card rounded-lg p-3 border text-center">
          <p className="text-xs text-muted-foreground">Kerb Weight</p>
          <p className="text-lg font-bold">{data.additional_specs.kerb_weight.kg}kg</p>
        </div>
        <div className="bg-card rounded-lg p-3 border text-center">
          <p className="text-xs text-muted-foreground">Est. Range</p>
          <p className="text-lg font-bold">{data.additional_specs.fuel_tank.estimated_range_miles} mi</p>
        </div>
      </div>

      {data.equipment_grouped && Object.keys(data.equipment_grouped).length > 0 && (
        <div className="bg-card rounded-lg p-4 border">
          <h5 className="text-sm font-semibold mb-3">Standard Equipment</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data.equipment_grouped).map(([category, items]) => (
              <div key={category}>
                <h6 className="text-xs font-semibold text-primary mb-1">{category}</h6>
                <ul className="space-y-0.5 text-xs text-muted-foreground">
                  {items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.ai_insights && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-300 rounded-lg p-4">
          <h5 className="text-sm font-bold text-purple-900 mb-2">AI Specification Verdict</h5>
          <p className="text-xs text-purple-800">{data.ai_insights.resale_verdict.summary}</p>
          <div className="mt-2 flex gap-2">
            <Badge className="bg-purple-100 text-purple-800 text-xs">Rating: {data.ai_insights.resale_verdict.overall_rating}</Badge>
            {data.ai_insights.resale_verdict.resale_premium && (
              <Badge className="bg-green-100 text-green-800 text-xs">Resale: {data.ai_insights.resale_verdict.resale_premium}</Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Provenance Section
// ============================================================
function ProvenanceSection({ data }: { data: ProvenanceResponse }) {
  return (
    <div className="space-y-4">
      <div className={`rounded-lg p-4 border ${data.writeoff?.ai_insight ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
        <h5 className="text-sm font-semibold flex items-center gap-2">
          {data.writeoff?.ai_insight ? <AlertTriangle className="h-4 w-4 text-red-600" /> : <CheckCircle className="h-4 w-4 text-green-600" />}
          Write-off Check
        </h5>
        <p className="text-xs mt-1">{data.writeoff?.ai_insight || 'No write-off history found ✓'}</p>
      </div>

      <div className={`rounded-lg p-4 border ${data.finance ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-200'}`}>
        <h5 className="text-sm font-semibold flex items-center gap-2">
          {data.finance
            ? <AlertTriangle className="h-4 w-4 text-red-600" />
            : <CheckCircle className="h-4 w-4 text-green-600" />}
          Outstanding Finance
          {data.finance && (
            <span className="ml-auto text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">
              {data.finance.number_of_agreements} Agreement{data.finance.number_of_agreements !== 1 ? 's' : ''}
            </span>
          )}
        </h5>

        {data.finance ? (
          <div className="mt-3 space-y-3">
            {data.finance.agreements.map((ag, i) => (
              <div key={i} className="bg-white border border-red-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-red-100 text-red-800 text-xs font-bold">{ag.agreement_type}</Badge>
                  <span className="text-xs text-muted-foreground">{ag.vehicle_description}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div>
                    <span className="text-muted-foreground">Finance Company</span>
                    <p className="font-semibold text-red-900">{ag.finance_company}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Agreement Date</span>
                    <p className="font-semibold">
                      {new Date(ag.agreement_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Term</span>
                    <p className="font-semibold">{ag.agreement_term} months</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Agreement Ref</span>
                    <p className="font-semibold italic text-gray-500">{ag.agreement_number}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* AI Warning */}
            <div className="bg-gradient-to-r from-red-100 to-orange-50 border border-red-300 rounded-lg p-3 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-red-800 leading-relaxed">{data.finance.ai_insight}</p>
            </div>
          </div>
        ) : (
          <p className="text-xs mt-1 text-green-700">No outstanding finance found ✓</p>
        )}
      </div>

      <div className={`rounded-lg p-4 border ${data.stolen_info ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
        <h5 className="text-sm font-semibold flex items-center gap-2">
          {data.stolen_info ? <AlertTriangle className="h-4 w-4 text-red-600" /> : <CheckCircle className="h-4 w-4 text-green-600" />}
          Stolen Record
        </h5>
        <p className="text-xs mt-1">{data.stolen_info ? JSON.stringify(data.stolen_info) : 'Not reported stolen ✓'}</p>
      </div>

      {data.keepers && (
        <div className="bg-card rounded-lg p-4 border">
          <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Keeper History ({data.keepers.previous_keepers} keepers)
          </h5>
          <div className="space-y-2">
            {data.keepers.data.map((keeper, i) => (
              <div key={i} className="flex items-center gap-3 text-xs bg-muted/30 p-2 rounded">
                <Badge variant="outline" className="text-xs">Keeper {keeper.keeper_count}</Badge>
                <span>{keeper.keeper_start_date} → {keeper.keeper_end_date}</span>
              </div>
            ))}
          </div>
          {data.keepers.ai_insight && (
            <p className="text-xs text-amber-700 mt-2 bg-amber-50 p-2 rounded border border-amber-200">
              💡 {data.keepers.ai_insight}
            </p>
          )}
        </div>
      )}

      {data.plates && data.plates.plate_changes > 0 && (
        <div className="bg-card rounded-lg p-4 border">
          <h5 className="text-sm font-semibold mb-2">Plate Changes ({data.plates.plate_changes})</h5>
          {data.plates.data.map((plate, i) => (
            <div key={i} className="text-xs bg-muted/30 p-2 rounded mb-1">
              <span className="font-medium">{plate.previous_vrm}</span> → <span className="font-medium">{plate.current_vrm}</span>
              <span className="text-muted-foreground ml-2">({plate.date_of_transaction})</span>
            </div>
          ))}
          {data.plates.ai_insight && (
            <p className="text-xs text-blue-700 mt-2 bg-blue-50 p-2 rounded border border-blue-200">
              💡 {data.plates.ai_insight}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Safety Assessment Section
// ============================================================
function SafetyAssessmentSection({ data }: { data: any }) {
  // Use the actual data from the API response
  const ncap = data?.ncap_results;
  const crime = data?.crime_rate;
  const stolen = data?.stolen_count_info;
  const vulns = data?.vulnerability || [];
  const measures = data?.recommended_security_measures || [];
  const ai = data?.ai_insights;

  // Helper for generating star rating display
  const renderStars = (stars: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < stars ? "text-green-500" : "text-gray-300"}>★</span>
    ));
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Crash Test Ratings */}
      {ncap && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Euro NCAP Crash Test Results
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="inline-flex items-baseline gap-2 mb-3">
                <span className="text-6xl font-bold text-green-600">{ncap.star_rating}</span>
                <span className="text-3xl tracking-widest">{renderStars(ncap.star_rating)}</span>
              </div>
              <p className="text-sm font-semibold text-green-900 mb-2">Overall Rating</p>
              <Badge className="bg-green-100 text-green-800">{ncap.safety_term || 'Rated'}</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Adult Occupant</span>
                  <span className="text-lg font-bold text-green-600">{ncap.adult_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: `${ncap.adult_percent}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Child Occupant</span>
                  <span className="text-lg font-bold text-green-600">{ncap.child_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: `${ncap.child_percent}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Pedestrian / Vulnerable Users</span>
                  <span className="text-lg font-bold text-amber-600">{ncap.pedestrian_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{width: `${ncap.pedestrian_percent}%`}}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Safety Assist</span>
                  <span className="text-lg font-bold text-green-600">{ncap.safety_assist_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${ncap.safety_assist_percent}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theft Risk Analysis */}
      {(crime || stolen || vulns.length > 0) && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Vehicle Theft & Crime Analysis
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {crime && (
              <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                <p className="text-xs text-muted-foreground mb-2">Local Area Risk</p>
                <div className="mb-3">
                  <span className="px-2 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor: crime.risk?.color || '#f59e0b' }}>
                    {crime.risk?.status || 'Unknown Risk'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Overall crime rate</span>
                    <span className="font-semibold">{crime.general_crime_rate_per_1000}/1k</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-600">Vehicle crime</span>
                    <span className="font-semibold text-amber-600">{crime.vehicle_crime_rate_per_1000}/1k</span>
                  </div>
                </div>
              </div>
            )}
            
            {stolen && (
              <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                <p className="text-xs text-muted-foreground mb-2">Vehicle Theft Data</p>
                <p className="text-2xl font-bold text-amber-600 mb-2">{stolen.stolen_count}</p>
                <p className="text-xs text-gray-700">Reported thefts for this model</p>
                <Badge className="bg-amber-100 text-amber-800 text-xs mt-2">{stolen.frequency} Frequency</Badge>
              </div>
            )}
            
            {vulns.length > 0 && (
              <div className="bg-white rounded-lg p-4 border-2 border-red-200">
                <p className="text-xs text-muted-foreground mb-2">Primary Vulnerability</p>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                  <p className="text-sm font-semibold text-red-900 leading-tight">{vulns[0].type}</p>
                </div>
                <p className="text-xs text-gray-700 line-clamp-2" title={vulns[0].summary}>{vulns[0].summary}</p>
              </div>
            )}
          </div>
          
          {(vulns.length > 1 || measures.length > 0) && (
            <div className="bg-white rounded-lg p-4 border-2 border-amber-300">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
                <div className="flex-1">
                  {vulns.length > 1 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-amber-900 mb-2">Other Known Vulnerabilities</p>
                      <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                        {vulns.slice(1).map((v: any, i: number) => (
                          <li key={i}><strong>{v.type}</strong>: {v.summary}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {measures.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-amber-900 mb-2">Recommended Security Measures</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {measures.map((m: any, idx: number) => (
                          <div key={idx} className="flex gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-gray-800">{m.measure}</p>
                              {m.protects_against && <p className="text-[10px] text-gray-500">Protects against: {m.protects_against}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* API-driven AI Analysis */}
      {ai && (
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
            {ai.crash_safety && (
              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${ai.crash_safety.status === 'Caution' ? 'bg-amber-100' : 'bg-green-100'}`}>
                    <CheckCircle className={`h-4 w-4 ${ai.crash_safety.status === 'Caution' ? 'text-amber-600' : 'text-green-600'}`} />
                  </div>
                  <h5 className="text-sm font-bold text-gray-900">Crash Safety</h5>
                </div>
                <ul className="space-y-1">
                  {ai.crash_safety.bullets?.map((bull: string, idx: number) => (
                    <li key={idx} className="text-xs text-gray-700">• {bull}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {ai.emissions_health && (
              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <h5 className="text-sm font-bold text-gray-900">Emissions Health</h5>
                </div>
                <ul className="space-y-1">
                  {ai.emissions_health.bullets?.map((bull: string, idx: number) => (
                    <li key={idx} className="text-xs text-gray-700">• {bull}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {ai.theft_risk && (
              <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${ai.theft_risk.status === 'Safe' ? 'bg-green-100' : 'bg-amber-100'}`}>
                    <AlertTriangle className={`h-4 w-4 ${ai.theft_risk.status === 'Safe' ? 'text-green-600' : 'text-amber-600'}`} />
                  </div>
                  <h5 className="text-sm font-bold text-gray-900">Theft Risk</h5>
                </div>
                <ul className="space-y-1">
                  {ai.theft_risk.bullets?.map((bull: string, idx: number) => (
                    <li key={idx} className="text-xs text-gray-700">• {bull}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {ai.verdict && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm font-semibold text-green-900">AI Verdict: {ai.verdict.label}</p>
              </div>
              <p className="text-xs text-green-800">{ai.verdict.summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// EV Insights Section
// ============================================================
function EVInsightsSection({ data }: { data: EVInsightsResponse }) {
  if (!data.ev) {
    return (
      <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
        <Info className="h-4 w-4 inline mr-1" />
        {data.reason || 'This vehicle is not an electric vehicle or EV data is unavailable.'}
      </div>
    );
  }
  return (
    <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs">
      {JSON.stringify(data.ev, null, 2)}
    </pre>
  );
}

// ============================================================
// Lifestyle Fit Section
// ============================================================
function LifestyleFitSection({ data }: { data: LifestyleFitResponse }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card rounded-lg p-3 border text-center">
          <p className="text-xs text-muted-foreground">Boot Space</p>
          <p className="text-lg font-bold">{data.lifestyle_fit.boot_space}L</p>
        </div>
        <div className="bg-card rounded-lg p-3 border text-center">
          <p className="text-xs text-muted-foreground">Seats</p>
          <p className="text-lg font-bold">{data.lifestyle_fit.seating_capacity}</p>
        </div>
        <div className="bg-card rounded-lg p-3 border text-center">
          <p className="text-xs text-muted-foreground">Turning Radius</p>
          <p className="text-lg font-bold">{data.lifestyle_fit.turning_radius_m}m</p>
        </div>
        <div className="bg-card rounded-lg p-3 border text-center">
          <p className="text-xs text-muted-foreground">Towing (braked)</p>
          <p className="text-lg font-bold">{data.lifestyle_fit.towing_capacity.braked_trailer_kg ? `${data.lifestyle_fit.towing_capacity.braked_trailer_kg}kg` : 'N/A'}</p>
        </div>
      </div>

      {data.ai_analysis && (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-300 rounded-lg p-4">
          <h5 className="text-sm font-bold text-pink-900 mb-2">AI Lifestyle Assessment</h5>
          <ul className="space-y-1 text-xs text-pink-800">
            {data.ai_analysis.lifestyle.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
          <p className="text-xs font-semibold text-pink-900 mt-2 pt-2 border-t border-pink-200">
            Verdict: {data.ai_analysis.verdict}
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Pre-Purchase Inspections Section
// ============================================================
function PrePurchaseSection({ data }: { data: PrePurchaseInspectionsResponse }) {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg p-4 border">
        <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Paperwork Checklist
        </h5>
        <ul className="space-y-2">
          {data.paperwork_checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <CheckCircle className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-card rounded-lg p-4 border">
        <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          Model-Specific Inspection Points
        </h5>
        <ul className="space-y-2">
          {data.model_specific_inspection.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <Wrench className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
