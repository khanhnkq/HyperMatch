import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkle } from "@phosphor-icons/react";

interface AIProcessingProps {
  onFinished: () => void;
}

const THINKING_STEPS = [
  "Analyzing your daily workflow patterns...",
  "Evaluating ergonomic posture requirements...",
  "Optimizing desk space layout config...",
  "Matching premium HyperWork hardware matches...",
  "Calculating workspace efficiency score...",
  "Finalizing workspace recommendation board..."
];

export default function AIProcessing({ onFinished }: AIProcessingProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < THINKING_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onFinished();
          }, 800);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="w-full min-h-[90dvh] bg-white flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.02)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-md w-full bg-neutral-50 border border-neutral-200 rounded-brand-card shadow-xl p-8 flex flex-col items-center justify-center text-center min-h-[350px]">
        {/* Animated AI Core Orb */}
        <div className="relative mb-8">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.4)]"
          >
            <Sparkle size={28} weight="fill" className="text-white" />
          </motion.div>
          
          {/* Echo Rings */}
          <span className="absolute top-0 left-0 w-16 h-16 rounded-full border border-[#FF0000]/30 animate-ping opacity-75 pointer-events-none" />
        </div>

        <h3 className="font-display font-bold text-xl tracking-tight text-neutral-900 mb-2">
          AI Workspace Analysis
        </h3>
        <p className="text-neutral-500 text-xs uppercase tracking-widest font-semibold mb-8">
          Configuring your setup...
        </p>

        {/* Step List Container */}
        <div className="w-full flex flex-col gap-3 min-h-[140px] justify-start text-left px-4">
          {THINKING_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;

            return (
              <div
                key={step}
                className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                  isCompleted
                    ? "text-neutral-400"
                    : isActive
                    ? "text-neutral-900 font-bold scale-[1.02]"
                    : "text-neutral-300"
                }`}
              >
                {/* Status Indicator Dot */}
                <div className="relative flex items-center justify-center w-4 h-4">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-[#FF0000]"
                    />
                  ) : isActive ? (
                    <>
                      <span className="w-3 h-3 rounded-full bg-[#FF0000]/20 animate-ping absolute" />
                      <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
                    </>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  )}
                </div>

                <span>{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
