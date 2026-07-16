import React from "react";
import { Screen } from "../types";
import {
  Layout,
  Brush,
  Bot,
  Video,
  Mic,
  Megaphone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

interface ServicesViewProps {
  setScreen: (screen: Screen) => void;
  openCaseStudies: () => void;
}

export default function ServicesView({ setScreen, openCaseStudies }: ServicesViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 22 },
    },
  };

  const services = [
    {
      id: "web",
      title: "Website Making",
      description:
        "Custom, high-performance websites engineered for speed, security, and scalability. We build robust digital infrastructures that reflect your brand's authority.",
      icon: Layout,
    },
    {
      id: "logo",
      title: "Logo Making",
      description:
        "Strategic brand identity design. We create distinct, memorable logos that visually communicate your enterprise's core values and professional standing.",
      icon: Brush,
    },
    {
      id: "ai",
      title: "AI Automation",
      description:
        "Process optimization through intelligent automation. Streamline operations, reduce manual overhead, and enhance efficiency with tailored AI solutions.",
      icon: Bot,
    },
    {
      id: "edit",
      title: "Editing",
      description:
        "Professional video and content editing. Refine your corporate communications with precise, high-quality post-production services.",
      icon: Video,
    },
    {
      id: "voice",
      title: "AI Voice Agent",
      description:
        "Advanced conversational AI agents. Deploy sophisticated, natural-sounding automated voice interfaces for customer support and engagement.",
      icon: Mic,
    },
    {
      id: "ads",
      title: "Run Ads",
      description:
        "High-ROI ad management. Strategic, data-driven digital advertising campaigns optimized for maximum reach and conversion.",
      icon: Megaphone,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-grow flex flex-col pt-20"
    >
      {/* Services Hero Section */}
      <section className="relative w-full py-20 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle mesh/spotlight background */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-primary/3 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-fixed/50 to-transparent pointer-events-none rounded-3xl" 
        />

        <div className="relative z-10 max-w-4xl">
          <motion.h1
            variants={itemVariants}
            className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-on-background tracking-tight leading-none mb-6"
          >
            Expert Digital Services <br />
            for <span className="text-primary">Modern Enterprises</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg md:text-xl text-secondary max-w-3xl leading-relaxed mb-6"
          >
            We deliver high-end technical solutions designed to establish authority
            and drive measurable results. From bespoke web infrastructure to
            advanced AI automation, our expertise is your competitive advantage.
          </motion.p>
        </div>
      </section>

      {/* Services Cards Grid */}
      <section className="w-full pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const IconComponent = svc.icon;
            return (
              <motion.div
                key={svc.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  borderColor: "var(--color-primary)",
                  boxShadow: "0 20px 40px rgba(0,40,142,0.06)" 
                }}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 transition-all duration-300 flex flex-col h-full group cursor-pointer"
                onClick={() => setScreen("contact")}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary-fixed group-hover:text-on-primary-fixed transition-colors duration-300"
                >
                  <IconComponent size={22} />
                </motion.div>
                <h3 className="font-sans font-bold text-xl text-on-surface mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {svc.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed flex-grow">
                  {svc.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-primary font-sans font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Enquire Now</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 px-6 border-t border-outline-variant bg-surface-container-low flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-on-background tracking-tight mb-4"
          >
            Ready to Optimize Your Digital Presence?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-sans text-base text-secondary mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Contact us today to discuss how our specialized services can integrate
            into your business strategy.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              onClick={() => setScreen("contact")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-primary-container text-on-primary font-sans font-semibold text-sm tracking-wide py-4 px-8 rounded-lg transition-all shadow-[0_10px_30px_rgba(0,40,142,0.12)] hover:shadow-[0_15px_35px_rgba(0,40,142,0.2)] cursor-pointer"
            >
              Schedule Consultation
            </motion.button>
            <motion.button
              onClick={openCaseStudies}
              whileHover={{ scale: 1.03, y: -2, backgroundColor: "var(--color-surface-container-high)" }}
              whileTap={{ scale: 0.98 }}
              className="border border-primary text-primary font-sans font-semibold text-sm tracking-wide py-4 px-8 rounded-lg transition-all cursor-pointer"
            >
              View Case Studies
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
