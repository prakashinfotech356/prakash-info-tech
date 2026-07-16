import React from "react";
import { Screen } from "../types";
import { CheckCircle2, Target, Users, Shield, Award } from "lucide-react";
import { motion } from "motion/react";

interface AboutViewProps {
  setScreen: (screen: Screen) => void;
}

export default function AboutView({ setScreen }: AboutViewProps) {
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

  const philosophyCards = [
    {
      title: "UNCOMPROMISING QUALITY",
      description:
        "We deliver high-end digital solutions characterized by meticulous attention to detail and rigorous testing protocols.",
      icon: CheckCircle2,
    },
    {
      title: "TECHNICAL PRECISION",
      description:
        "Leveraging deep expertise in AI automation and ad management to build performant, efficient systems.",
      icon: Target,
    },
    {
      title: "USER-CENTRIC FOCUS",
      description:
        "Complex technologies are distilled into intuitive, user-friendly interfaces that empower end-users.",
      icon: Users,
    },
    {
      title: "ABSOLUTE RELIABILITY",
      description:
        "We build trust through consistent delivery, secure infrastructure, and transparent communication.",
      icon: Shield,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-grow flex flex-col pt-10 md:pt-16"
    >
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 px-6 max-w-4xl mx-auto text-left overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-10 -right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="flex flex-col relative z-10">
          <motion.h1
            variants={itemVariants}
            className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-on-background tracking-tight leading-tight mb-6"
          >
            Engineering Excellence. <br />
            <span className="text-primary">Delivering Reliability.</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg md:text-xl text-secondary leading-relaxed"
          >
            At Prakash Info Tech, we combine senior-level technical expertise
            with a relentless focus on high-quality, user-centric deliverables.
            We architect solutions that scale, driving real business value for
            enterprise and high-end clients.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full py-16 md:py-24 px-6 border-t border-outline-variant bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Side: Manifesto */}
            <div className="lg:col-span-5 flex flex-col justify-start text-left">
              <motion.div 
                variants={itemVariants} 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-primary mb-4 self-start cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <Award size={20} />
                </motion.div>
                <span className="font-sans font-bold text-sm tracking-wider uppercase">Our Philosophy</span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="font-sans font-bold text-3xl sm:text-4xl text-on-surface tracking-tight mb-6"
              >
                Our Philosophy
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="font-sans text-base text-secondary leading-relaxed mb-6"
              >
                We believe that true technical mastery is expressed through clarity
                and structural integrity. Our approach prioritizes building robust,
                scalable architectures over fleeting trends.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="font-sans text-base text-secondary leading-relaxed"
              >
                Every project is approached with a senior-level perspective,
                ensuring that the foundations we lay today will support our clients'
                ambitions well into the future. Reliability is not just a metric; it
                is the cornerstone of our engineering ethos.
              </motion.p>
            </div>

            {/* Right Side: Philosophy Value Cards (2x2 Grid) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {philosophyCards.map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02, 
                      borderColor: "var(--color-primary)",
                      boxShadow: "0 15px 30px rgba(0,40,142,0.04)" 
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 transition-all duration-300 flex flex-col h-full cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                      className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center mb-5"
                    >
                      <CardIcon size={20} />
                    </motion.div>
                    <h3 className="font-sans font-bold text-sm text-on-surface mb-2 tracking-wider uppercase group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-sans text-sm text-secondary leading-relaxed flex-grow">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
}
