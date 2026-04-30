import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, X } from "lucide-react";

interface PostcodeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (postcode: string) => void;
}

export function PostcodeModal({ open, onClose, onSubmit }: PostcodeModalProps) {
  const [postcode, setPostcode] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    const cleaned = postcode.trim().toUpperCase();
    if (!cleaned) return;
    onSubmit(cleaned);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground">One quick detail</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6">
          We use your postcode to personalise insurance estimates, theft risk for
          your area, and local market pricing. We never share it.
        </p>

        {/* Input */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-foreground">Your postcode</label>
          <Input
            placeholder="e.g. SW1A 1AA"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="text-base font-mono"
            maxLength={8}
          />
          <p className="text-xs text-muted-foreground">
            Used only to tailor this report — not stored against your account.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!postcode.trim()}>
            Generate report
          </Button>
        </div>
      </div>
    </div>
  );
}
