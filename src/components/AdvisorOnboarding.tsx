import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CloudArrowUp, Check, Shield } from "@phosphor-icons/react";

interface OnboardingData {
  role: string;
  hours: number;
  problems: string[];
  budget: number;
  style: string;
  color: string;
  equipment: string[];
  photo: File | null;
}

interface AdvisorOnboardingProps {
  onBackToLanding: () => void;
  onComplete: (data: OnboardingData) => void;
}

const QUESTIONS_COUNT = 8;

export default function AdvisorOnboarding({ onBackToLanding, onComplete }: AdvisorOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    role: "",
    hours: 8,
    problems: [],
    budget: 15, // Millions VND
    style: "",
    color: "",
    equipment: [],
    photo: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextStep = () => {
    if (currentStep < QUESTIONS_COUNT) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBackToLanding();
    }
  };

  const selectSingle = (key: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Auto next for single select choices
    setTimeout(() => {
      setCurrentStep(prev => (prev < QUESTIONS_COUNT ? prev + 1 : prev));
      if (currentStep === QUESTIONS_COUNT) {
        onComplete({ ...formData, [key]: value });
      }
    }, 300);
  };

  const toggleMultiple = (key: "problems" | "equipment", value: string) => {
    setFormData(prev => {
      const list = prev[key] as string[];
      const newList = list.includes(value)
        ? list.filter(item => item !== value)
        : [...list, value];
      return { ...prev, [key]: newList };
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.dataTransfer.files[0] }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const progressPercent = (currentStep / QUESTIONS_COUNT) * 100;

  return (
    <div className="w-full min-h-[90dvh] bg-white flex items-center justify-center py-12 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-2xl w-full bg-neutral-50 border border-neutral-200 rounded-brand-card shadow-xl p-6 md:p-10 relative z-10 flex flex-col justify-between min-h-[550px]">
        {/* Progress Bar & Header */}
        <div>
          <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-3">
            <span>Workspace Advisor</span>
            <span>Question {currentStep} of {QUESTIONS_COUNT}</span>
          </div>

          <div className="w-full h-[3px] bg-neutral-200 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-[#FF0000] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          <div className="text-center text-xs font-semibold text-neutral-500 mb-6">
            <span>Complete in about 90 seconds · Auto Save enabled</span>
          </div>
        </div>

        {/* Step Rendering */}
        <div className="flex-grow flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              {/* QUESTION 1: Role */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-neutral-900 text-center">
                    What do you do?
                  </h2>
                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
                    {["Software Engineer", "Designer", "Student", "Content Creator", "Remote Worker", "Gamer", "Other"].map(role => (
                      <button
                        key={role}
                        onClick={() => selectSingle("role", role)}
                        className={`px-4 py-3 text-xs font-bold tracking-wide uppercase rounded-lg border text-left cursor-pointer transition-all duration-200 ${
                          formData.role === role
                            ? "bg-white text-black border-[#FF0000] ring-1 ring-[#FF0000] shadow-md"
                            : "bg-[#f5f5f7] text-neutral-600 border-transparent hover:bg-neutral-200 hover:text-black"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUESTION 2: Daily Hours */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-8 max-w-md mx-auto w-full text-center">
                  <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-neutral-900">
                    How many hours do you work daily?
                  </h2>
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <span className="text-5xl font-extrabold text-black font-display">
                      {formData.hours} <span className="text-xl text-neutral-400">hours</span>
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="16"
                      value={formData.hours}
                      onChange={e => setFormData(prev => ({ ...prev, hours: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#FF0000] mt-2"
                    />
                    <div className="flex justify-between w-full text-[10px] font-bold text-neutral-500 uppercase px-1">
                      <span>1 Hr</span>
                      <span>8 Hrs (Avg)</span>
                      <span>16 Hrs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* QUESTION 3: Problems */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-neutral-900 text-center">
                    What problems do you experience?
                  </h2>
                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
                    {[
                      { id: "Neck pain", label: "Neck Pain" },
                      { id: "Back pain", label: "Back Pain" },
                      { id: "Wrist pain", label: "Wrist Pain" },
                      { id: "Cable clutter", label: "Cable Clutter" },
                      { id: "Limited desk space", label: "Limited Space" },
                      { id: "Poor lighting", label: "Poor Lighting" },
                      { id: "Eye strain", label: "Eye Strain" },
                    ].map(prob => {
                      const isSelected = formData.problems.includes(prob.id);
                      return (
                        <button
                          key={prob.id}
                          onClick={() => toggleMultiple("problems", prob.id)}
                          className={`px-4 py-3.5 text-xs font-bold tracking-wide uppercase rounded-lg border text-left cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? "bg-white text-black border-[#FF0000] ring-1 ring-[#FF0000] shadow-md"
                              : "bg-[#f5f5f7] text-neutral-600 border-transparent hover:bg-neutral-200 hover:text-black"
                          }`}
                        >
                          <span>{prob.label}</span>
                          {isSelected && <Check size={14} weight="bold" className="text-[#FF0000]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUESTION 4: Budget */}
              {currentStep === 4 && (
                <div className="flex flex-col gap-8 max-w-md mx-auto w-full text-center">
                  <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-neutral-900">
                    What is your setup budget?
                  </h2>
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <span className="text-4xl font-extrabold text-black font-display">
                      {formData.budget}.000.000 <span className="text-lg text-neutral-400">VND</span>
                    </span>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={formData.budget}
                      onChange={e => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#FF0000] mt-2"
                    />
                    <div className="flex justify-between w-full text-[10px] font-bold text-neutral-500 uppercase px-1">
                      <span>5 Million</span>
                      <span>15 Million</span>
                      <span>30 Million+</span>
                    </div>
                  </div>
                </div>
              )}

              {/* QUESTION 5: Style */}
              {currentStep === 5 && (
                <div className="flex flex-col gap-6 w-full">
                  <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-neutral-900 text-center">
                    Preferred Workspace Style
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
                    {[
                      { id: "Minimal", label: "Minimalist", desc: "Clean & airy" },
                      { id: "Modern", label: "Modern Tech", desc: "Glass & metal" },
                      { id: "Dark", label: "Matte Dark", desc: "Stealth look" },
                      { id: "Wooden", label: "Warm Wood", desc: "Walnut & plants" },
                      { id: "RGB", label: "RGB Gaming", desc: "Neon & lights" }
                    ].map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => selectSingle("style", theme.id)}
                        className={`p-4 rounded-brand-card border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                          formData.style === theme.id
                            ? "bg-white text-black border-[#FF0000] ring-1 ring-[#FF0000] shadow-md scale-[1.03]"
                            : "bg-[#f5f5f7] text-neutral-600 border-transparent hover:bg-neutral-200 hover:text-black opacity-100"
                        }`}
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">{theme.id}</span>
                          <span className="font-display font-bold text-sm block mt-1">{theme.label}</span>
                        </div>
                        <span className="text-[10px] block opacity-60 font-medium">{theme.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUESTION 6: Favorite Color */}
              {currentStep === 6 && (
                <div className="flex flex-col gap-6 max-w-md mx-auto w-full text-center">
                  <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-neutral-900">
                    Favorite Setup Colorway
                  </h2>
                  <div className="flex justify-center gap-6 mt-4">
                    {[
                      { id: "White", label: "Snow White", hex: "bg-white border-neutral-200" },
                      { id: "Black", label: "Matte Black", hex: "bg-[#151515] border-[#151515]" },
                      { id: "Red", label: "Brand Red", hex: "bg-[#FF0000] border-[#FF0000]" }
                    ].map(color => {
                      const isSelected = formData.color === color.id;
                      return (
                        <button
                          key={color.id}
                          onClick={() => selectSingle("color", color.id)}
                          className="flex flex-col items-center gap-3 group cursor-pointer"
                        >
                          <div className={`w-16 h-16 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${color.hex} ${
                            isSelected ? "ring-2 ring-offset-2 ring-[#FF0000] scale-110" : "scale-100 group-hover:scale-105"
                          }`}>
                            {isSelected && (
                              <Check size={20} weight="bold" className={color.id === "White" ? "text-neutral-900" : "text-white"} />
                            )}
                          </div>
                          <span className={`text-[11px] font-bold tracking-wider uppercase ${isSelected ? "text-neutral-900" : "text-neutral-500 group-hover:text-black"}`}>
                            {color.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUESTION 7: Current Equipment */}
              {currentStep === 7 && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-neutral-900 text-center">
                    What equipment do you currently use?
                  </h2>
                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
                    {[
                      { id: "Laptop", label: "Laptop" },
                      { id: "Monitor", label: "External Monitor" },
                      { id: "Standing Desk", label: "Standing Desk" },
                      { id: "Mechanical Keyboard", label: "Mechanical Keyboard" },
                      { id: "Ergonomic Chair", label: "Ergonomic Chair" },
                    ].map(equip => {
                      const isSelected = formData.equipment.includes(equip.id);
                      return (
                        <button
                          key={equip.id}
                          onClick={() => toggleMultiple("equipment", equip.id)}
                          className={`px-4 py-3.5 text-xs font-bold tracking-wide uppercase rounded-lg border text-left cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? "bg-white text-black border-[#FF0000] ring-1 ring-[#FF0000] shadow-md"
                              : "bg-[#f5f5f7] text-neutral-600 border-transparent hover:bg-neutral-200 hover:text-black"
                          }`}
                        >
                          <span>{equip.label}</span>
                          {isSelected && <Check size={14} weight="bold" className="text-[#FF0000]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUESTION 8: Upload Workspace */}
              {currentStep === 8 && (
                <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
                  <div className="text-center">
                    <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-neutral-900">
                      Upload Your Workspace
                    </h2>
                    <p className="text-neutral-400 text-xs mt-2">
                      (Optional) Get personalized posture corrections and placement insights from our AI Vision engine.
                    </p>
                  </div>

                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-brand-card p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 min-h-[180px] ${
                      dragActive
                        ? "border-[#FF0000] bg-[#FF0000]/5"
                        : formData.photo
                        ? "border-black bg-[#f5f5f7]"
                        : "border-neutral-200 bg-[#f5f5f7] hover:border-[#FF0000] hover:bg-[#FF0000]/5 text-neutral-500 hover:text-black"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {formData.photo ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                          <Check size={20} weight="bold" />
                        </div>
                        <span className="text-xs font-bold text-black text-center uppercase tracking-wider">
                          Image Uploaded Successfully
                        </span>
                        <span className="text-[10px] text-neutral-400 max-w-[200px] truncate text-center">
                          {formData.photo.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <CloudArrowUp size={36} className="text-neutral-500" />
                        <span className="text-xs font-bold text-neutral-700 text-center uppercase tracking-wider">
                          Drag & drop or Click to upload
                        </span>
                        <span className="text-[10px] text-neutral-500 text-center">
                          Supports PNG, JPG, or HEIC
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">
                    <Shield size={12} weight="bold" className="text-black" />
                    <span>Your image remains private and is only processed locally.</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="border-t border-neutral-200 mt-6 pt-6 flex items-center justify-between">
          <button
            onClick={prevStep}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-black font-sans text-xs font-bold tracking-wider uppercase cursor-pointer py-2 transition-colors duration-150"
          >
            <ArrowLeft size={12} weight="bold" />
            <span>{currentStep === 1 ? "Cancel" : "Back"}</span>
          </button>

          {/* Render "Next" button only for questions that aren't auto-advancing, or the final optional upload step */}
          {([2, 3, 4, 7, 8].includes(currentStep)) && (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-neutral-900 text-white font-sans text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-full cursor-pointer hover:bg-neutral-800 transition-colors duration-150 active:scale-98 shadow-md"
            >
              <span>{currentStep === QUESTIONS_COUNT ? "Finish & Analyze" : "Next"}</span>
              <ArrowRight size={12} weight="bold" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
