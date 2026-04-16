import { useState, useCallback } from 'react';
import {
  vehicleService,
  SnapshotBaseResponse,
  BuildSheetResponse,
  SafetyAssessmentResponse,
  ProvenanceResponse,
  EVInsightsResponse,
  LifestyleFitResponse,
  PrePurchaseInspectionsResponse,
  ApiResponse,
} from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// All module data in one place
export interface AllModuleData {
  snapshot: ApiResponse<SnapshotBaseResponse>;
  buildSheet: ApiResponse<BuildSheetResponse>;
  safety: ApiResponse<SafetyAssessmentResponse>;
  provenance: ApiResponse<ProvenanceResponse>;
  evInsights: ApiResponse<EVInsightsResponse>;
  lifestyleFit: ApiResponse<LifestyleFitResponse>;
  prePurchase: ApiResponse<PrePurchaseInspectionsResponse>;
}

export interface UseVehicleReportReturn {
  // State
  snapshotData: SnapshotBaseResponse | null;
  allModuleData: AllModuleData | null;
  isLoading: boolean;
  isLoadingModules: boolean;
  registration: string | null;

  // Actions
  searchVehicle: (registration: string) => Promise<void>;
  fetchModule: (moduleId: string, registration: string) => Promise<any>;
  fetchAllModules: (registration: string) => Promise<void>;
  resetReport: () => void;
}

export function useVehicleReport(): UseVehicleReportReturn {
  const [snapshotData, setSnapshotData] = useState<SnapshotBaseResponse | null>(null);
  const [allModuleData, setAllModuleData] = useState<AllModuleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [registration, setRegistration] = useState<string | null>(null);
  const { toast } = useToast();

  // Search vehicle — calls /snapshot-base
  const searchVehicle = useCallback(async (reg: string) => {
    const cleanedReg = reg.replace(/\s/g, '').toUpperCase();
    setIsLoading(true);

    try {
      const response = await vehicleService.getSnapshotBase(cleanedReg);

      if (response.success && response.data) {
        setSnapshotData(response.data);
        setRegistration(cleanedReg);
        setAllModuleData(null); // Reset previous module data
        toast({
          title: "Vehicle Found",
          description: `${response.data.vehicle_info.make} ${response.data.vehicle_info.model} (${response.data.vehicle_info.year})`,
        });
      } else {
        toast({
          title: "Vehicle Not Found",
          description: response.error || "Unable to find vehicle data for this registration",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "An unexpected error occurred while searching for the vehicle",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch a single module by ID
  const fetchModule = useCallback(async (moduleId: string, reg: string) => {
    const cleanedReg = reg.replace(/\s/g, '').toUpperCase();

    const moduleMap: Record<string, (r: string) => Promise<any>> = {
      'snapshot': vehicleService.getSnapshotBase,
      'build-sheet': vehicleService.getBuildSheet,
      'safety': vehicleService.getSafetyAssessment,
      'provenance': vehicleService.getProvenance,
      'ev-insights': vehicleService.getEVInsights,
      'lifestyle-fit': vehicleService.getLifestyleFit,
      'pre-purchase': vehicleService.getPrePurchaseInspections,
    };

    const fetchFn = moduleMap[moduleId];
    if (!fetchFn) {
      return { success: false, error: `Unknown module: ${moduleId}` };
    }

    try {
      return await fetchFn(cleanedReg);
    } catch (error) {
      return { success: false, error: 'Request failed' };
    }
  }, []);

  // Fetch ALL modules in parallel
  const fetchAllModules = useCallback(async (reg: string) => {
    const cleanedReg = reg.replace(/\s/g, '').toUpperCase();
    setIsLoadingModules(true);

    try {
      const results = await vehicleService.fetchAllModules(cleanedReg);
      setAllModuleData(results as AllModuleData);

      toast({
        title: "All Modules Loaded",
        description: "All available vehicle data has been fetched",
      });
    } catch (error) {
      toast({
        title: "Module Fetch Error",
        description: "Some modules failed to load",
        variant: "destructive",
      });
    } finally {
      setIsLoadingModules(false);
    }
  }, [toast]);

  const resetReport = useCallback(() => {
    setSnapshotData(null);
    setAllModuleData(null);
    setRegistration(null);
  }, []);

  return {
    snapshotData,
    allModuleData,
    isLoading,
    isLoadingModules,
    registration,
    searchVehicle,
    fetchModule,
    fetchAllModules,
    resetReport,
  };
}