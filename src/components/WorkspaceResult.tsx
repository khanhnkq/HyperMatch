import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Sparkle, 
  Check, 
  Plus, 
  Trash, 
  ShareNetwork, 
  Heart, 
  Warning,
  Lightbulb
} from "@phosphor-icons/react";
import productsData from "../data/products.json";

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

interface WorkspaceResultProps {
  data: OnboardingData;
  onRestart: () => void;
}

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  collection_handle?: string;
  images: { src: string }[];
  variants: { price: string; title: string; sku: string; available: boolean }[];
}

export default function WorkspaceResult({ data, onRestart }: WorkspaceResultProps) {
  // Budget Optimizer slider state (in Millions VND)
  const [budgetLimit, setBudgetLimit] = useState(data.budget);
  
  // Selected products state
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  
  // Hotspot details modal/overlay state
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Before/After slider position (0 to 100 percent)
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef(false);

  // Process and group real Shopify products from JSON
  const shopifyProducts: ShopifyProduct[] = productsData.products as ShopifyProduct[];

  // Normalize/extract matching items from the actual catalog
  const chairs = shopifyProducts.filter(p => p.collection_handle === "ghe");
  const desks = shopifyProducts.filter(p => p.collection_handle === "ban-1");
  const armsSingle = shopifyProducts.filter(p => p.collection_handle === "arm-don");
  const armsDouble = shopifyProducts.filter(p => p.collection_handle === "arm-doi");
  const accessories = shopifyProducts.filter(p => ["gia-do"].includes(p.collection_handle || "") && !p.title.includes("Giá đỡ màn hình"));

  // Generate recommendation list dynamically based on user context
  const getWorkspaceRecommendations = (): any[] => {
    const list: any[] = [];

    // 1. Select Chair based on posture/hours
    if (chairs.length > 0) {
      let chosenChair = chairs[0]; // Airy OC02
      if (data.budget > 20) {
        chosenChair = chairs.find(c => c.handle.includes("sleek")) || chairs[3];
      } else if (data.budget < 12) {
        chosenChair = chairs.find(c => c.handle.includes("cloud")) || chairs[2];
      }
      
      list.push({
        id: `chair-${chosenChair.id}`,
        dbId: chosenChair.id.toString(),
        name: chosenChair.title,
        category: "Ergonomic Chair",
        price: parseInt(chosenChair.variants[0].price),
        image: chosenChair.images[0]?.src || "/hero_chair.png",
        matchReason: data.problems.includes("Back pain") 
          ? "Highly recommended for lumbar relief and daily sitting sessions exceeding 6+ hours."
          : "Ensures orthopedically healthy upright work posture.",
        impact: "+25% Spinal Relief",
        scoreValue: 25,
        tag: "Core Comfort"
      });
    }

    // 2. Select Standing Desk
    if (desks.length > 0) {
      let chosenDesk = desks[2]; // Active DP03
      if (data.budget > 25) {
        chosenDesk = desks.find(d => d.handle.includes("atlas-elite")) || desks[4];
      } else if (data.budget < 15) {
        chosenDesk = desks.find(d => d.handle.includes("core-desk")) || desks[6];
      }

      list.push({
        id: `desk-${chosenDesk.id}`,
        dbId: chosenDesk.id.toString(),
        name: chosenDesk.title,
        category: "Adjustable Desk",
        price: parseInt(chosenDesk.variants[0].price),
        image: chosenDesk.images[0]?.src || "/workspace_after.png",
        matchReason: "Alternating sitting and standing reduces overall fatigue and core stiffness.",
        impact: "+20% Physical Activity",
        scoreValue: 25,
        tag: "Workspace Spine"
      });
    }

    // 3. Select Monitor Arm
    const targetArms = data.equipment.includes("Monitor") && data.equipment.length > 1 ? armsDouble : armsSingle;
    const pool = targetArms.length > 0 ? targetArms : armsSingle;
    
    if (pool.length > 0) {
      let chosenArm = pool[0];
      if (data.budget > 22 && pool.length > 3) {
        chosenArm = pool.find(a => a.handle.includes("t9-pro-iii") || a.handle.includes("visionx")) || pool[3];
      }

      list.push({
        id: `arm-${chosenArm.id}`,
        dbId: chosenArm.id.toString(),
        name: chosenArm.title,
        category: "Monitor Arm",
        price: parseInt(chosenArm.variants[0].price),
        image: chosenArm.images[0]?.src || "/monitor_arm.png",
        matchReason: data.problems.includes("Neck pain")
          ? "Corrects text-neck. Suspends monitors exactly at eye level."
          : "Reclaims workspace surface and allows flexible monitor rotation.",
        impact: "+15% Neck Ergonomics",
        scoreValue: 20,
        tag: "Ergonomics"
      });
    }

    // 4. Select accessories
    if (accessories.length > 0) {
      const l1 = accessories.find(a => a.handle.includes("l1"));
      if (l1 && data.equipment.includes("Laptop")) {
        list.push({
          id: `accessory-${l1.id}`,
          dbId: l1.id.toString(),
          name: l1.title,
          category: "Laptop Stand",
          price: parseInt(l1.variants[0].price),
          image: l1.images[0]?.src || "",
          matchReason: "Raises laptop screen to eye-level, eliminating desk neck slouch.",
          impact: "+10% Laptop Ergonomics",
          scoreValue: 15,
          tag: "Mobile Ergonomics"
        });
      }

      const m1 = accessories.find(a => a.handle.includes("m1"));
      if (m1 && !data.equipment.includes("Laptop")) {
        list.push({
          id: `accessory-${m1.id}`,
          dbId: m1.id.toString(),
          name: m1.title,
          category: "Tablet/Phone Stand",
          price: parseInt(m1.variants[0].price),
          image: m1.images[0]?.src || "",
          matchReason: "Comfortable viewing angle for mobile devices.",
          impact: "+5% Desk Utility",
          scoreValue: 10,
          tag: "Utility"
        });
      }

      const chromatic = accessories.find(a => a.handle.includes("chromatic"));
      if (chromatic) {
        list.push({
          id: `accessory-${chromatic.id}`,
          dbId: chromatic.id.toString(),
          name: chromatic.title,
          category: "Headphone Stand",
          price: parseInt(chromatic.variants[0].price),
          image: chromatic.images[0]?.src || "",
          matchReason: "Keeps workspace clutter-free, matching the " + data.style + " layout.",
          impact: "+8% Space Efficiency",
          scoreValue: 5,
          tag: "Accessory"
        });
      }
    }

    return list;
  };

  const recommendedItems = getWorkspaceRecommendations();

  // Dynamic initialization of selected product list based on Budget Optimizer
  useEffect(() => {
    let currentTotal = 0;
    const initialSelection: string[] = [];
    const sorted = [...recommendedItems].sort((a, b) => b.scoreValue - a.scoreValue);
    
    for (const item of sorted) {
      if (currentTotal + item.price <= budgetLimit * 1000000) {
        initialSelection.push(item.id);
        currentTotal += item.price;
      }
    }
    
    if (initialSelection.length === 0 && recommendedItems.length > 0) {
      initialSelection.push(recommendedItems[0].id);
    }
    
    setSelectedProductIds(initialSelection);
  }, [budgetLimit]);

  const toggleProductSelection = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalPrice = recommendedItems
    .filter(p => selectedProductIds.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const baseScore = 50;
  const scoreAddition = recommendedItems
    .filter(p => selectedProductIds.includes(p.id))
    .reduce((sum, p) => sum + p.scoreValue, 0);
  const finalScore = Math.min(100, baseScore + scoreAddition);

  const getPersonality = () => {
    const style = data.style || "Minimal";
    const role = data.role || "Software Engineer";
    
    if (style === "Minimal") return "Minimalist Creator";
    if (style === "Dark") return "Stealth Developer";
    if (style === "RGB") return "Hyper Gaming Performer";
    if (style === "Wooden") return "Biophilic Planner";
    return `${style} ${role}`;
  };

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="w-full bg-white text-neutral-900 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* SECTION 1: HEADER & STATS */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-neutral-50 border border-neutral-250 p-8 md:p-12 rounded-brand-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.02)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-xl">
            <div className="flex items-center gap-1.5 text-brand-red font-sans text-[10px] font-bold tracking-widest uppercase">
              <Sparkle size={12} weight="fill" />
              <span>Workspace Advisor Analysis</span>
            </div>
            
            <h2 className="font-display font-black text-4xl md:text-5xl leading-tight tracking-tight text-neutral-900">
              Meet Your Custom Setup.
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Based on your workflow as a <span className="text-neutral-900 font-bold">{data.role || "Professional"}</span> working <span className="text-neutral-900 font-bold">{data.hours} hours daily</span>, we formulated a setup layout addressing your main problems.
            </p>

            <div className="flex flex-wrap gap-3 mt-4 justify-center lg:justify-start">
              <span className="bg-neutral-200 text-neutral-700 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                Style: {getPersonality()}
              </span>
              <span className="bg-neutral-200 text-neutral-700 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                Tone: {data.color || "Walnut"}
              </span>
            </div>
          </div>

          {/* Dynamic Radial Score Component */}
          <div className="flex flex-col sm:flex-row items-center gap-8 bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  className="stroke-neutral-100 fill-transparent"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="54"
                  className="stroke-brand-red fill-transparent"
                  strokeWidth="8"
                  strokeDasharray={339.29}
                  initial={{ strokeDashoffset: 339.29 }}
                  animate={{ strokeDashoffset: 339.29 - (339.29 * finalScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-display text-neutral-900">{finalScore}</span>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Score</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-w-[200px] text-center sm:text-left">
              <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider">Workspace Health</span>
              <h4 className="font-display font-bold text-lg text-neutral-900">Highly Optimized</h4>
              <p className="text-[11px] text-neutral-600 leading-normal">
                {finalScore > 80 
                  ? "Excellent ergonomics. Perfect alignment, reducing neck pressure and wrist fatigue."
                  : "Moderate setup. Add key components below to boost score above 85."}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: AI ERGONOMIC INSIGHTS & ISSUES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-neutral-50 border border-neutral-250 p-8 rounded-brand-card">
            <div className="flex items-center gap-2 mb-6">
              <Warning size={20} className="text-brand-red animate-pulse" />
              <h3 className="font-display font-bold text-xl text-neutral-900">Detected Risks & Issues</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {data.problems.includes("Neck pain") && (
                <div className="flex gap-4 p-4 rounded-xl bg-brand-red/5 border border-brand-red/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-brand-red">Monitor Level Too Low</h5>
                    <p className="text-neutral-600 text-xs leading-relaxed mt-1">
                      Forces forward head posture (text neck), loading up to 27kg of extra strain on your cervical spine.
                    </p>
                  </div>
                </div>
              )}
              {data.problems.includes("Back pain") && (
                <div className="flex gap-4 p-4 rounded-xl bg-brand-red/5 border border-brand-red/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-brand-red">Inadequate Lumbar Support</h5>
                    <p className="text-neutral-600 text-xs leading-relaxed mt-1">
                      Continuous sitting without proper lumbar curve support flattens spinal curvature, generating lower back ache.
                    </p>
                  </div>
                </div>
              )}
              {data.problems.includes("Cable clutter") && (
                <div className="flex gap-4 p-4 rounded-xl bg-brand-red/5 border border-brand-red/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-brand-red">High Visual Noise (Cables)</h5>
                    <p className="text-neutral-600 text-xs leading-relaxed mt-1">
                      Visible cable mess leads to sensory overload and drops daily focus levels by roughly 12-15%.
                    </p>
                  </div>
                </div>
              )}
              {data.problems.length === 0 && (
                <div className="flex gap-4 p-4 rounded-xl bg-white border border-neutral-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">General Posture Strain</h5>
                    <p className="text-neutral-650 text-xs leading-relaxed mt-1">
                      Standard desk setups lack personalized vertical adjustments, putting stress on wrists and neck over time.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-250 p-8 rounded-brand-card">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb size={20} className="text-brand-red" />
              <h3 className="font-display font-bold text-xl text-neutral-900">Suggested Posture Tweaks</h3>
            </div>
            
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex gap-4 p-4 rounded-xl border border-neutral-200 bg-white">
                <span className="text-brand-red font-bold font-mono">01</span>
                <div>
                  <h5 className="font-bold uppercase tracking-wider text-neutral-900">The 90-90-90 Rule</h5>
                  <p className="text-neutral-650 mt-1 leading-relaxed">
                    Adjust chair height so knees, hips, and elbows all form stable 90-degree angles relative to support surfaces.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-xl border border-neutral-200 bg-white">
                <span className="text-brand-red font-bold font-mono">02</span>
                <div>
                  <h5 className="font-bold uppercase tracking-wider text-neutral-900">Screen Distancing</h5>
                  <p className="text-neutral-655 mt-1 leading-relaxed">
                    Place main screen exactly one arm's length away. Top bezel level with resting eye horizontal.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl border border-neutral-200 bg-white">
                <span className="text-brand-red font-bold font-mono">03</span>
                <div>
                  <h5 className="font-bold uppercase tracking-wider text-neutral-900">Dynamic Transitions</h5>
                  <p className="text-neutral-655 mt-1 leading-relaxed">
                    Transition from sitting to standing for 15 minutes every hour to improve blood circulation and core strength.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: BUDGET OPTIMIZER */}
        <div className="bg-neutral-50 border border-neutral-250 p-8 rounded-brand-card">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="font-display font-bold text-xl text-neutral-900">Interactive Budget Optimizer</h3>
              <p className="text-neutral-600 text-xs mt-1">
                Drag the limit to dynamically filter setups and adjust recommend lists.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-4 py-2.5 rounded-lg shadow-sm">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Est. Cost:</span>
              <span className="font-display font-extrabold text-lg text-brand-red flex items-center">
                {totalPrice.toLocaleString("vi-VN")} <span className="text-xs ml-1 text-neutral-500">VND</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 max-w-xl mx-auto w-full mb-4">
            <span className="text-3xl font-extrabold text-neutral-900 font-display">
              {budgetLimit}.000.000 <span className="text-base text-neutral-500 font-normal">VND Limit</span>
            </span>
            <input
              type="range"
              min="5"
              max="30"
              value={budgetLimit}
              onChange={e => setBudgetLimit(parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-red mt-2"
            />
            <div className="flex justify-between w-full text-[10px] font-bold text-neutral-500 uppercase px-1">
              <span>5M VND</span>
              <span>15M VND (Mid range)</span>
              <span>30M+ VND (Pro)</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTERACTIVE PREVIEW & PRODUCTS SELECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Workspace 2D Preview Pane (Col 5) */}
          <div className="lg:col-span-5 bg-neutral-50 border border-neutral-250 rounded-brand-card p-6 flex flex-col justify-between min-h-[450px]">
            <div>
              <h4 className="font-display font-bold text-md text-neutral-900 mb-2">Live Setup Preview</h4>
              <p className="text-neutral-600 text-[11px] leading-relaxed">
                Add or remove components on the interactive virtual desk to preview changes in realtime.
              </p>
            </div>

            {/* Virtual Desk Canvas */}
            <div className="relative flex-grow flex items-center justify-center min-h-[220px] my-6 bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.01)_0%,transparent_60%)] pointer-events-none" />
              
              {/* Isometric Desk Drawing */}
              <div className="relative w-72 h-44 border-b-4 border-amber-800 bg-brand-red/5 rounded-lg flex flex-col justify-end items-center p-2 group transition-all duration-300">
                {/* Desk Wood surface */}
                <div className={`absolute bottom-0 left-0 right-0 h-4 rounded-b-md transition-colors duration-300 ${
                  data.color === "Walnut" ? "bg-amber-900" : data.color === "White" ? "bg-neutral-100" : "bg-neutral-900"
                }`} />

                {/* Standing Legs (if desk is selected) */}
                <div className="absolute -bottom-16 w-full flex justify-between px-10 pointer-events-none">
                  <div className={`w-3 h-16 transition-all ${selectedProductIds.some(id => id.startsWith("desk-")) ? "bg-neutral-600 h-20 -bottom-4" : "bg-neutral-400 h-16"} relative`} />
                  <div className={`w-3 h-16 transition-all ${selectedProductIds.some(id => id.startsWith("desk-")) ? "bg-neutral-600 h-20 -bottom-4" : "bg-neutral-400 h-16"} relative`} />
                </div>

                {/* Dynamic Monitor & Arm */}
                <div className="absolute top-2 w-full flex flex-col items-center justify-start z-10 transition-transform duration-300">
                  {/* Monitor Screen */}
                  <div className={`w-40 h-24 bg-neutral-900 border-2 border-neutral-700 rounded flex items-center justify-center relative shadow-lg ${
                    selectedProductIds.some(id => id.startsWith("arm-")) ? "translate-y-0" : "translate-y-4"
                  } transition-all duration-300`}>
                    <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">HYPERWORK</span>
                  </div>
                  
                  {/* Stand or Arm */}
                  {selectedProductIds.some(id => id.startsWith("arm-")) ? (
                    <div className="w-1.5 h-10 bg-neutral-500 relative flex items-center justify-center">
                      <div className="w-4 h-1 bg-neutral-400 absolute bottom-0" />
                    </div>
                  ) : (
                    <div className="w-3 h-6 bg-neutral-500 relative flex items-center justify-center">
                      <div className="w-10 h-1 bg-neutral-400 absolute bottom-0" />
                    </div>
                  )}
                </div>

                {/* Accessory stand on surface */}
                {selectedProductIds.some(id => id.startsWith("accessory-")) && (
                  <div className="w-10 h-8 bg-neutral-700 border border-neutral-500 rounded-sm mb-4 z-20 flex justify-center items-center shadow-md">
                    <div className="w-8 h-1 bg-white/40 rounded-full" />
                  </div>
                )}

                {/* Ergonomic Chair in front of desk */}
                {selectedProductIds.some(id => id.startsWith("chair-")) ? (
                  <div className="absolute -bottom-8 w-20 h-24 bg-neutral-900 border border-neutral-700 rounded-t-2xl z-30 flex flex-col justify-between items-center p-2 shadow-2xl">
                    <div className="w-10 h-4 bg-neutral-800 border border-neutral-600 rounded-full" />
                    <div className="w-16 h-12 bg-neutral-800 border-x border-neutral-600 rounded-sm flex items-center justify-center">
                      <div className="w-10 h-1 bg-brand-red rounded-full" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute -bottom-6 w-14 h-16 bg-neutral-200 border border-neutral-300 rounded-t-lg z-30 opacity-40" />
                )}

              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-neutral-500 border-t border-neutral-200 pt-4">
                <span>Active Items:</span>
                <span className="text-neutral-900 font-bold">{selectedProductIds.length} / {recommendedItems.length}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Current Rating:</span>
                <span className="text-brand-red font-bold">{finalScore} / 100</span>
              </div>
            </div>
          </div>

          {/* Product Recommendations Selector (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {recommendedItems.map(item => {
              const isSelected = selectedProductIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-brand-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200 ${
                    isSelected ? "border-brand-red bg-brand-red/[0.02]" : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 bg-neutral-50 border border-neutral-200 rounded-xl p-2 shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold text-brand-red uppercase tracking-wider">{item.category}</span>
                        {item.tag && (
                          <span className="bg-neutral-100 text-neutral-600 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full scale-90">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-sm text-neutral-900 leading-snug">{item.name}</h4>
                      <p className="text-neutral-500 text-[11px] leading-relaxed max-w-[40ch]">
                        {item.matchReason}
                      </p>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide flex items-center gap-1">
                        <Check size={12} weight="bold" />
                        {item.impact}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto border-t sm:border-t-0 border-neutral-100 pt-3 sm:pt-0 shrink-0">
                    <div className="flex flex-col sm:items-end">
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Price</span>
                      <span className="font-display font-bold text-sm text-neutral-900">
                        {item.price.toLocaleString("vi-VN")} VND
                      </span>
                    </div>

                    <button
                      onClick={() => toggleProductSelection(item.id)}
                      className={`flex items-center gap-1 text-xs font-bold tracking-wide uppercase px-4 py-2 rounded-full cursor-pointer transition-colors duration-150 ${
                        isSelected 
                          ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300" 
                          : "bg-neutral-900 hover:bg-black text-white"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Trash size={12} weight="bold" />
                          <span>Remove</span>
                        </>
                      ) : (
                        <>
                          <Plus size={12} weight="bold" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* SECTION 5: AI VISION ANALYSIS (Only shown if user uploaded a workspace photo) */}
        {data.photo && (
          <div className="bg-neutral-50 border border-neutral-250 p-8 rounded-brand-card flex flex-col gap-8">
            <div className="text-center md:text-left">
              <span className="text-brand-red font-sans text-[10px] font-bold tracking-widest uppercase">AI Vision Module</span>
              <h3 className="font-display font-bold text-2xl text-neutral-900 mt-1">AI Posture & Space Diagnostics</h3>
              <p className="text-neutral-600 text-xs mt-1">
                We analyzed your uploaded photograph. Hover over the pulsing markers to inspect detected ergonomic issues.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              {/* Photo Container with Hotspots Overlay */}
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-xl overflow-hidden border border-neutral-200 bg-white">
                <img
                  src="/workspace_before.png"
                  alt="Uploaded user workspace"
                  className="w-full h-full object-cover filter brightness-95"
                />

                {/* Hotspot 1: Neck Pain (Monitor Height) */}
                <div className="absolute top-[48%] left-[45%]">
                  <button
                    onClick={() => setActiveHotspot("monitor")}
                    className="w-8 h-8 rounded-full bg-brand-red/35 flex items-center justify-center animate-pulse border-2 border-brand-red focus:outline-none cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                  </button>
                  {activeHotspot === "monitor" && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-48 bg-white border border-neutral-200 rounded-lg p-3 text-xs z-50 shadow-2xl">
                      <h5 className="font-bold text-brand-red mb-1 uppercase tracking-wide text-[9px]">Monitor too low</h5>
                      <p className="text-neutral-600 text-[10px] leading-normal">
                        Screen height forces neck forward, causing muscle tension. Add a monitor arm.
                      </p>
                    </div>
                  )}
                </div>

                {/* Hotspot 2: Cable Clutter */}
                <div className="absolute top-[30%] left-[58%]">
                  <button
                    onClick={() => setActiveHotspot("cables")}
                    className="w-8 h-8 rounded-full bg-brand-red/35 flex items-center justify-center animate-pulse border-2 border-brand-red focus:outline-none cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                  </button>
                  {activeHotspot === "cables" && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-48 bg-white border border-neutral-200 rounded-lg p-3 text-xs z-50 shadow-2xl">
                      <h5 className="font-bold text-brand-red mb-1 uppercase tracking-wide text-[9px]">Cable clutter</h5>
                      <p className="text-neutral-600 text-[10px] leading-normal">
                        Messy layout increases stress levels. Use desk pegboards and sleeves.
                      </p>
                    </div>
                  )}
                </div>

                {/* Hotspot 3: Lighting */}
                <div className="absolute top-[28%] left-[78%]">
                  <button
                    onClick={() => setActiveHotspot("lighting")}
                    className="w-8 h-8 rounded-full bg-brand-red/35 flex items-center justify-center animate-pulse border-2 border-brand-red focus:outline-none cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                  </button>
                  {activeHotspot === "lighting" && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-48 bg-white border border-neutral-200 rounded-lg p-3 text-xs z-50 shadow-2xl">
                      <h5 className="font-bold text-brand-red mb-1 uppercase tracking-wide text-[9px]">Unbalanced light</h5>
                      <p className="text-neutral-600 text-[10px] leading-normal">
                        Harsh side bulb causes visual glare. Mount an asymmetric desk lightbar.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Before/After Interactive Comparison Slider */}
              <div className="flex flex-col gap-4">
                <div className="text-center lg:text-left">
                  <h4 className="font-display font-bold text-lg text-neutral-900">Before vs After Render</h4>
                  <p className="text-neutral-500 text-xs mt-1">
                    Drag the slider to view the transformation from your current room to your optimized workspace.
                  </p>
                </div>

                {/* Slider Container */}
                <div
                  ref={sliderContainerRef}
                  onMouseMove={(e) => isDraggingSlider.current && handleSliderMove(e.clientX)}
                  onTouchMove={handleTouchMove}
                  onMouseDown={() => { isDraggingSlider.current = true; }}
                  onMouseUp={() => { isDraggingSlider.current = false; }}
                  onMouseLeave={() => { isDraggingSlider.current = false; }}
                  className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-200 cursor-ew-resize select-none bg-neutral-100 max-w-md mx-auto"
                >
                  <img
                    src="/workspace_after.png"
                    alt="After optimized setup"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />

                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src="/workspace_before.png"
                      alt="Before messy setup"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      style={{ width: sliderContainerRef.current?.getBoundingClientRect().width || 448, maxWidth: "none" }}
                    />
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-neutral-400 z-40 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-xl flex items-center justify-center border border-neutral-200">
                      <span className="text-[10px] font-bold text-neutral-700 leading-none">↔</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase px-1 max-w-md mx-auto w-full">
                  <span>Before (Cluttered)</span>
                  <span>Drag Handle</span>
                  <span>After (Optimized)</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 6: ACTIONS */}
        <div className="border-t border-neutral-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onRestart}
            className="text-neutral-550 hover:text-black font-sans text-xs font-bold tracking-wider uppercase cursor-pointer py-2 transition-colors duration-150"
          >
            Restart Advisor
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => alert("Setup share link copied to clipboard!")}
              className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 font-sans text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-full cursor-pointer transition-colors duration-150 active:scale-98"
            >
              <ShareNetwork size={14} weight="bold" />
              <span>Share Setup</span>
            </button>
            
            <button
              onClick={() => alert("Items added to HyperWork wishlist!")}
              className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-full cursor-pointer transition-colors duration-150 active:scale-98 animate-pulse hover:animate-none"
            >
              <Heart size={14} weight="fill" />
              <span>Add to Wishlist</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
