// API Service Layer
// Integrates with the Ruut vehicle intelligence API (https://api.ruut.info)

const API_BASE_URL = '/api';

// API Configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  retries: 3
};

// ============================================================
// TypeScript interfaces matching actual API response shapes
// ============================================================

export interface SnapshotBaseResponse {
  vehicle_info: {
    registration: string;
    make: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
  };
  mot_history: {
    current_status: string;
    valid_until: string;
    test_history: Array<{
      date: string;
      mileage: string;
      result: string;
      advisories: string[];
    }>;
    mileage_progression: Array<[string, number]>;
    estimated_current_mileage: number;
    average_annual_mileage: number;
    ai_insights: {
      important_patterns: Array<{
        issue: string;
        years_detected: string[];
        note: string;
      }>;
      minor_concerns: Array<{
        issue: string;
        year_detected: string;
        note: string;
      }>;
      recommended_actions: string[];
    };
  };
  tax_status: {
    tax_status: string;
    annual_rate: number;
    monthly_rate: number;
    expires: string;
  };
  rarity_count: {
    make: string;
    model: string;
    active: number;
    active_percent: number;
    inactive: number;
    total: number;
  };
  recalls: {
    number_of_recalls: number;
    number_of_cars_affected: number;
    recalls_data: Array<{
      defect: string;
      concern: string;
      number_of_vehicles_affected: number;
      remedy: string;
    }>;
  };
  ai_analysis: {
    market_position: {
      summary: string;
      strengths: string[];
      risks: string[];
    };
    maintenance_insights: {
      recurring_issues: string[];
      one_time_issues: string[];
      severity: string;
    };
    usage_assessment: {
      mileage_pattern: string;
      odometer_consistency: string;
      notes: string;
    };
    overall_assessment: {
      health_score: number;
      confidence: string;
      recommendation: string;
    };
  };
}

// --- /build-sheet response ---
export interface BuildSheetResponse {
  make: string;
  model: string;
  year: number;
  trim: string;
  body: string;
  fuel_type: string;
  specifications: {
    engine: {
      capacity: string;
      description: string;
      aspiration: string;
      cylinders: number;
      valve_gear: string;
      fuel_delivery: string | null;
      engine_family: string | null;
      engine_description: string;
    };
    performance: {
      power: { Bhp: number; Ps: number; Kw: number; Rpm: number };
      torque: { Nm: number; LbFt: number; Rpm: number };
      acceleration: {
        ZeroToSixtyMph: number | null;
        ZeroToOneHundredKph: number | null;
        MaxSpeedKph: number;
        MaxSpeedMph: number;
      };
    };
    transmission_drive: {
      gearbox: string;
      gears: number;
      type: string;
      drivetrain: string;
      driving_axle: string;
    };
    efficiency_emissions: {
      wltp_combined_mpg: number;
      urban_cold_mpg: number;
      extra_urban_mpg: number;
      combined_l100km: number;
      co2_emissions_gkm: number;
      euro_standard: string;
      adblue_tank_liters: number | null;
    };
  };
  equipment_grouped: Record<string, string[]>;
  optional_extras: {
    items: Array<{
      feature?: string;
      category?: string;
      resale_impact?: string;
      description?: string;
    }>;
    total_value: string | null;
    total_items: number;
    summary: {
      added_to_base_price: string | null;
      resale_premium: string | null;
    };
  };
  additional_specs: {
    boot_space: { litres: number; seats_down_litres: number | null };
    fuel_tank: { capacity_litres: number; estimated_range_miles: number };
    kerb_weight: { kg: number; variant: string | null };
    towing: { braked_kg: number | null; unbraked_kg: number | null };
  };
  ai_insights: {
    performance_highlights: Array<{
      metric: string;
      value: string;
      assessment: string;
    }>;
    equipment_analysis: {
      premium_features: Array<{
        feature: string;
        category: string;
        resale_impact: string;
        description: string;
      }>;
      equipment_rating: string;
    };
    resale_verdict: {
      overall_rating: string;
      key_strengths: string[];
      resale_premium: string;
      summary: string;
    };
  };
}

// --- /safety-assesment response ---
export interface SafetyAssessmentResponse {
  safety_data: any;
  ai_analysis: any;
}

// --- Finance agreement shape ---
export interface FinanceAgreement {
  agreement_date: string;
  agreement_type: string;
  agreement_term: number;
  agreement_number: string;
  finance_company: string;
  vehicle_description: string;
}

export interface FinanceData {
  number_of_agreements: number;
  agreements: FinanceAgreement[];
  ai_insight: string;
}

// --- /provenance response ---
export interface ProvenanceResponse {
  writeoff: {
    ai_insight: string | null;
  };
  finance: FinanceData | null;
  stolen_info: any | null;
  import_export: any | null;
  keepers: {
    previous_keepers: number;
    data: Array<{
      keeper_count: number;
      keeper_start_date: string;
      keeper_end_date: string;
    }>;
    ai_insight: string;
  };
  plates: {
    plate_changes: number;
    is_original_plate: boolean;
    data: Array<{
      current_vrm: string;
      previous_vrm: string;
      transfer_type: string;
      date_of_receipt: string;
      date_of_transaction: string;
    }>;
    ai_insight: string;
  };
}

// --- /ev-insights response ---
export interface EVInsightsResponse {
  ev: any | null;
  reason?: string;
}

// --- /lifestyle-fit response ---
export interface LifestyleFitResponse {
  lifestyle_fit: {
    boot_space: number;
    turning_radius_m: number;
    seating_capacity: number;
    towing_capacity: {
      braked_trailer_kg: number | null;
      unbraked_trailer_kg: number | null;
    };
  };
  subscriptions: any[];
  ai_analysis: {
    lifestyle: string[];
    subscriptions: any[];
    verdict: string;
  };
}

// --- /pre-purchase-inspections response ---
export interface PrePurchaseInspectionsResponse {
  paperwork_checklist: string[];
  model_specific_inspection: string[];
}

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================================
// Helper function to make API requests
// ============================================================
const makeRequest = async <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  try {
    // Build query string from params
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
      };
    }

    const data = await response.json();

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

// ============================================================
// Vehicle Service — all 7 API endpoints
// ============================================================
export const vehicleService = {
  /**
   * 1. Snapshot Base — free, always called first
   * GET /snapshot-base?registration=XXX
   */
  async getSnapshotBase(registration: string): Promise<ApiResponse<SnapshotBaseResponse>> {
    return makeRequest<SnapshotBaseResponse>('/snapshot-base', { registration });
  },

  /**
   * 2. Build Sheet & Factory Options
   * GET /build-sheet?registration=XXX
   */
  async getBuildSheet(registration: string): Promise<ApiResponse<BuildSheetResponse>> {
    return makeRequest<BuildSheetResponse>('/build-sheet', { registration });
  },

  /**
   * 3. Safety & Risk Assessment
   * GET /safety-assesment?registration=XXX&address=XXX
   */
  async getSafetyAssessment(registration: string, address: string): Promise<ApiResponse<SafetyAssessmentResponse>> {
    return makeRequest<SafetyAssessmentResponse>('/safety-assesment', { registration, address });
  },

  /**
   * 4. Provenance & Risk Registers
   * GET /provenance?registration=XXX
   */
  async getProvenance(registration: string): Promise<ApiResponse<ProvenanceResponse>> {
    return makeRequest<ProvenanceResponse>('/provenance', { registration });
  },

  /**
   * 5. Electric Vehicle Insights
   * GET /ev-insights?registration=XXX
   */
  async getEVInsights(registration: string): Promise<ApiResponse<EVInsightsResponse>> {
    return makeRequest<EVInsightsResponse>('/ev-insights', { registration });
  },

  /**
   * 6. Lifestyle Fit Tools
   * GET /lifestyle-fit?registration=XXX
   */
  async getLifestyleFit(registration: string): Promise<ApiResponse<LifestyleFitResponse>> {
    return makeRequest<LifestyleFitResponse>('/lifestyle-fit', { registration });
  },

  /**
   * 7. Pre-Purchase Inspections (Viewing Day Checklist)
   * GET /pre-purchase-inspections?registration=XXX
   */
  async getPrePurchaseInspections(registration: string): Promise<ApiResponse<PrePurchaseInspectionsResponse>> {
    return makeRequest<PrePurchaseInspectionsResponse>('/pre-purchase-inspections', { registration });
  },

  /**
   * Fetch ALL modules for a given registration in parallel.
   * address is required for the safety-assessment module.
   * Returns an object with all module data (some may have errors).
   */
  async fetchAllModules(registration: string, address: string) {
    const [
      snapshot,
      buildSheet,
      safety,
      provenance,
      evInsights,
      lifestyleFit,
      prePurchase,
    ] = await Promise.allSettled([
      this.getSnapshotBase(registration),
      this.getBuildSheet(registration),
      this.getSafetyAssessment(registration, address),
      this.getProvenance(registration),
      this.getEVInsights(registration),
      this.getLifestyleFit(registration),
      this.getPrePurchaseInspections(registration),
    ]);

    return {
      snapshot: snapshot.status === 'fulfilled' ? snapshot.value : { success: false, error: 'Request failed' },
      buildSheet: buildSheet.status === 'fulfilled' ? buildSheet.value : { success: false, error: 'Request failed' },
      safety: safety.status === 'fulfilled' ? safety.value : { success: false, error: 'Request failed' },
      provenance: provenance.status === 'fulfilled' ? provenance.value : { success: false, error: 'Request failed' },
      evInsights: evInsights.status === 'fulfilled' ? evInsights.value : { success: false, error: 'Request failed' },
      lifestyleFit: lifestyleFit.status === 'fulfilled' ? lifestyleFit.value : { success: false, error: 'Request failed' },
      prePurchase: prePurchase.status === 'fulfilled' ? prePurchase.value : { success: false, error: 'Request failed' },
    };
  },
};

// ============================================================
// Error handling utilities
// ============================================================
export const handleApiError = (error: any): string => {
  // Axios-style response errors
  if (error?.response?.data?.message) {
    return `Server error: ${error.response.data.message}`;
  }
  if (error?.response?.status) {
    const status = error.response.status;
    if (status === 404) return 'Vehicle not found — please check the registration.';
    if (status === 401 || status === 403) return 'Unauthorised — your API key may be invalid or missing.';
    if (status === 429) return 'Too many requests — please wait a moment and try again.';
    if (status >= 500) return `Server error (${status}) — the data provider is currently unavailable.`;
    return `Request failed with status ${status}.`;
  }
  // Native fetch / network errors
  if (error?.message) {
    if (error.message.toLowerCase().includes('failed to fetch') || error.message.toLowerCase().includes('networkerror')) {
      return 'Network error — please check your internet connection and try again.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
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