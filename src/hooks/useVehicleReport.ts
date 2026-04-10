import { useState, useCallback } from 'react';
import { vehicleService, VehicleBasicInfo, VehicleReport } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export interface UseVehicleReportReturn {
  // State
  vehicleData: VehicleBasicInfo | null;
  selectedModules: Set<string>;
  isLoading: boolean;
  isGeneratingReport: boolean;
  currentReport: VehicleReport | null;
  
  // Actions
  searchVehicle: (registration: string) => Promise<void>;
  toggleModule: (moduleId: string) => void;
  generateReport: () => Promise<void>;
  resetReport: () => void;
  
  // Computed values
  totalCost: number;
}

const MODULE_PRICES: Record<string, number> = {
  'snapshot': 0,
  'build-sheet': 29,
  'market-insights': 57,
  'maintenance': 57,
  'safety': 27,
  'provenance': 409,
  'salvage': 38,
  'electric': 37,
  'insurance': 5,
  'lifestyle': 18,
  'viewing': 18
};

export function useVehicleReport(): UseVehicleReportReturn {
  const [vehicleData, setVehicleData] = useState<VehicleBasicInfo | null>(null);
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set(['snapshot']));
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [currentReport, setCurrentReport] = useState<VehicleReport | null>(null);
  const { toast } = useToast();

  const searchVehicle = useCallback(async (registration: string) => {
    setIsLoading(true);
    try {
      const response = await vehicleService.lookupVehicle(registration);
      
      if (response.success && response.data) {
        setVehicleData(response.data);
        setCurrentReport(null); // Reset any previous report
        toast({
          title: "Vehicle Found",
          description: `Successfully loaded data for ${response.data.make} ${response.data.model}`,
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

  const toggleModule = useCallback((moduleId: string) => {
    if (moduleId === 'snapshot') return; // Can't deselect snapshot
    
    setSelectedModules(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(moduleId)) {
        newSelected.delete(moduleId);
      } else {
        newSelected.add(moduleId);
      }
      return newSelected;
    });
  }, []);

  const generateReport = useCallback(async () => {
    if (!vehicleData) {
      toast({
        title: "No Vehicle Selected",
        description: "Please search for a vehicle first",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingReport(true);
    try {
      const response = await vehicleService.generateReport(
        vehicleData.registration,
        Array.from(selectedModules)
      );
      
      if (response.success && response.data) {
        setCurrentReport(response.data);
        toast({
          title: "Report Generated",
          description: "Your vehicle report has been successfully created",
        });
      } else {
        toast({
          title: "Report Generation Failed",
          description: response.error || "Unable to generate the report",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "An unexpected error occurred while generating the report",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingReport(false);
    }
  }, [vehicleData, selectedModules, toast]);

  const resetReport = useCallback(() => {
    setVehicleData(null);
    setSelectedModules(new Set(['snapshot']));
    setCurrentReport(null);
  }, []);

  const totalCost = Array.from(selectedModules).reduce((sum, moduleId) => {
    return sum + (MODULE_PRICES[moduleId] || 0);
  }, 0);

  return {
    // State
    vehicleData,
    selectedModules,
    isLoading,
    isGeneratingReport,
    currentReport,
    
    // Actions
    searchVehicle,
    toggleModule,
    generateReport,
    resetReport,
    
    // Computed values
    totalCost
  };
}