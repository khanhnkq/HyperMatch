import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CloudArrowUp,
  Check,
  Shield,
  Desktop,
  PencilLine,
  GraduationCap,
  VideoCamera,
  House,
  GameController,
  DotsThree,
  FirstAidKit,
  LinkBreak,
  Eye,
  Lamp,
  Resize,
  Keyboard,
  Armchair,
  MonitorArrowUp,
  Laptop,
} from "@phosphor-icons/react";

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

interface OnboardingFlowProps {
  onBackToLanding: () => void;
  onComplete: (data: OnboardingData) => void;
}

const STEPS_COUNT = 8;

const STEP_BACKGROUNDS = [
  "https://hyperwork.vn/cdn/shop/files/HPWT93781_11zon.jpg?v=1760322746&width=1400",
  "https://hyperwork.vn/cdn/shop/files/DSC08799_11zon.jpg?v=1760324549&width=1400",
  "https://hyperwork.vn/cdn/shop/files/74_03594_11zon_54604b3d-de7f-4649-9ad5-ffbbc9217547.jpg?v=1760323357&width=1400",
  "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=1400",
  "https://hyperwork.vn/cdn/shop/files/11_csopy_11zon.jpg?v=1783390458&width=1400",
  "https://hyperwork.vn/cdn/shop/files/HPWT93781_11zon.jpg?v=1760322746&width=1400",
  "https://hyperwork.vn/cdn/shop/files/DSC08799_11zon.jpg?v=1760324549&width=1400",
  "https://hyperwork.vn/cdn/shop/files/74_03594_11zon_54604b3d-de7f-4649-9ad5-ffbbc9217547.jpg?v=1760323357&width=1400",
];

const ROLES = [
  { id: "Software Engineer", label: "Kỹ sư phần mềm", icon: Desktop },
  { id: "Designer", label: "Nhà thiết kế", icon: PencilLine },
  { id: "Student", label: "Sinh viên", icon: GraduationCap },
  { id: "Content Creator", label: "Content Creator", icon: VideoCamera },
  { id: "Remote Worker", label: "Làm việc từ xa", icon: House },
  { id: "Gamer", label: "Gamer", icon: GameController },
  { id: "Other", label: "Khác", icon: DotsThree },
];

const PROBLEMS = [
  { id: "Neck pain", label: "Đau cổ", icon: FirstAidKit },
  { id: "Back pain", label: "Đau lưng", icon: FirstAidKit },
  { id: "Wrist pain", label: "Đau cổ tay", icon: FirstAidKit },
  { id: "Cable clutter", label: "Dây cáp lộn xộn", icon: LinkBreak },
  { id: "Limited desk space", label: "Bàn chật", icon: Resize },
  { id: "Poor lighting", label: "Thiếu ánh sáng", icon: Lamp },
  { id: "Eye strain", label: "Mỏi mắt", icon: Eye },
];

const STYLES = [
  {
    id: "Minimal",
    label: "Minimalist",
    desc: "Sạch sẽ & thoáng đãng",
    image: "https://hyperwork.vn/cdn/shop/files/Capture_One_Catalog05971_11zon.svg",
  },
  {
    id: "Modern",
    label: "Modern Tech",
    desc: "Kính & kim loại",
    image: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=600",
  },
  {
    id: "Dark",
    label: "Matte Dark",
    desc: "Phong cách tối giản",
    image: "https://hyperwork.vn/cdn/shop/files/11_csopy_11zon.jpg?v=1783390458&width=600",
  },
  {
    id: "Wooden",
    label: "Warm Wood",
    desc: "Gỗ tự nhiên & cây xanh",
    image: "https://hyperwork.vn/cdn/shop/files/Setup1-PG02-2_11zon_1.jpg",
  }
];

const EQUIPMENT = [
  { id: "Laptop", label: "Laptop", icon: Laptop },
  { id: "Monitor", label: "Màn hình rời", icon: MonitorArrowUp },
  { id: "Standing Desk", label: "Bàn đứng", icon: Desktop },
  { id: "Mechanical Keyboard", label: "Bàn phím cơ", icon: Keyboard },
  { id: "Ergonomic Chair", label: "Ghế công thái học", icon: Armchair },
];

const easeOut = [0.32, 0.72, 0, 1] as const;

export default function OnboardingFlow({ onBackToLanding, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    role: "",
    hours: 8,
    problems: [],
    budget: 15,
    style: "",
    color: "",
    equipment: [],
    photo: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextStep = () => {
    if (currentStep < STEPS_COUNT) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    } else {
      onBackToLanding();
    }
  };

  const selectSingle = (key: keyof OnboardingData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => {
      setDirection(1);
      setCurrentStep((prev) => {
        if (prev < STEPS_COUNT) return prev + 1;
        onComplete({ ...formData, [key]: value });
        return prev;
      });
    }, 350);
  };

  const toggleMultiple = (key: "problems" | "equipment", value: string) => {
    setFormData((prev) => {
      const list = prev[key] as string[];
      const newList = list.includes(value)
        ? list.filter((item) => item !== value)
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
      setFormData((prev) => ({ ...prev, photo: e.dataTransfer.files[0] }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const progressPercent = (currentStep / STEPS_COUNT) * 100;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full min-h-[100dvh] bg-white flex flex-col font-sans">

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row mt-[76px]">
        {/* Left: Background image pane (desktop only) */}
        <div className="hidden lg:block lg:w-[45%] xl:w-[48%] relative overflow-hidden ">

          <AnimatePresence mode="wait">
            <motion.img
              key={`bg-${currentStep}`}
              src={STEP_BACKGROUNDS[currentStep - 1]}
              alt=""
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent" />

          {/* Step counter overlay */}
          <div className="absolute bottom-8 left-8 flex flex-col gap-2 text-white z-10">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
              Workspace Advisor
            </span>
            <span className="text-4xl font-black tracking-tight">
              {String(currentStep).padStart(2, "0")}
              <span className="text-lg font-normal opacity-40 ml-1">/ {String(STEPS_COUNT).padStart(2, "0")}</span>
            </span>
          </div>
        </div>

        {/* Right: Form pane */}
        <div className="flex-1 flex flex-col justify-between min-h-[calc(100dvh-76px)] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 lg:py-12">
          {/* Top meta: Mobile step info */}
          <div className="flex items-center justify-between mb-6 lg:mb-10">
            <button
              onClick={prevStep}
              className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 text-xs font-bold tracking-wider uppercase cursor-pointer transition-colors duration-300"
            >
              <ArrowLeft size={14} weight="bold" />
              <span className="hidden sm:inline">{currentStep === 1 ? "Thoát" : "Quay lại"}</span>
            </button>
            <div className="flex items-center gap-3 text-neutral-400">
              <span className="text-[11px] font-bold tracking-wider uppercase">
                Bước {currentStep} / {STEPS_COUNT}
              </span>
            </div>
          </div>

          {/* Step content */}
          <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: easeOut }}
                className="w-full"
              >
                {/* STEP 1: Role */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight text-neutral-900 leading-tight">
                        Bạn làm nghề gì?
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2">Chọn vai trò phù hợp nhất với công việc hiện tại của bạn</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {ROLES.map((role) => {
                        const Icon = role.icon;
                        const isSelected = formData.role === role.id;
                        return (
                          <button
                            key={role.id}
                            onClick={() => selectSingle("role", role.id)}
                            className={`group/card relative flex items-center gap-3.5 px-5 py-4 rounded-2xl border text-left cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isSelected
                              ? "bg-neutral-900 text-white border-neutral-900 shadow-lg scale-[1.02]"
                              : "bg-neutral-50 text-neutral-700 border-neutral-100 hover:bg-neutral-100 hover:border-neutral-200 hover:shadow-sm"
                              }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? "bg-white/15" : "bg-neutral-200/60"
                                }`}
                            >
                              <Icon size={18} weight={isSelected ? "fill" : "regular"} />
                            </div>
                            <span className="text-sm font-bold">{role.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Daily hours */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-10">
                    <div>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight text-neutral-900 leading-tight">
                        Bạn làm việc bao nhiêu giờ mỗi ngày?
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2">Kéo thanh trượt để chọn số giờ</p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                      <div className="flex items-baseline gap-1">
                        <motion.span
                          key={formData.hours}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="text-7xl font-black text-neutral-900 tabular-nums"
                        >
                          {formData.hours}
                        </motion.span>
                        <span className="text-xl text-neutral-400 font-medium ml-1">giờ</span>
                      </div>
                      <div className="w-full max-w-md">
                        <input
                          type="range"
                          min="1"
                          max="16"
                          value={formData.hours}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, hours: parseInt(e.target.value) }))
                          }
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                        />
                        <div className="flex justify-between w-full text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-3 px-0.5">
                          <span>1 giờ</span>
                          <span>8 giờ (TB)</span>
                          <span>16 giờ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Problems */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight text-neutral-900 leading-tight">
                        Bạn gặp vấn đề gì khi làm việc?
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2">Chọn tất cả các vấn đề bạn đang gặp phải</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {PROBLEMS.map((prob) => {
                        const isSelected = formData.problems.includes(prob.id);
                        const Icon = prob.icon;
                        return (
                          <button
                            key={prob.id}
                            onClick={() => toggleMultiple("problems", prob.id)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl border text-left cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isSelected
                              ? "bg-neutral-900 text-white border-neutral-900 shadow-lg"
                              : "bg-neutral-50 text-neutral-700 border-neutral-100 hover:bg-neutral-100 hover:border-neutral-200"
                              }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? "bg-white/15" : "bg-neutral-200/60"
                                }`}
                            >
                              <Icon size={16} weight={isSelected ? "fill" : "regular"} />
                            </div>
                            <span className="text-sm font-bold flex-1">{prob.label}</span>
                            {isSelected && <Check size={14} weight="bold" className="text-neutral-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: Budget */}
                {currentStep === 4 && (
                  <div className="flex flex-col gap-10">
                    <div>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight text-neutral-900 leading-tight">
                        Ngân sách của bạn là bao nhiêu?
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2">Kéo thanh trượt để chọn mức ngân sách dự kiến</p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                      <div className="flex flex-col items-center gap-1">
                        <motion.span
                          key={formData.budget}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="text-5xl font-black text-neutral-900 tabular-nums"
                        >
                          {formData.budget}.000.000
                        </motion.span>
                        <span className="text-base text-neutral-400 font-medium">VND</span>
                      </div>

                      {/* Tier indicator */}
                      <div className="flex gap-2 text-[10px] font-bold tracking-wider uppercase">
                        <span className={`px-3 py-1 rounded-full transition-colors duration-300 ${formData.budget <= 10 ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"}`}>
                          Cơ bản
                        </span>
                        <span className={`px-3 py-1 rounded-full transition-colors duration-300 ${formData.budget > 10 && formData.budget <= 20 ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"}`}>
                          Tiêu chuẩn
                        </span>
                        <span className={`px-3 py-1 rounded-full transition-colors duration-300 ${formData.budget > 20 ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"}`}>
                          Premium
                        </span>
                      </div>

                      <div className="w-full max-w-md">
                        <input
                          type="range"
                          min="5"
                          max="30"
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, budget: parseInt(e.target.value) }))
                          }
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                        />
                        <div className="flex justify-between w-full text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-3 px-0.5">
                          <span>5 triệu</span>
                          <span>15 triệu</span>
                          <span>30+ triệu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Current Equipment */}
                {currentStep === 5 && (
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight text-neutral-900 leading-tight">
                        Thiết bị bạn đang dùng?
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2">Chọn tất cả thiết bị hiện có trên bàn làm việc</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {EQUIPMENT.map((equip) => {
                        const isSelected = formData.equipment.includes(equip.id);
                        const Icon = equip.icon;
                        return (
                          <button
                            key={equip.id}
                            onClick={() => toggleMultiple("equipment", equip.id)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl border text-left cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isSelected
                              ? "bg-neutral-900 text-white border-neutral-900 shadow-lg"
                              : "bg-neutral-50 text-neutral-700 border-neutral-100 hover:bg-neutral-100 hover:border-neutral-200"
                              }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? "bg-white/15" : "bg-neutral-200/60"
                                }`}
                            >
                              <Icon size={16} weight={isSelected ? "fill" : "regular"} />
                            </div>
                            <span className="text-sm font-bold flex-1">{equip.label}</span>
                            {isSelected && <Check size={14} weight="bold" className="text-neutral-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* STEP 6: Workspace Style */}
                {currentStep === 6 && (
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight text-neutral-900 leading-tight">
                        Phong cách workspace bạn thích?
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2">Chọn phong cách phù hợp với gu thẩm mỹ của bạn</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {STYLES.map((theme) => {
                        const isSelected = formData.style === theme.id;
                        return (
                          <button
                            key={theme.id}
                            onClick={() => selectSingle("style", theme.id)}
                            className={`group/style relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] aspect-[3/4] flex flex-col justify-end ${isSelected
                              ? "border-neutral-900 ring-2 ring-neutral-900 shadow-xl scale-[1.02]"
                              : "border-neutral-100 hover:border-neutral-300 hover:shadow-md"
                              }`}
                          >
                            <img
                              src={theme.image}
                              alt={theme.label}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/style:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="relative z-10 p-4 flex flex-col gap-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                                {theme.id}
                              </span>
                              <span className="font-bold text-sm text-white">{theme.label}</span>
                              <span className="text-[11px] text-white/55">{theme.desc}</span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center z-20">
                                <Check size={12} weight="bold" className="text-neutral-900" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 6: Favorite Color */}
                {currentStep === 7 && (
                  <div className="flex flex-col gap-10">
                    <div>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight text-neutral-900 leading-tight">
                        Tông màu setup yêu thích?
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2">Chọn tông màu chủ đạo cho không gian làm việc</p>
                    </div>
                    <div className="flex justify-center gap-10 sm:gap-14">
                      {[
                        { id: "White", label: "Trắng tinh", bg: "bg-white", border: "border-neutral-200", checkColor: "text-neutral-900" },
                        { id: "Black", label: "Đen mờ", bg: "bg-[#151515]", border: "border-[#151515]", checkColor: "text-white" },
                        { id: "Titanium", label: "Xám Titan", bg: "bg-[#71717A]", border: "border-[#71717A]", checkColor: "text-white" },
                      ].map((color) => {
                        const isSelected = formData.color === color.id;
                        return (
                          <button
                            key={color.id}
                            onClick={() => selectSingle("color", color.id)}
                            className="flex flex-col items-center gap-4 group cursor-pointer"
                          >
                            <div
                              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center ${color.bg} ${color.border} ${isSelected
                                ? "ring-4 ring-offset-4 ring-neutral-900 scale-110"
                                : "scale-100 group-hover:scale-105"
                                }`}
                            >
                              {isSelected && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                                  <Check size={24} weight="bold" className={color.checkColor} />
                                </motion.div>
                              )}
                            </div>
                            <span
                              className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${isSelected ? "text-neutral-900" : "text-neutral-400 group-hover:text-neutral-700"
                                }`}
                            >
                              {color.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}



                {/* STEP 8: Upload Workspace */}
                {currentStep === 8 && (
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight text-neutral-900 leading-tight">
                        Upload ảnh workspace
                      </h2>
                      <p className="text-neutral-500 text-sm mt-2">
                        (Tuỳ chọn) AI Vision sẽ phân tích tư thế và đề xuất cải thiện workspace cá nhân hoá.
                      </p>
                    </div>

                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-[220px] ${dragActive
                        ? "border-neutral-900 bg-neutral-900/5 scale-[1.01]"
                        : formData.photo
                          ? "border-neutral-900 bg-neutral-50"
                          : "border-neutral-200 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100"
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
                          <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center">
                            <Check size={22} weight="bold" className="text-white" />
                          </div>
                          <span className="text-sm font-bold text-neutral-900 text-center uppercase tracking-wider">
                            Upload thành công
                          </span>
                          <span className="text-xs text-neutral-500 max-w-[220px] truncate text-center">
                            {formData.photo.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <CloudArrowUp size={40} className="text-neutral-400" />
                          <span className="text-sm font-bold text-neutral-700 text-center">
                            Kéo thả hoặc nhấn để tải ảnh lên
                          </span>
                          <span className="text-xs text-neutral-400 text-center">
                            Hỗ trợ PNG, JPG, HEIC
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-neutral-400">
                      <Shield size={13} weight="bold" className="text-neutral-500" />
                      <span>Ảnh được xử lý riêng tư, không lưu trữ trên server</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom navigation */}
          <div className="flex items-center justify-between mt-8 pt-6">


            {/* "Next" button for steps that don't auto-advance */}
            {[2, 3, 4, 5, 8].includes(currentStep) && (
              <button
                onClick={nextStep}
                className="group/next inline-flex items-center gap-2.5 bg-neutral-900 text-white font-bold text-sm px-7 py-3.5 rounded-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-neutral-800 active:scale-[0.97] shadow-lg ml-auto"
              >
                <span>{currentStep === STEPS_COUNT ? "Phân tích" : "Tiếp tục"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
