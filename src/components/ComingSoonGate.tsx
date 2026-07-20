import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Lock, Wrench } from "lucide-react";

const PASSWORD = "ruut2026";

export function ComingSoonGate({ children }: { children: React.ReactNode }) {
    const [unlocked, setUnlocked] = useState(false);
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim().toLowerCase() === PASSWORD) {
            setUnlocked(true);
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    if (unlocked) return <>{children}</>;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Simple top bar to match site */}
            <div className="border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
                        <Car className="h-6 w-6 text-primary" />
                        <span className="text-primary font-bold text-lg">Ruut</span>
                    </div>
                </div>
            </div>


            <div className="flex-1 flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-muted/40">
                <div className="max-w-lg w-full text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
                        <Wrench className="h-3.5 w-3.5" />
                        EARLY ACCESS
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                        We're putting the finishing touches on Ruut
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        The smarter, more affordable vehicle history check is nearly ready.
                        Got an early access password? Enter it below.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-card rounded-xl p-6 border border-border shadow-sm text-left"
                        style={{ animation: shake ? "ruut-shake 0.4s" : undefined }}
                    >
                        <label className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
                            <Lock className="h-4 w-4 text-primary" />
                            Access password
                        </label>
                        <div className="flex gap-2">
                            <Input
                                type="password"
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    setError(false);
                                }}
                                placeholder="Enter password"
                                className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                                autoComplete="new-password"
                                autoFocus
                            />
                            <Button type="submit" className="bg-primary hover:bg-primary/90">
                                Enter
                            </Button>
                        </div>
                        {error && (
                            <p className="mt-3 text-sm text-destructive">
                                That password isn't right. Try again.
                            </p>
                        )}
                    </form>

                    <p className="mt-8 text-xs text-muted-foreground">
                        Launching soon · Ruut
                    </p>

                    {/* Fun little road animation */}
                    <div className="relative mt-10 h-16 overflow-hidden">
                        {/* Car driving along */}
                        <div className="absolute bottom-4 ruut-car">
                            <Car className="h-11 w-11 text-primary" strokeWidth={2.2} />
                        </div>
                        {/* Road */}
                        <div className="absolute bottom-0 left-0 right-0 h-3 bg-foreground/80 rounded-sm overflow-hidden">
                            <div className="ruut-road-lines h-full w-[200%] flex items-center gap-4 pl-2">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <span key={i} className="inline-block w-6 h-[2px] bg-white shrink-0" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes ruut-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes ruut-car-drive {
          0% { left: -10%; transform: translateY(0); }
          50% { transform: translateY(-2px); }
          100% { left: 105%; transform: translateY(0); }
        }
        @keyframes ruut-road-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ruut-car { animation: ruut-car-drive 5s linear infinite; }
        .ruut-road-lines { animation: ruut-road-scroll 5s linear infinite; }
      `}</style>
        </div>
    );
}
