import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", iconOnly = false, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Fidelity SVG Graphic of Cloud + Circuit PI + Upward Arrow */}
      <svg
        className={`${iconSizes[size]} text-primary shrink-0 transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Cloud Contour */}
        <path
          d="M45 42C45 32 53 24 63 24C71.3 24 78.2 29.6 80.3 37.2C82.3 35.8 84.7 35 87.3 35C94.3 35 100 40.7 100 47.7C100 48.7 99.9 49.6 99.6 50.5C104.5 53.2 107.8 58.4 107.8 64.3C107.8 72.8 100.9 79.7 92.4 79.7H38C26.4 79.7 17 70.3 17 58.7C17 48.6 24.1 40.2 33.8 38.1C34.6 40.4 36.1 42.4 38 43.8C37.3 45.3 37 47 37 48.7C37 57 43.7 63.7 52 63.7H60"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter 'P' and 'I' Circuits with dots */}
        <path
          d="M48 63.7V89.7M48 63.7H60C65 63.7 69 59.7 69 54.7C69 49.7 65 45.7 60 45.7H48V63.7Z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Vertical stem of 'I' to the right of 'P' */}
        <path
          d="M80 63.7V89.7"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Upward diagonal arrow filled with circuit traces */}
        <path
          d="M48 74.7L100 22.7M100 22.7H82M100 22.7V40.7"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Circuit Nodes (Dots) on P stem */}
        <circle cx="48" cy="89.7" r="4" fill="currentColor" />
        {/* Circuit Nodes (Dots) on I stem */}
        <circle cx="80" cy="63.7" r="3.5" fill="currentColor" />
        <circle cx="80" cy="89.7" r="4" fill="currentColor" />

        {/* Circuit Nodes on cloud and arrow */}
        <circle cx="38" cy="38.1" r="3" fill="currentColor" />
        <circle cx="63" cy="24" r="3.5" fill="currentColor" />
        <circle cx="87.3" cy="35" r="3" fill="currentColor" />
        <circle cx="100" cy="47.7" r="3" fill="currentColor" />
        <circle cx="70" cy="52" r="3" fill="currentColor" />
        <circle cx="90" cy="32.7" r="3" fill="currentColor" />
      </svg>

      {/* Brand Text */}
      {!iconOnly && (
        <div className="flex flex-col">
          <span className="font-sans font-bold text-xl text-primary leading-none tracking-tight">
            Prakash
          </span>
          <span className="font-sans font-semibold text-xs text-on-surface-variant tracking-[0.18em] uppercase leading-none mt-1">
            Info Tech
          </span>
        </div>
      )}
    </div>
  );
}
