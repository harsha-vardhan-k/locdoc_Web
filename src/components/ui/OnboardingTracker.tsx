'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Clock } from 'lucide-react';

interface TrackerStep {
  label: string;
  description: string;
  duration: number;
}

interface OnboardingTrackerProps {
  steps: TrackerStep[];
  onComplete?: () => void;
  disclaimer?: string;
}

export default function OnboardingTracker({
  steps,
  onComplete,
  disclaimer,
}: OnboardingTrackerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setDone(true);
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep((s) => s + 1);
    }, steps[currentStep].duration);
    return () => clearTimeout(timer);
  }, [currentStep, steps, onComplete]);

  return (
    <div className="space-y-6">
      {/* Steps */}
      <div className="relative space-y-0">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep && !done;
          const isPending = i > currentStep;

          return (
            <div key={`tracker-step-${i}`} className="flex gap-4">
              {/* Rail */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-success text-white'
                      : isActive
                      ? 'bg-primary text-white' :'bg-border text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={16} />
                  ) : isActive ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Clock size={14} />
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mt-1 transition-all duration-300 ${
                      isCompleted ? 'bg-success' : 'bg-border'
                    }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-6">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    isCompleted
                      ? 'text-success'
                      : isActive
                      ? 'text-primary' :'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {done && (
        <div className="rounded-xl bg-success-bg border border-success/20 px-4 py-3 text-sm text-success font-medium flex items-center gap-2">
          <CheckCircle2 size={16} />
          All steps completed successfully.
        </div>
      )}

      {disclaimer && (
        <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2 leading-relaxed">
          ⚠️ {disclaimer}
        </p>
      )}
    </div>
  );
}