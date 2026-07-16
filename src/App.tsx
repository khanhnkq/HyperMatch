import { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import FeatureBanners from "./components/FeatureBanners.tsx";
import AIAdvisorIntro from "./components/AIAdvisorIntro.tsx";
import NewArrivals from "./components/NewArrivals.tsx";
import UserCommunity from "./components/UserCommunity.tsx";
import PromoBanners from "./components/PromoBanners.tsx";
import OnboardingFlow from "./components/OnboardingFlow.tsx";
import AIProcessing from "./components/AIProcessing.tsx";
import ProductCategories from "./components/ProductCategories.tsx";
import BlogPosts from "./components/BlogPosts.tsx";
import LogoMarquee from "./components/LogoMarquee.tsx";
import FAQSection from "./components/FAQSection.tsx";
import WorkspaceResult from "./components/WorkspaceResult.tsx";
import Footer from "./components/Footer.tsx";

type ViewState = "landing" | "onboarding" | "processing" | "result";

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

export default function App() {
  const [view, setView] = useState<ViewState>("landing");

  useEffect(() => {
    const checkHashRoute = () => {
      if (window.location.hash === "#test-processing") {
        setView("processing");
      }
    };
    checkHashRoute();
    window.addEventListener("hashchange", checkHashRoute);
    return () => window.removeEventListener("hashchange", checkHashRoute);
  }, []);
  const [formData, setFormData] = useState<OnboardingData>({
    role: "Software Engineer",
    hours: 8,
    problems: ["Neck pain", "Cable clutter"],
    budget: 15,
    style: "Modern",
    color: "Black",
    equipment: ["Monitor", "Mechanical Keyboard"],
    photo: null,
  });

  const startOnboarding = () => {
    setView("onboarding");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setFormData(data);
    setView("processing");
  };

  const handleProcessingFinished = () => {
    setView("result");
  };

  return (
    <div className="font-sans min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      {/* 1. Landing View */}
      {view === "landing" && (
        <>
          <Header onStartAdvisor={startOnboarding} />
          <main className="flex-grow">
            <Hero onStartAdvisor={startOnboarding} />
            <FeatureBanners />
            <AIAdvisorIntro onStartAdvisor={startOnboarding} />
            <PromoBanners onStartAdvisor={startOnboarding} />
            <ProductCategories />
            <NewArrivals />
            <UserCommunity />
            <LogoMarquee />
            <BlogPosts />
            <FAQSection />
          </main>
          <Footer />
        </>
      )}

      {/* 2. Onboarding View — Header visible for brand context */}
      {view === "onboarding" && (
        <>
          <Header onStartAdvisor={startOnboarding} alwaysSolid />
          <OnboardingFlow
            onBackToLanding={() => setView("landing")}
            onComplete={handleOnboardingComplete}
          />
        </>
      )}

      {/* 3. AI Processing Screen — full-screen dark visual */}
      {view === "processing" && (
        <AIProcessing onFinished={handleProcessingFinished} />
      )}

      {/* 4. Results Screen */}
      {view === "result" && (
        <>
          <Header onStartAdvisor={startOnboarding} alwaysSolid />
          <main className="flex-grow">
            <WorkspaceResult
              data={formData}
              onRestart={() => setView("landing")}
            />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

