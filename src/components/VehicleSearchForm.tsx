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

  const formatRegistration = (value: string) => {
    // Remove spaces and convert to uppercase
    const cleaned = value.replace(/\s/g, '').toUpperCase();

    // Add space in the right place for UK registration
    if (cleaned.length > 2) {
      const part1 = cleaned.slice(0, 2);
      const part2 = cleaned.slice(2, 4);
      const part3 = cleaned.slice(4, 7);

      if (part3) {
        return `${part1}${part2} ${part3}`;
      } else if (part2) {
        return `${part1}${part2}`;
      }
    }

    return cleaned;
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRegistration(e.target.value);
    setRegistration(formatted);
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
  const tax = vehicleData?.tax_status;
  const mot = vehicleData?.mot_history;

  return (
    <div className={`space-y-6 ${className}`}>
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
                placeholder="e.g., AB12 CDE"
                value={registration}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="text-lg font-mono uppercase"
                maxLength={8}
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

      {info && (
        <Card className="shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Vehicle Details</span>
              <Badge variant="secondary">{info.registration}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Make:</span>
                  <span className="font-medium">{info.make}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model:</span>
                  <span className="font-medium">{info.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year:</span>
                  <span className="font-medium">{info.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Colour:</span>
                  <span className="font-medium">{info.color}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mileage:</span>
                  <span className="font-medium">{info.mileage?.toLocaleString()} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax Status:</span>
                  <Badge variant="secondary" className="text-xs">{tax?.tax_status || 'N/A'}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MOT Status:</span>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${mot?.current_status === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {mot?.current_status || 'N/A'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MOT Valid Until:</span>
                  <span className="font-medium">{mot?.valid_until || 'N/A'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}