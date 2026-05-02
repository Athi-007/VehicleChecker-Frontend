import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Car, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { vehicleService, SnapshotBaseResponse } from '@/services/api';

interface VehicleSearchFormProps {
  onSearch?: (registration: string, data: SnapshotBaseResponse) => void;
  className?: string;
}

export function VehicleSearchForm({ onSearch, className = "" }: VehicleSearchFormProps) {
  const [registration, setRegistration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<SnapshotBaseResponse | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip all spaces, uppercase only — no auto-formatting
    const cleaned = e.target.value.replace(/\s/g, '').toUpperCase();
    setRegistration(cleaned);
  };

  const handleSearch = async () => {
    const cleanedReg = registration.replace(/\s/g, '').toUpperCase();

    if (!cleanedReg) {
      toast({
        title: "Invalid Registration",
        description: "Please enter a vehicle registration number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await vehicleService.getSnapshotBase(cleanedReg);

      if (response.success && response.data) {
        setVehicleData(response.data);
        onSearch?.(cleanedReg, response.data);

        toast({
          title: "Vehicle Found",
          description: `Successfully loaded data for ${response.data.vehicle_info.make} ${response.data.vehicle_info.model}`,
        });
      } else {
        toast({
          title: "Vehicle Not Found",
          description: response.error || "Unable to find vehicle data for this registration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Unable to retrieve vehicle data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const info = vehicleData?.vehicle_info;

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            Vehicle Lookup
          </CardTitle>
          <CardDescription>
            Enter a UK registration number to get instant vehicle data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="e.g. AB12CDE"
                value={registration}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="text-lg font-mono uppercase"
                maxLength={7}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              size="lg"
              className="px-6"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Supports all UK registration formats including personal plates</span>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Details card */}
      {info && (
        <Card className="shadow-lg border-0 bg-white animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Vehicle Details</h3>
              <Badge className="bg-slate-100 text-slate-700 border border-slate-200 font-mono text-sm px-3 py-1">
                {info.registration}
              </Badge>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              {/* Row 1 */}
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Make:</span>
                <span className="font-semibold text-foreground">{info.make}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Colour:</span>
                <span className="font-semibold text-foreground">{info.color}</span>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Model:</span>
                <span className="font-semibold text-foreground">{info.model}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax Status:</span>
                <Badge className={`text-xs px-2 py-0.5 ${
                  vehicleData?.tax_status?.tax_status === 'Valid'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {vehicleData?.tax_status?.tax_status === 'Valid' ? 'Taxed' : vehicleData?.tax_status?.tax_status || 'N/A'}
                </Badge>
              </div>

              {/* Row 3 */}
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Year:</span>
                <span className="font-semibold text-foreground">{info.year}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">MOT Expiry:</span>
                <span className="font-semibold text-foreground">{vehicleData?.mot_history?.valid_until || 'N/A'}</span>
              </div>

              {/* Row 4 */}
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Mileage:</span>
                <span className="font-semibold text-foreground">{info.mileage?.toLocaleString() ?? 'N/A'} mi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">MOT Status:</span>
                <Badge className={`text-xs px-2 py-0.5 ${
                  vehicleData?.mot_history?.current_status === 'PASSED'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {vehicleData?.mot_history?.current_status || 'N/A'}
                </Badge>
              </div>
            </div>

            {/* Divider + CTA */}
            <p className="text-sm text-muted-foreground mt-5 pt-4 border-t border-slate-100">
              Select the sections you'd like included in your report below, then click <strong>'Generate Report'</strong> to proceed.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}