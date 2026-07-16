import React, { useState } from "react";
import { Screen } from "../types";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function Header({ currentScreen, setScreen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: Screen }[] = [
    { label: "Home", value: "home" },
    { label: "Services", value: "services" },
    { label: "About", value: "about" },
    { label: "Contact", value: "contact" },
  ];

  const handleNavClick = (screen: Screen) => {
    setScreen(screen);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="cursor-pointer" onClick={() => handleNavClick("home")}>
          <Logo size="sm" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentScreen === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`font-sans font-semibold text-sm tracking-wide transition-all duration-200 relative py-2 ${
                  isActive
                    ? "text-primary"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Call to Action */}
        <div className="hidden md:block">
          <motion.button
            onClick={() => handleNavClick("contact")}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="bg-primary hover:bg-primary-container text-on-primary font-sans font-semibold text-sm tracking-wide py-3 px-6 rounded-lg transition-all shadow-[0_10px_30px_rgba(0,40,142,0.08)] cursor-pointer"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-primary p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-20 bg-on-surface z-40 md:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-20 right-0 bottom-0 w-4/5 max-w-sm bg-surface-container-lowest border-l border-outline-variant p-6 z-50 md:hidden flex flex-col justify-between shadow-2xl"
            >
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                  hidden: {}
                }}
                className="flex flex-col gap-5"
              >
                {navItems.map((item) => {
                  const isActive = currentScreen === item.value;
                  return (
                    <motion.button
                      key={item.value}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleNavClick(item.value)}
                      className={`text-left py-3 px-4 rounded-lg font-sans font-semibold text-base transition-all cursor-pointer ${
                        isActive
                          ? "bg-surface-container-high text-primary"
                          : "text-secondary hover:bg-surface-container-low hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </motion.div>

              <div className="pt-6 border-t border-outline-variant">
                <motion.button
                  onClick={() => handleNavClick("contact")}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-primary hover:bg-primary-container text-on-primary text-center font-sans font-semibold py-4 rounded-lg transition-all cursor-pointer"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
