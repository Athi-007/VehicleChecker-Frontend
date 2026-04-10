// API Service Layer
// This file contains all the API integration points where you can add your actual API calls

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.vehicleintel.com/v1';
const API_KEY = process.env.REACT_APP_API_KEY || '';

// API Configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  apiKey: API_KEY,
  timeout: 30000,
  retries: 3
};

// Types for API responses
export interface VehicleBasicInfo {
  registration: string;
  make: string;
  model: string;
  year: string;
  fuel: string;
  colour: string;
  tax_status: string;
  mot_expiry: string;
  co2_emissions: number;
  engine_size: number;
}

export interface ReportModule {
  id: string;
  name: string;
  price: number;
  data?: any;
  status: 'pending' | 'completed' | 'failed';
}

export interface VehicleReport {
  id: string;
  registration: string;
  status: 'pending' | 'completed' | 'failed';
  generated_at: string;
  modules: ReportModule[];
  total_cost: number;
  download_url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Helper function to make authenticated requests
const makeRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
};

// Vehicle lookup service
export const vehicleService = {
  // Look up basic vehicle information
  async lookupVehicle(registration: string): Promise<ApiResponse<VehicleBasicInfo>> {
    // TODO: Replace with actual API call
    // return makeRequest<VehicleBasicInfo>(`/vehicles/${registration}`);
    
    // Mock implementation for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            registration,
            make: "BMW",
            model: "3 Series",
            year: "2020",
            fuel: "Diesel",
            colour: "Black",
            tax_status: "Taxed",
            mot_expiry: "2024-08-15",
            co2_emissions: 128,
            engine_size: 1995
          }
        });
      }, 1500);
    });
  },

  // Generate a vehicle report with selected modules
  async generateReport(
    registration: string,
    modules: string[],
    format: 'json' | 'pdf' = 'json'
  ): Promise<ApiResponse<VehicleReport>> {
    // TODO: Replace with actual API call
    /*
    return makeRequest<VehicleReport>('/reports/generate', {
      method: 'POST',
      body: JSON.stringify({
        registration,
        modules,
        format
      })
    });
    */
    
    // Mock implementation for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        const reportModules: ReportModule[] = modules.map(moduleId => ({
          id: moduleId,
          name: moduleId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          price: moduleId === 'snapshot' ? 0 : Math.floor(Math.random() * 100) + 10,
          status: 'completed' as const
        }));

        resolve({
          success: true,
          data: {
            id: `rpt_${Date.now()}`,
            registration,
            status: 'completed',
            generated_at: new Date().toISOString(),
            modules: reportModules,
            total_cost: reportModules.reduce((sum, m) => sum + m.price, 0),
            download_url: `${API_BASE_URL}/reports/rpt_${Date.now()}/download`
          }
        });
      }, 2000);
    });
  },

  // Get existing report by ID
  async getReport(reportId: string): Promise<ApiResponse<VehicleReport>> {
    // TODO: Replace with actual API call
    // return makeRequest<VehicleReport>(`/reports/${reportId}`);
    
    // Mock implementation
    return makeRequest<VehicleReport>(`/reports/${reportId}`);
  },

  // Batch generate reports
  async generateBatchReports(
    registrations: string[],
    modules: string[],
    webhookUrl?: string
  ): Promise<ApiResponse<{ batch_id: string; estimated_completion: string }>> {
    // TODO: Replace with actual API call
    /*
    return makeRequest<{ batch_id: string; estimated_completion: string }>('/bulk/reports', {
      method: 'POST',
      body: JSON.stringify({
        registrations,
        modules,
        webhook_url: webhookUrl
      })
    });
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            batch_id: `batch_${Date.now()}`,
            estimated_completion: new Date(Date.now() + 600000).toISOString()
          }
        });
      }, 1000);
    });
  }
};

// Module service for getting available modules and pricing
export const moduleService = {
  // Get all available modules with current pricing
  async getModules(): Promise<ApiResponse<any[]>> {
    // TODO: Replace with actual API call
    // return makeRequest<any[]>('/modules');
    
    // Mock implementation with actual module data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: "snapshot",
              title: "Snapshot Base",
              description: "Always included, delivered immediately after plate entry",
              costToService: 0,
              priceToUser: 0,
              category: "Essential",
              isFree: true
            },
            {
              id: "build-sheet",
              title: "Build Sheet & Factory Options",
              description: "Exact equipment installed at factory plus optional extras",
              costToService: 10,
              priceToUser: 29,
              category: "Specification",
              isFree: false
            },
            {
              id: "market-insights",
              title: "Market Insights",
              description: "Price behaviour and demand indicators",
              costToService: 15,
              priceToUser: 57,
              category: "Market",
              isFree: false
            }
          ]
        });
      }, 500);
    });
  }
};

// Payment service for handling payments
export const paymentService = {
  // Process payment for a report
  async processPayment(
    reportId: string,
    paymentMethod: 'stripe' | 'paypal' = 'stripe'
  ): Promise<ApiResponse<{ payment_url: string }>> {
    // TODO: Replace with actual payment processing
    /*
    return makeRequest<{ payment_url: string }>('/payments/process', {
      method: 'POST',
      body: JSON.stringify({
        report_id: reportId,
        payment_method: paymentMethod
      })
    });
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            payment_url: `https://checkout.stripe.com/mock_${reportId}`
          }
        });
      }, 1000);
    });
  }
};

// Error handling utilities
export const handleApiError = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Retry mechanism for failed requests
export const retryRequest = async <T>(
  fn: () => Promise<ApiResponse<T>>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<ApiResponse<T>> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await fn();
      if (result.success) {
        return result;
      }
      lastError = result.error;
    } catch (error) {
      lastError = error;
    }
    
    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  return {
    success: false,
    error: handleApiError(lastError)
  };
};