import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Car, Shield, FileText, AlertTriangle, CheckCircle, Info,
  Battery, Eye, Heart, Wrench, TrendingUp, Users, Key, Loader2, MapPin, Calculator
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

  // Safety module: structured UK address fields
  const [safetyAddr, setSafetyAddr] = useState({ line1: '', city: '', postcode: '' });
  const [showSafetyAddressInput, setShowSafetyAddressInput] = useState(false);
  // "Load All" address prompt
  const [showAllAddressInput, setShowAllAddressInput] = useState(false);
  const [allAddr, setAllAddr] = useState({ line1: '', city: '', postcode: '' });

  // UK postcode regex (e.g. SW1A 2AA, EC1A 1BB, M1 1AA)
  const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  const isValidPostcode = (pc: string) => UK_POSTCODE_RE.test(pc.trim());
  const buildAddress = (a: { line1: string; city: string; postcode: string }) =>
    `${a.line1.trim()}, ${a.city.trim()} ${a.postcode.trim()}`;
  const isAddrComplete = (a: { line1: string; city: string; postcode: string }) =>
    a.line1.trim().length > 0 && a.city.trim().length > 0 && isValidPostcode(a.postcode);

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
          const addr = extra?.address ?? '';
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

  // Defensive destructure — guard against missing / differently-shaped API data
  const info = snapshotData?.vehicle_info ?? { registration: '', make: '', model: '', year: 0, color: '', mileage: 0 };
  const mot = snapshotData?.mot_history ?? { current_status: 'N/A', valid_until: 'N/A', test_history: [], mileage_progression: [], estimated_current_mileage: 0, average_annual_mileage: 0, ai_insights: { important_patterns: [], minor_concerns: [], recommended_actions: [] } };
  const tax = snapshotData?.tax_status ?? { tax_status: 'N/A', annual_rate: 0, monthly_rate: 0, expires: 'N/A' };
  const rarity = snapshotData?.rarity_count ?? { make: '', model: '', active: 0, active_percent: 0, inactive: 0, total: 0 };
  const recalls = snapshotData?.recalls ?? { number_of_recalls: 0, number_of_cars_affected: 0, recalls_data: [] };
  const ai_analysis = snapshotData?.ai_analysis ?? { market_position: { summary: '', strengths: [], risks: [] }, maintenance_insights: { recurring_issues: [], one_time_issues: [], severity: '' }, usage_assessment: { mileage_pattern: '', odometer_consistency: '', notes: '' }, overall_assessment: { health_score: 0, confidence: 'N/A', recommendation: '' } };

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
              <Badge className={tax?.tax_status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {tax?.tax_status || 'N/A'}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">£{tax?.annual_rate || 0}/year • Expires {tax?.expires || 'N/A'}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <h4 className="font-semibold mb-2 text-sm">MOT Status</h4>
              <Badge className={mot?.current_status === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {mot?.current_status || 'N/A'}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">Valid until {mot?.valid_until || 'N/A'}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <h4 className="font-semibold mb-2 text-sm">Health Score</h4>
              <div className="text-2xl font-bold text-primary">{ai_analysis?.overall_assessment?.health_score || 0}/10</div>
              <p className="text-xs text-muted-foreground mt-1">{ai_analysis?.overall_assessment?.confidence || 'N/A'} confidence</p>
            </div>
          </div>

          {/* Expanded MOT History Section */}
          <div className="bg-card rounded-lg p-4 border">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Complete MOT History & Analysis
            </h4>

            {/* AI Insights Card from MOT */}
            {(mot?.ai_insights?.important_patterns?.length > 0 || mot?.ai_insights?.minor_concerns?.length > 0 || mot?.ai_insights?.recommended_actions?.length > 0) && (
              <div className="mb-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-amber-500 rounded-lg shrink-0">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-amber-900 mb-1">⚠️ MOT History AI Analysis</h5>
                    <p className="text-xs text-amber-800">Insights derived from historical test data</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Important Patterns */}
                  {(mot?.ai_insights?.important_patterns || []).map((pattern: any, idx: number) => (
                    <div key={`imp-${idx}`} className="bg-white rounded-lg p-3 border border-amber-200">
                      <div className="flex items-start gap-2 mb-2">
                        <Badge className="bg-amber-100 text-amber-800 text-xs">Recurring Issue</Badge>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{pattern.issue}</p>
                      <p className="text-xs text-gray-700 mb-2">Detected in: <strong>{pattern.years_detected?.join(', ')}</strong></p>
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-full bg-amber-400 rounded-full"></div>
                        <p className="text-xs text-gray-600">{pattern.note}</p>
                      </div>
                    </div>
                  ))}

                  {/* Minor Concerns */}
                  {(mot?.ai_insights?.minor_concerns || []).map((concern: any, idx: number) => (
                    <div key={`min-${idx}`} className="bg-white rounded-lg p-3 border border-blue-200">
                      <div className="flex items-start gap-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Minor Concern</Badge>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{concern.issue} ({concern.year_detected})</p>
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-full bg-blue-400 rounded-full"></div>
                        <p className="text-xs text-gray-600">{concern.note}</p>
                      </div>
                    </div>
                  ))}

                  {/* Recommended Actions */}
                  {mot?.ai_insights?.recommended_actions && mot.ai_insights.recommended_actions.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200 mt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-xs font-semibold text-green-900">Recommended Actions</p>
                      </div>
                      <ul className="text-xs text-green-800 space-y-1 pl-6 list-disc">
                        {mot.ai_insights.recommended_actions.map((action: string, idx: number) => (
                          <li key={idx}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-2 font-semibold">Date</th>
                    <th className="text-left p-2 font-semibold">Mileage</th>
                    <th className="text-left p-2 font-semibold">Result</th>
                    <th className="text-left p-2 font-semibold">Advisories</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {(mot?.test_history || []).map((test: any, i: number) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="p-2">{test.date}</td>
                      <td className="p-2">{Number(test.mileage || 0).toLocaleString()} mi</td>
                      <td className="p-2">
                        <Badge className={`text-xs ${test.result === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {test.result === 'PASSED' ? 'Pass' : 'Fail'}
                        </Badge>
                      </td>
                      <td className="p-2 text-xs">
                        {test.advisories && test.advisories.length > 0 ? (
                          <ul className="space-y-1">
                            {test.advisories.map((a: string, j: number) => (
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

            {/* Mileage chart replacement logic */}
            {mot?.mileage_progression && mot.mileage_progression.length > 0 && (() => {
              const maxMil = Math.max(...mot.mileage_progression.map((m: any) => m[1] as number));
              const chartMax = maxMil > 0 ? Math.ceil(maxMil / 10000) * 10000 : 50000;

              return (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
                  <h5 className="text-sm font-semibold mb-3 flex items-center justify-between">
                    <span>Mileage Progression Chart</span>
                    <span className="text-xs text-muted-foreground">Annual average: {mot.average_annual_mileage?.toLocaleString() || 0} mi/yr</span>
                  </h5>
                  <div className="relative h-48 flex items-end justify-between gap-2 sm:gap-3 border-l-2 border-b-2 border-muted-foreground/20 pl-6 sm:pl-8 pb-2 pt-4">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] sm:text-xs text-muted-foreground -ml-2 pb-8 items-end w-6 sm:w-8">
                      <span>{Math.round(chartMax / 1000)}k</span>
                      <span>{Math.round(chartMax * 0.8 / 1000)}k</span>
                      <span>{Math.round(chartMax * 0.6 / 1000)}k</span>
                      <span>{Math.round(chartMax * 0.4 / 1000)}k</span>
                      <span>{Math.round(chartMax * 0.2 / 1000)}k</span>
                      <span>0</span>
                    </div>

                    {/* Bars */}
                    {mot.mileage_progression.map((point: any, idx: number) => {
                      const dateStr = point[0];
                      const year = dateStr ? new Date(dateStr).getFullYear() : 'Unknown';
                      const mileage = point[1] as number;
                      const heightPct = Math.max((mileage / chartMax) * 100, 2);

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center group relative">
                          <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                            {mileage.toLocaleString()} mi
                          </div>
                          <div
                            className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all group-hover:from-blue-700 group-hover:to-blue-500"
                            style={{ height: `${heightPct}%` }}
                          ></div>
                          <span className="text-[10px] sm:text-xs mt-2 font-medium truncate w-full text-center">{year}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-background p-2 rounded">
                      <p className="text-muted-foreground">Estimated current mileage</p>
                      <p className="font-semibold text-sm sm:text-base">~{mot.estimated_current_mileage?.toLocaleString() || 0} miles</p>
                    </div>
                    <div className="bg-background p-2 rounded">
                      <p className="text-muted-foreground">Average historical annual mileage</p>
                      <p className="font-semibold text-sm sm:text-base">~{mot.average_annual_mileage?.toLocaleString() || 0} mi/yr</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Rarity */}
          <div className="bg-card rounded-lg p-4 border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Rarity — {rarity?.make || ''} {rarity?.model || ''}
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total registered</p>
                <p className="font-semibold">{rarity?.total?.toLocaleString() || 0}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Active on road</p>
                <p className="font-semibold text-green-600">{rarity?.active?.toLocaleString() || 0} ({rarity?.active_percent || 0}%)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Off road / scrapped</p>
                <p className="font-semibold text-red-600">{rarity?.inactive?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>

          {/* Recalls */}
          {recalls?.number_of_recalls > 0 && (
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-900">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Safety Recalls ({recalls.number_of_recalls})
              </h4>
              <div className="space-y-3">
                {(recalls.recalls_data || []).map((recall, i) => (
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
            <p className="text-sm text-purple-800 mb-3">{ai_analysis?.overall_assessment?.recommendation || 'No recommendation available.'}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h5 className="text-xs font-bold text-green-800 mb-1">Strengths</h5>
                <ul className="text-xs space-y-1">
                  {(ai_analysis?.market_position?.strengths || []).map((s, i) => (
                    <li key={i} className="flex items-start gap-1"><CheckCircle className="h-3 w-3 text-green-600 mt-0.5 shrink-0" /> {s}</li>
                  ))}
                  {(!ai_analysis?.market_position?.strengths?.length) && <li className="text-muted-foreground">None identified</li>}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h5 className="text-xs font-bold text-red-800 mb-1">Risks</h5>
                <ul className="text-xs space-y-1">
                  {(ai_analysis?.market_position?.risks || []).map((r, i) => (
                    <li key={i} className="flex items-start gap-1"><AlertTriangle className="h-3 w-3 text-red-600 mt-0.5 shrink-0" /> {r}</li>
                  ))}
                  {(!ai_analysis?.market_position?.risks?.length) && <li className="text-muted-foreground">None identified</li>}
                </ul>
              </div>
            </div>
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
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm max-w-xl mx-auto w-full space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-5 w-5 text-amber-500 shrink-0" />
              <span className="text-sm font-semibold">Enter UK Address for Safety Assessment</span>
            </div>
            <Input
              placeholder="Address Line 1 (e.g. 10 Downing St)"
              value={allAddr.line1}
              onChange={e => setAllAddr(prev => ({ ...prev, line1: e.target.value }))}
              className="text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="City / Town (e.g. London)"
                value={allAddr.city}
                onChange={e => setAllAddr(prev => ({ ...prev, city: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="Postcode (e.g. SW1A 2AA)"
                value={allAddr.postcode}
                onChange={e => setAllAddr(prev => ({ ...prev, postcode: e.target.value.toUpperCase() }))}
                className={`text-sm font-mono ${allAddr.postcode && !isValidPostcode(allAddr.postcode) ? 'border-red-400 focus-visible:ring-red-400' : ''}`}
                maxLength={8}
              />
            </div>
            {allAddr.postcode && !isValidPostcode(allAddr.postcode) && (
              <p className="text-xs text-red-600">Please enter a valid UK postcode (e.g. SW1A 2AA)</p>
            )}
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllAddressInput(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => isAddrComplete(allAddr) && fetchAllModules(buildAddress(allAddr))}
                disabled={!isAddrComplete(allAddr)}
                size="sm"
              >
                Load All
              </Button>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          A valid UK postcode is required for the Safety &amp; Risk Assessment module • Or load individual sections below
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
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="text-sm font-semibold text-amber-900">Enter UK Address</span>
            </div>
            <Input
              placeholder="Address Line 1 (e.g. 10 Downing St)"
              value={safetyAddr.line1}
              onChange={e => setSafetyAddr(prev => ({ ...prev, line1: e.target.value }))}
              className="text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="City / Town"
                value={safetyAddr.city}
                onChange={e => setSafetyAddr(prev => ({ ...prev, city: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="Postcode (e.g. SW1A 2AA)"
                value={safetyAddr.postcode}
                onChange={e => setSafetyAddr(prev => ({ ...prev, postcode: e.target.value.toUpperCase() }))}
                className={`text-sm font-mono ${safetyAddr.postcode && !isValidPostcode(safetyAddr.postcode) ? 'border-red-400 focus-visible:ring-red-400' : ''}`}
                maxLength={8}
              />
            </div>
            {safetyAddr.postcode && !isValidPostcode(safetyAddr.postcode) && (
              <p className="text-xs text-red-600">Please enter a valid UK postcode (e.g. SW1A 2AA)</p>
            )}
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowSafetyAddressInput(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (isAddrComplete(safetyAddr)) {
                    setShowSafetyAddressInput(false);
                    fetchModule('safety', { address: buildAddress(safetyAddr) });
                  }
                }}
                disabled={!isAddrComplete(safetyAddr)}
              >
                Confirm
              </Button>
            </div>
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
          {!isLoaded && !isLoading && !error && (
            <Button variant="outline" size="sm" onClick={onLoad}>
              Load Data
            </Button>
          )}
          {error && !isLoading && (
             <Button variant="outline" size="sm" onClick={onLoad} className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700">
               Load Again
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
function BuildSheetSection({ data }: { data: any }) {
  return (
    <div className="space-y-6">
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
              <span className="font-medium">{data.specifications?.engine?.capacity || 'N/A'} {data.specifications?.engine?.aspiration || ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Power</span>
              <span className="font-medium">{data.specifications?.performance?.power?.Ps || data.specifications?.performance?.power?.Bhp || 'N/A'} PS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Torque</span>
              <span className="font-medium">{data.specifications?.performance?.torque?.Nm || 'N/A'} Nm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">0-62mph</span>
              <span className="font-medium">{data.specifications?.performance?.acceleration?.ZeroToOneHundredKph ? `${data.specifications.performance.acceleration.ZeroToOneHundredKph}s` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Top Speed</span>
              <span className="font-medium">{data.specifications?.performance?.acceleration?.MaxSpeedMph ? `${data.specifications.performance.acceleration.MaxSpeedMph} mph` : 'N/A'}</span>
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
              <span className="font-medium">{data.specifications?.transmission_drive?.gearbox || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gears</span>
              <span className="font-medium">{data.specifications?.transmission_drive?.gears || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium">{data.specifications?.transmission_drive?.type || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Drivetrain</span>
              <span className="font-medium">{data.specifications?.transmission_drive?.drivetrain || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Drive Axle</span>
              <span className="font-medium">{data.specifications?.transmission_drive?.driving_axle || 'N/A'}</span>
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
              <span className="text-muted-foreground">Combined MPG</span>
              <span className="font-medium">{data.specifications?.efficiency_emissions?.wltp_combined_mpg ? `${data.specifications.efficiency_emissions.wltp_combined_mpg} mpg` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Extra Urban</span>
              <span className="font-medium">{data.specifications?.efficiency_emissions?.extra_urban_mpg ? `${data.specifications.efficiency_emissions.extra_urban_mpg} mpg` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CO₂ Emissions</span>
              <span className="font-medium">{data.specifications?.efficiency_emissions?.co2_emissions_gkm ? `${data.specifications.efficiency_emissions.co2_emissions_gkm} g/km` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Euro Standard</span>
              <span className="font-medium">{data.specifications?.efficiency_emissions?.euro_standard ? `Euro ${data.specifications.efficiency_emissions.euro_standard}` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">AdBlue Tank</span>
              <span className="font-medium">{data.specifications?.efficiency_emissions?.adblue_tank_liters ? `${data.specifications.efficiency_emissions.adblue_tank_liters}L` : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Equipment by Category */}
      {data.equipment_grouped && Object.keys(data.equipment_grouped).length > 0 && (
        <div className="bg-card rounded-lg p-6 border">
          <h4 className="font-semibold text-lg mb-4">Standard Equipment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data.equipment_grouped).map(([category, items]: [string, any]) => (
              <div key={category}>
                <h5 className="text-sm font-semibold text-primary mb-2">{category}</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {items.map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional Extras */}
      {data.optional_extras?.items?.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg">Optional Extras Fitted</h4>
            <Badge className="bg-green-100 text-green-800">Factory Options</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {data.optional_extras.items.map((opt: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg p-4 border">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-sm font-semibold">{opt.name}</h5>
                  {opt.price && <Badge variant="outline" className="text-xs">£{opt.price}</Badge>}
                </div>
                {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
              </div>
            ))}
          </div>

          {(data.optional_extras?.summary?.added_to_base_price || data.optional_extras?.summary?.resale_premium) && (
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Total Optional Equipment Value</p>
                  <p className="text-xs text-muted-foreground">Added to base vehicle price when new</p>
                </div>
                <p className="text-2xl font-bold text-primary">{data.optional_extras.summary.added_to_base_price || 'Varies'}</p>
              </div>
              {data.optional_extras.summary.resale_premium && (
                <p className="text-xs text-green-600 mt-2">{data.optional_extras.summary.resale_premium} vs base specification</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Dimensions & Capacities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border text-center">
          <p className="text-xs text-muted-foreground mb-1">Boot Space</p>
          <p className="text-2xl font-bold">{data.additional_specs?.boot_space?.litres || 'N/A'}L</p>
          {data.additional_specs?.boot_space?.seats_down_litres && (
            <p className="text-xs text-muted-foreground">{data.additional_specs.boot_space.seats_down_litres}L seats down</p>
          )}
        </div>
        <div className="bg-card rounded-lg p-4 border text-center">
          <p className="text-xs text-muted-foreground mb-1">Fuel Tank</p>
          <p className="text-2xl font-bold">{data.additional_specs?.fuel_tank?.capacity_litres || 'N/A'}L</p>
          {data.additional_specs?.fuel_tank?.estimated_range_miles && (
            <p className="text-xs text-muted-foreground">~{data.additional_specs.fuel_tank.estimated_range_miles} mile range</p>
          )}
        </div>
        <div className="bg-card rounded-lg p-4 border text-center">
          <p className="text-xs text-muted-foreground mb-1">Kerb Weight</p>
          <p className="text-2xl font-bold">{data.additional_specs?.kerb_weight?.kg || 'N/A'}kg</p>
        </div>
        <div className="bg-card rounded-lg p-4 border text-center">
          <p className="text-xs text-muted-foreground mb-1">Towing</p>
          <p className="text-2xl font-bold">{data.additional_specs?.towing?.braked_kg || '0'}kg</p>
          <p className="text-xs text-muted-foreground">Braked trailer</p>
        </div>
      </div>

      {/* Consolidated AI Analysis */}
      {data.ai_insights && (
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
                {(data.ai_insights.performance_highlights || []).map((ph: any, i: number) => (
                  <li key={i}>• <strong>{ph.metric}:</strong> {ph.assessment}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h5 className="text-sm font-bold text-gray-900 mb-2">Premium Equipment</h5>
              <ul className="space-y-1 text-xs text-gray-700">
                {(data.ai_insights.equipment_analysis?.premium_features || []).map((pf: any, i: number) => (
                  <li key={i}>• <strong>{pf.feature}</strong>: {pf.description}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg">
            <p className="text-sm font-semibold text-green-900 mb-1">✓ Specification Verdict</p>
            <p className="text-xs text-green-800">{data.ai_insights.resale_verdict?.summary}</p>
            <div className="mt-2 flex gap-2">
              <Badge className="bg-green-100 text-green-800 text-xs border-none">Rating: {data.ai_insights.resale_verdict?.overall_rating || 'N/A'}</Badge>
              {data.ai_insights.resale_verdict?.resale_premium && (
                <Badge className="bg-green-100 text-green-800 text-xs border-none">Premium: {data.ai_insights.resale_verdict.resale_premium}</Badge>
              )}
            </div>
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
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${ncap.adult_percent}%` }}></div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Child Occupant</span>
                  <span className="text-lg font-bold text-green-600">{ncap.child_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${ncap.child_percent}%` }}></div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Pedestrian / Vulnerable Users</span>
                  <span className="text-lg font-bold text-amber-600">{ncap.pedestrian_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${ncap.pedestrian_percent}%` }}></div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Safety Assist</span>
                  <span className="text-lg font-bold text-green-600">{ncap.safety_assist_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${ncap.safety_assist_percent}%` }}></div>
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