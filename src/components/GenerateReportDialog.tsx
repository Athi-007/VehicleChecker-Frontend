import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Database, Shield, Car, Sparkles, MapPin, CheckCircle2, Loader2 } from "lucide-react";

interface GenerateReportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onComplete?: (postcode: string) => void;
}

const LOADING_STEPS = [
    {
        icon: Database,
        title: "Connecting to DVLA & DVSA",
        description: "Pulling tax status, MOT history, and registered keeper data directly from official UK government databases.",
    },
    {
        icon: Shield,
        title: "Querying UKVD provenance registers",
        description: "Cross-checking insurance write-off categories, outstanding finance agreements, and stolen vehicle markers via the UK Vehicle Data network.",
    },
    {
        icon: Car,
        title: "Fetching manufacturer build data",
        description: "Decoding the VIN against manufacturer feeds to retrieve original factory specification, optional extras, and recall campaigns.",
    },
    {
        icon: MapPin,
        title: "Analysing local risk for your postcode",
        description: "Combining Police.uk crime data and ONS demographics with your address to assess theft hotspots and insurance bands.",
    },
    {
        icon: Sparkles,
        title: "AI is writing your personalised insights",
        description: "Our model is summarising the data into plain-English commentary, flagging anomalies, and ranking the most important findings for you.",
    },
];

const TOTAL_DURATION_MS = 10000;
const STEP_DURATION_MS = TOTAL_DURATION_MS / LOADING_STEPS.length;

export function GenerateReportDialog({ open, onOpenChange, onComplete }: GenerateReportDialogProps) {
    const [stage, setStage] = useState<"address" | "loading" | "done">("address");
    const [postcode, setPostcode] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    // Reset when dialog closes
    useEffect(() => {
        if (!open) {
            setStage("address");
            setPostcode("");
            setCurrentStep(0);
            setProgress(0);
        }
    }, [open]);

    // Drive the loading animation
    useEffect(() => {
        if (stage !== "loading") return;

        const startedAt = Date.now();
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startedAt;
            const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
            setProgress(pct);
            const step = Math.min(LOADING_STEPS.length - 1, Math.floor(elapsed / STEP_DURATION_MS));
            setCurrentStep(step);
            if (elapsed >= TOTAL_DURATION_MS) {
                clearInterval(progressInterval);
                setStage("done");
                onComplete?.(postcode);
            }
        }, 100);

        return () => clearInterval(progressInterval);
    }, [stage, postcode, onComplete]);

    const handleStart = () => {
        if (postcode.trim().length < 3) return;
        setStage("loading");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                {stage === "address" && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                One quick detail
                            </DialogTitle>
                            <DialogDescription>
                                We use your postcode to personalise insurance estimates, theft risk for your area, and local market pricing. We never share it.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 py-2">
                            <Label htmlFor="postcode">Your postcode</Label>
                            <Input
                                id="postcode"
                                placeholder="e.g. SW1A 1AA"
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                                autoFocus
                            />
                            <p className="text-xs text-muted-foreground">
                                Used only to tailor this report — not stored against your account.
                            </p>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button onClick={handleStart} disabled={postcode.trim().length < 3}>
                                Generate report
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {stage === "loading" && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                Building your report
                            </DialogTitle>
                            <DialogDescription>
                                Pulling live data from official UK sources and enhancing it with AI. This usually takes about 10 seconds.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 py-2">
                            <Progress value={progress} className="h-2" />

                            {/* Active step highlight */}
                            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-md bg-primary/10 p-2">
                                        {(() => {
                                            const Icon = LOADING_STEPS[currentStep].icon;
                                            return <Icon className="h-5 w-5 text-primary" />;
                                        })()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-foreground">{LOADING_STEPS[currentStep].title}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{LOADING_STEPS[currentStep].description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step list */}
                            <ul className="space-y-2">
                                {LOADING_STEPS.map((step, idx) => {
                                    const isDone = idx < currentStep;
                                    const isActive = idx === currentStep;
                                    return (
                                        <li
                                            key={step.title}
                                            className={`flex items-center gap-3 text-sm transition-opacity ${isDone || isActive ? "opacity-100" : "opacity-40"
                                                }`}
                                        >
                                            {isDone ? (
                                                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                                            ) : isActive ? (
                                                <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
                                            ) : (
                                                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                                            )}
                                            <span className={isDone ? "line-through text-muted-foreground" : "text-foreground"}>
                                                {step.title}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <p className="text-xs text-center text-muted-foreground">
                                Sources: DVLA · DVSA · UKVD · Police.uk · Manufacturer feeds · CarVertical network
                            </p>
                        </div>
                    </>
                )}

                {stage === "done" && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                Report ready
                            </DialogTitle>
                            <DialogDescription>
                                Your personalised vehicle report has been generated successfully.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={() => onOpenChange(false)}>View report</Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
