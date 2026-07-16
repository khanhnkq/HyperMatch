import { useState } from "react";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import FeatureBanners from "./components/FeatureBanners.tsx";
import NewArrivals from "./components/NewArrivals.tsx";
import UserCommunity from "./components/UserCommunity.tsx";
import PromoBanners from "./components/PromoBanners.tsx";
import AdvisorOnboarding from "./components/AdvisorOnboarding.tsx";
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
            <PromoBanners />
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

      {/* 2. Onboarding View */}
      {view === "onboarding" && (
        <AdvisorOnboarding
          onBackToLanding={() => setView("landing")}
          onComplete={handleOnboardingComplete}
        />
      )}

      {/* 3. AI Processing Screen */}
      {view === "processing" && (
        <AIProcessing onFinished={handleProcessingFinished} />
      )}

      {/* 4. Results Screen */}
      {view === "result" && (
        <>
          <Header onStartAdvisor={startOnboarding} />
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
