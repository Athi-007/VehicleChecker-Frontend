import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Car, AlertCircle, CheckCircle } from "lucide-react";
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

      {/* Compact vehicle summary card */}
      {info && (
        <Card className="shadow-md border-primary/20 bg-primary/5 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <CardContent className="py-4">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
              <h3 className="font-semibold text-foreground">Vehicle Found</h3>
              <Badge className="bg-primary/10 text-primary border border-primary/20 font-mono ml-auto">
                {info.registration}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Make & Model</p>
                <p className="font-semibold">{info.make} {info.model}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Year</p>
                <p className="font-semibold">{info.year}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Colour</p>
                <p className="font-semibold">{info.color}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mileage</p>
                <p className="font-semibold">{info.mileage?.toLocaleString() ?? 'N/A'} miles</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4 pt-3 border-t border-primary/10">
              Select the sections you'd like included in your report below, then click <strong>'Generate Report'</strong> to proceed.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}