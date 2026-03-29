import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

const STEPS = [
  "Observing system state...",
  "Detecting anomaly...",
  "Generating possible futures...",
  "Evaluating trade-offs...",
  "Selecting optimal decision...",
  "Executing action..."
];

export const DecisionTimeline = ({ onComplete }: { onComplete?: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentStep, onComplete]);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-12">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 text-center">Processing Decision Pipeline</h3>
      <div className="max-w-md mx-auto space-y-4">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = currentStep === index;
          
          return (
            <div key={index} className="flex items-center gap-4 group">
              <div className="relative flex flex-col items-center">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 bg-white rounded-full z-10" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-gray-900 animate-spin z-10" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-200 fill-gray-50 z-10" />
                )}
                {index !== STEPS.length - 1 && (
                  <div className={`w-0.5 h-6 -mb-2 mt-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-100'}`} />
                )}
              </div>
              <span className={`text-sm font-medium transition-colors duration-300 ${isCompleted ? 'text-gray-900' : isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
