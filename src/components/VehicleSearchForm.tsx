import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Car, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VehicleSearchFormProps {
  onSearch?: (registration: string) => void;
  className?: string;
}

export function VehicleSearchForm({ onSearch, className = "" }: VehicleSearchFormProps) {
  const [registration, setRegistration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<any>(null);
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

  const validateRegistration = (reg: string) => {
    // Basic UK registration validation
    const ukRegex = /^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$/;
    const oldRegex = /^[A-Z][0-9]{1,3}\s?[A-Z]{3}$/;
    const personalRegex = /^[A-Z]{1,3}\s?[0-9]{1,4}$/;
    
    return ukRegex.test(reg) || oldRegex.test(reg) || personalRegex.test(reg);
  };

  const handleSearch = async () => {
    if (!registration.trim()) {
      toast({
        title: "Invalid Registration",
        description: "Please enter a vehicle registration number.",
        variant: "destructive",
      });
      return;
    }

    if (!validateRegistration(registration)) {
      toast({
        title: "Invalid Format",
        description: "Please enter a valid UK registration number (e.g., AB12 CDE).",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock vehicle data - replace with actual API response
      const mockData = {
        registration: registration,
        make: "BMW",
        model: "3 Series",
        year: "2020",
        fuel: "Diesel",
        colour: "Black",
        tax_status: "Taxed",
        mot_expiry: "2024-08-15",
        co2_emissions: 128,
        engine_size: 1995
      };
      
      setVehicleData(mockData);
      onSearch?.(registration);
      
      toast({
        title: "Vehicle Found",
        description: `Successfully loaded data for ${mockData.make} ${mockData.model}`,
      });
      
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

      {vehicleData && (
        <Card className="shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Vehicle Details</span>
              <Badge variant="secondary">{vehicleData.registration}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Make:</span>
                  <span className="font-medium">{vehicleData.make}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model:</span>
                  <span className="font-medium">{vehicleData.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year:</span>
                  <span className="font-medium">{vehicleData.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel:</span>
                  <span className="font-medium">{vehicleData.fuel}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Colour:</span>
                  <span className="font-medium">{vehicleData.colour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax Status:</span>
                  <Badge variant="secondary" className="text-xs">{vehicleData.tax_status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MOT Expiry:</span>
                  <span className="font-medium">{vehicleData.mot_expiry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CO₂ Emissions:</span>
                  <span className="font-medium">{vehicleData.co2_emissions}g/km</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}