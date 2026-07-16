import React, { useState } from "react";
import { Screen } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, Cpu, Globe, CheckCircle2 } from "lucide-react";

export default function App() {
  const [currentScreen, setScreen] = useState<Screen>("home");

  // Document Modal States
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [docContent, setDocContent] = useState("");

  // Case Studies Modal States
  const [isCaseStudiesModalOpen, setIsCaseStudiesModalOpen] = useState(false);

  const openDocModal = (title: string, content: string) => {
    setDocTitle(title);
    setDocContent(content);
    setIsDocModalOpen(true);
  };

  const caseStudies = [
    {
      title: "ScaleAI Enterprise Workflow Hub",
      category: "AI Automation",
      metric: "65% Process Cost Cut",
      details:
        "Engineered an end-to-end multi-agent AI system that automates procurement auditing, resulting in zero compliance leaks and cutting manual processing time from days to minutes.",
      icon: Cpu,
    },
    {
      title: "Fintech Cloud Brokerage Portal",
      category: "Web Development",
      metric: "99.99% Guaranteed Uptime",
      details:
        "Developed a modern web terminal for high-frequency commodities trading, leveraging server-side cache optimization and distributed rendering techniques to maximize scalability.",
      icon: Globe,
    },
    {
      title: "TargetAd Intelligent Acquisition Optimizer",
      category: "Ad Management",
      metric: "410% Ad ROI Improvement",
      details:
        "Leveraged predictive machine learning algorithms to audit, re-target, and optimize digital marketing spending, resulting in $2.4M incremental revenue inside two quarters.",
      icon: TrendingUp,
    },
  ];

  const changeScreen = (screen: Screen) => {
    setScreen(screen);
    const element = document.getElementById(screen);
    if (element) {
      // Find offset to account for sticky header
      const yOffset = -80; // 80px for the sticky header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // triggers when section is near the middle of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setScreen(entry.target.id as Screen);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ["home", "services", "about", "contact"];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary/10 scroll-smooth">
      {/* Dynamic Navigation Header */}
      <Header currentScreen={currentScreen} setScreen={changeScreen} />

      {/* Floating Side Dot Navigator ("side scrolling" indicator) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 bg-surface-container-lowest/80 backdrop-blur-md py-5 px-3 rounded-full border border-outline-variant shadow-lg">
        {([
          { id: "home", label: "Home" },
          { id: "services", label: "Services" },
          { id: "about", label: "About" },
          { id: "contact", label: "Contact" },
        ] as const).map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => changeScreen(item.id)}
              className="group relative flex items-center justify-center w-3 h-3 cursor-pointer"
              aria-label={`Scroll to ${item.label}`}
            >
              {/* Tooltip */}
              <span className="absolute right-8 px-2.5 py-1 rounded bg-on-surface text-surface text-[10px] font-sans font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-md translate-x-2 group-hover:translate-x-0">
                {item.label}
              </span>
              
              {/* Animated Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.3 : 0.8,
                  backgroundColor: isActive ? "var(--color-primary)" : "var(--color-outline-variant)",
                }}
                className="w-2.5 h-2.5 rounded-full hover:bg-primary/70 transition-colors"
              />
            </button>
          );
        })}
      </nav>

      {/* Main Single-Page Scroll Flow */}
      <main className="flex-grow flex flex-col">
        <div id="home" className="scroll-mt-20">
          <HomeView setScreen={changeScreen} />
        </div>
        <div id="services" className="scroll-mt-20 border-t border-outline-variant/20">
          <ServicesView
            setScreen={changeScreen}
            openCaseStudies={() => setIsCaseStudiesModalOpen(true)}
          />
        </div>
        <div id="about" className="scroll-mt-20 border-t border-outline-variant/20">
          <AboutView setScreen={changeScreen} />
        </div>
        <div id="contact" className="scroll-mt-20 border-t border-outline-variant/20">
          <ContactView />
        </div>
      </main>

      {/* Global Footer */}
      <Footer setScreen={changeScreen} openModal={openDocModal} />

      {/* Dynamic Legal Document Modal (Privacy Policy / Terms) */}
      <AnimatePresence>
        {isDocModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDocModalOpen(false)}
              className="fixed inset-0 bg-on-surface"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative bg-surface-container-lowest rounded-xl max-w-2xl w-full p-8 shadow-2xl z-10 border border-outline-variant text-left"
            >
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="absolute top-4 right-4 text-secondary hover:text-on-surface p-2 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <h3 className="font-sans font-bold text-2xl text-on-surface mb-6">
                {docTitle}
              </h3>
              
              <div className="font-sans text-sm sm:text-base text-secondary leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <p>{docContent}</p>
                <p>
                  If you have any further questions or require customized integration agreements, please reach out to our team directly at{" "}
                  <span className="font-semibold text-primary">prakashinfotech356@gmail.com</span>. We provide corporate audits and tailored SLA frameworks for modern enterprises.
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setIsDocModalOpen(false)}
                  className="bg-primary hover:bg-primary-container text-on-primary font-sans font-semibold text-sm tracking-wide py-2.5 px-6 rounded-lg transition-all"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* High-Fidelity Case Studies Modal */}
      <AnimatePresence>
        {isCaseStudiesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCaseStudiesModalOpen(false)}
              className="fixed inset-0 bg-on-surface"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative bg-surface-container-lowest rounded-2xl max-w-3xl w-full p-8 shadow-2xl z-10 border border-outline-variant text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsCaseStudiesModalOpen(false)}
                className="absolute top-6 right-6 text-secondary hover:text-on-surface p-2 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-on-surface mb-2">
                  Enterprise Case Studies
                </h3>
                <p className="font-sans text-sm text-secondary leading-relaxed">
                  Real-world metrics and solutions engineered by Prakash Info Tech.
                </p>
              </div>

              <div className="space-y-6">
                {caseStudies.map((study) => {
                  const IconComponent = study.icon;
                  return (
                    <div
                      key={study.title}
                      className="border border-outline-variant rounded-xl p-6 bg-surface-container-low flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                    >
                      <div className="flex gap-4 items-start sm:items-center">
                        <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center shrink-0">
                          <IconComponent size={20} />
                        </div>
                        <div className="text-left">
                          <span className="font-sans font-bold text-[10px] tracking-widest text-primary uppercase block mb-1">
                            {study.category}
                          </span>
                          <h4 className="font-sans font-bold text-base sm:text-lg text-on-surface leading-tight">
                            {study.title}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-secondary mt-2 max-w-md leading-relaxed">
                            {study.details}
                          </p>
                        </div>
                      </div>

                      {/* Results Metric Chip - Primary blue background, white text */}
                      <div className="bg-primary text-on-primary text-xs font-sans font-bold tracking-wider py-2 px-4 rounded-full shadow-[0_4px_12px_rgba(0,40,142,0.12)] uppercase whitespace-nowrap self-start sm:self-center">
                        {study.metric}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setIsCaseStudiesModalOpen(false)}
                  className="font-sans font-semibold text-sm py-2.5 px-6 border border-outline rounded-lg text-secondary hover:text-on-surface transition-colors"
                >
                  Close Showcase
                </button>
                <button
                  onClick={() => {
                    setIsCaseStudiesModalOpen(false);
                    changeScreen("contact");
                  }}
                  className="bg-primary hover:bg-primary-container text-on-primary font-sans font-semibold text-sm tracking-wide py-2.5 px-6 rounded-lg transition-all"
                >
                  Schedule consultation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
