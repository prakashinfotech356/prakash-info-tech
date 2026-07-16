import React from "react";
import { Screen } from "../types";
import { Terminal, Bot, LineChart, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  setScreen: (screen: Screen) => void;
}

export default function HomeView({ setScreen }: HomeViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1.2, ease: "easeOut", delay: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-grow flex flex-col pt-20"
    >
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
        {/* Animated background pulse/glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-primary/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-fixed to-transparent pointer-events-none rounded-3xl"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start text-left">
          <motion.h1
            variants={itemVariants}
            className="font-sans font-bold tracking-tight text-on-background text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl max-w-4xl leading-tight mb-6"
          >
            Senior Expert Solutions for <br />
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-primary inline-block"
            >
              Modern Businesses
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mb-10"
          >
            Delivering high-end web development, advanced AI automation, and strategic
            ad management to scale your enterprise with precision and reliability.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button
              onClick={() => setScreen("contact")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-primary-container text-on-primary font-sans font-semibold text-sm tracking-wide py-4 px-8 rounded-lg transition-all shadow-[0_10px_30px_rgba(0,40,142,0.12)] hover:shadow-[0_15px_35px_rgba(0,40,142,0.2)] text-center cursor-pointer"
            >
              Get Started
            </motion.button>
            <motion.button
              onClick={() => setScreen("services")}
              whileHover={{ scale: 1.03, y: -2, backgroundColor: "var(--color-surface-container-low)" }}
              whileTap={{ scale: 0.98 }}
              className="border border-outline hover:border-primary text-primary font-sans font-semibold text-sm tracking-wide py-4 px-8 rounded-lg transition-all text-center cursor-pointer"
            >
              View Services
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Core Expertise Section */}
      <section className="w-full py-16 md:py-24 px-6 bg-surface-container-lowest border-t border-b border-outline-variant">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-12">
            <motion.h2
              variants={itemVariants}
              className="font-sans font-bold text-2xl sm:text-3xl text-on-surface tracking-tight mb-2"
            >
              Core Expertise
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="font-sans text-sm sm:text-base text-secondary max-w-2xl leading-relaxed"
            >
              Structural integrity and technical precision across three core pillars.
            </motion.p>

            {/* Glowing Accent Bar - Animated width */}
            <div className="w-full overflow-hidden mt-6">
              <motion.div
                variants={lineVariants}
                className="h-1 bg-gradient-to-r from-primary/60 via-primary/10 to-transparent rounded-full shadow-[0_4px_12px_rgba(0,40,142,0.1)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Web Development */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                borderColor: "var(--color-primary)",
                boxShadow: "0 20px 40px rgba(0,40,142,0.08)"
              }}
              className="bg-background border border-outline-variant rounded-xl p-8 transition-all duration-300 flex flex-col h-full group cursor-pointer"
              onClick={() => setScreen("services")}
            >
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary-fixed group-hover:text-on-primary-fixed transition-colors duration-300"
              >
                <Terminal size={22} />
              </motion.div>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-on-surface mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                Web Development
              </h3>
              <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed flex-grow">
                High-performance, scalable web architectures built with modern
                frameworks to ensure reliability and speed for enterprise applications.
              </p>
            </motion.div>

            {/* Column 2: AI Automation */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                borderColor: "var(--color-primary)",
                boxShadow: "0 20px 40px rgba(0,40,142,0.08)"
              }}
              className="bg-background border border-outline-variant rounded-xl p-8 transition-all duration-300 flex flex-col h-full group cursor-pointer"
              onClick={() => setScreen("services")}
            >
              <motion.div 
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary-fixed group-hover:text-on-primary-fixed transition-colors duration-300"
              >
                <Bot size={22} />
              </motion.div>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-on-surface mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                AI Automation
              </h3>
              <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed flex-grow">
                Intelligent workflow automation and bespoke AI integrations that reduce
                operational overhead and drive data-backed decision making.
              </p>
            </motion.div>

            {/* Column 3: Ad Management */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                borderColor: "var(--color-primary)",
                boxShadow: "0 20px 40px rgba(0,40,142,0.08)"
              }}
              className="bg-background border border-outline-variant rounded-xl p-8 transition-all duration-300 flex flex-col h-full group cursor-pointer"
              onClick={() => setScreen("services")}
            >
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary-fixed group-hover:text-on-primary-fixed transition-colors duration-300"
              >
                <LineChart size={22} />
              </motion.div>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-on-surface mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                Ad Management
              </h3>
              <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed flex-grow">
                Precision-targeted ad campaigns leveraging analytics and machine learning
                to maximize ROI across key digital acquisition channels.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
