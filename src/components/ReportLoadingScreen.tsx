import { useEffect, useState } from "react";
import { CheckCircle, Loader2, X } from "lucide-react";

interface LoadingStep {
  label: string;
  description: string;
}

const LOADING_STEPS: LoadingStep[] = [
  { label: "Connecting to DVLA & DVSA", description: "Pulling tax status, MOT history, and registered keeper data directly from official UK government databases." },
  { label: "Querying UKVD provenance registers", description: "Checking write-off, finance, and stolen vehicle records from industry data providers." },
  { label: "Fetching manufacturer build data", description: "Retrieving factory specification, optional extras, and equipment details." },
  { label: "Analysing local risk for your postcode", description: "Cross-referencing crime statistics and theft data for your area." },
  { label: "AI is writing your personalised insights", description: "Generating tailored analysis, recommendations, and plain-English summaries." },
];

const SOURCES = "DVLA · DVSA · UKVD · Police.uk · Manufacturer feeds · CarVertical network";

interface ReportLoadingScreenProps {
  open: boolean;
  onClose?: () => void;
  onComplete: () => void;
}

export function ReportLoadingScreen({ open, onClose, onComplete }: ReportLoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      setProgress(0);
      setIsComplete(false);
      return;
    }

    // Animate through steps — each step takes ~1.8 seconds
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 90); // ~9 seconds to complete

    // Mark complete after all steps
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
    }, LOADING_STEPS.length * 1800 + 500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [open]);

  // Auto-navigate after completion
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => onComplete(), 1200);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {isComplete ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            )}
            <h2 className="text-lg font-bold text-foreground">
              {isComplete ? "Report ready!" : "Building your report"}
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {!isComplete && (
          <p className="text-sm text-muted-foreground mb-5">
            Pulling live data from official UK sources and enhancing it with AI. This usually takes about 10 seconds.
          </p>
        )}

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${isComplete ? 'bg-green-600' : 'bg-primary'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps checklist */}
        <div className="space-y-1 mb-6">
          {LOADING_STEPS.map((step, idx) => {
            const isActive = idx === currentStep && !isComplete;
            const isDone = idx < currentStep || isComplete;

            return (
              <div key={idx}>
                {/* Active step gets expanded card */}
                {isActive ? (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-1 animate-in fade-in-0 duration-300">
                    <div className="flex items-center gap-3 mb-1">
                      <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                      <p className="text-sm font-semibold text-foreground">{step.label}</p>
                    </div>
                    <p className="text-xs text-muted-foreground pl-7">{step.description}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 py-1.5 px-1">
                    {isDone ? (
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                    )}
                    <p className={`text-sm ${isDone ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                      {step.label}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sources */}
        <p className="text-[10px] text-muted-foreground/60 text-center">
          Sources: {SOURCES}
        </p>
      </div>
    </div>
  );
}
