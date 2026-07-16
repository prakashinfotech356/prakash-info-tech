import React from "react";
import { Screen } from "../types";
import Logo from "./Logo";

interface FooterProps {
  setScreen: (screen: Screen) => void;
  openModal: (title: string, content: string) => void;
}

export default function Footer({ setScreen, openModal }: FooterProps) {
  const handleServiceClick = (screen: Screen) => {
    setScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDocClick = (title: string, content: string) => {
    openModal(title, content);
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Logo & Tagline */}
        <div className="cursor-pointer" onClick={() => handleServiceClick("home")}>
          <Logo size="sm" />
        </div>

        {/* Navigation / Service Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <button
            onClick={() => handleServiceClick("services")}
            className="font-sans font-semibold text-xs tracking-wider text-secondary hover:text-primary transition-colors uppercase"
          >
            Web Development
          </button>
          <button
            onClick={() => handleServiceClick("services")}
            className="font-sans font-semibold text-xs tracking-wider text-secondary hover:text-primary transition-colors uppercase"
          >
            AI Automation
          </button>
          <button
            onClick={() => handleServiceClick("services")}
            className="font-sans font-semibold text-xs tracking-wider text-secondary hover:text-primary transition-colors uppercase"
          >
            Ad Management
          </button>
          <button
            onClick={() =>
              handleDocClick(
                "Privacy Policy",
                "This Privacy Policy describes how Prakash Info Tech collects, uses, and protects your personal data. We are committed to protecting your privacy and ensuring transparency. We do not sell or share your personal data with third parties for marketing purposes. All collected data is processed securely to deliver high-quality digital solutions and consultations."
              )
            }
            className="font-sans font-semibold text-xs tracking-wider text-secondary hover:text-primary transition-colors uppercase"
          >
            Privacy Policy
          </button>
          <button
            onClick={() =>
              handleDocClick(
                "Terms of Service",
                "By using the services of Prakash Info Tech, you agree to our Terms of Service. All delivered projects, bespoke websites, AI integrations, and brand materials are subject to contract agreements. We strive to maintain absolute reliability and precision across all enterprise integrations. Any software provided is covered by standard support and updates as agreed upon in our statements of work."
              )
            }
            className="font-sans font-semibold text-xs tracking-wider text-secondary hover:text-primary transition-colors uppercase"
          >
            Terms of Service
          </button>
        </nav>

        {/* Copyright notice */}
        <div className="font-sans text-sm text-secondary">
          © 2026 Prakash Info Tech. All copyrights reserved.
        </div>
      </div>
    </footer>
  );
}
