import React from "react";

export type AccentColor = "indigo" | "orange" | "sky" | "emerald";

export interface DesignToken {
  cardBg: string;
  iconBg: string;
  ctaText: string;
  glow: string;
  heroBg: string;
  badgeText: string;
  linkBg: string;
  borderAccent: string;
}

export const DESIGN_TOKENS: Record<AccentColor, DesignToken> = {
  indigo: {
    cardBg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30",
    iconBg: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-100 dark:bg-indigo-900/40 dark:border-indigo-800/50 dark:text-indigo-400 dark:group-hover:bg-indigo-800/50",
    ctaText: "text-indigo-600 dark:text-indigo-400",
    glow: "bg-indigo-50 dark:bg-indigo-900/30",
    heroBg: "from-indigo-50 to-white border-indigo-100 dark:from-indigo-950/40 dark:to-[#020617] dark:border-indigo-900/30",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    linkBg: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:shadow-indigo-900/50",
    borderAccent: "border-l-indigo-500 dark:border-l-indigo-400",
  },
  orange: {
    cardBg: "bg-orange-50 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30",
    iconBg: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-100 dark:bg-orange-900/40 dark:border-orange-800/50 dark:text-orange-400 dark:group-hover:bg-orange-800/50",
    ctaText: "text-orange-600 dark:text-orange-400",
    glow: "bg-orange-50 dark:bg-orange-900/30",
    heroBg: "from-orange-50 to-white border-orange-100 dark:from-orange-950/40 dark:to-[#020617] dark:border-orange-900/30",
    badgeText: "text-orange-600 dark:text-orange-400",
    linkBg: "bg-orange-600 hover:bg-orange-700 shadow-orange-200 dark:bg-orange-600 dark:hover:bg-orange-500 dark:shadow-orange-900/50",
    borderAccent: "border-l-orange-500 dark:border-l-orange-400",
  },
  sky: {
    cardBg: "bg-sky-50 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900/30",
    iconBg: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-100 dark:bg-sky-900/40 dark:border-sky-800/50 dark:text-sky-400 dark:group-hover:bg-sky-800/50",
    ctaText: "text-sky-600 dark:text-sky-400",
    glow: "bg-sky-50 dark:bg-sky-900/30",
    heroBg: "from-sky-50 to-white border-sky-100 dark:from-sky-950/40 dark:to-[#020617] dark:border-sky-900/30",
    badgeText: "text-sky-600 dark:text-sky-400",
    linkBg: "bg-sky-600 hover:bg-sky-700 shadow-sky-200 dark:bg-sky-600 dark:hover:bg-sky-500 dark:shadow-sky-900/50",
    borderAccent: "border-l-sky-500 dark:border-l-sky-400",
  },
  emerald: {
    cardBg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30",
    iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-100 dark:bg-emerald-900/40 dark:border-emerald-800/50 dark:text-emerald-400 dark:group-hover:bg-emerald-800/50",
    ctaText: "text-emerald-600 dark:text-emerald-400",
    glow: "bg-emerald-50 dark:bg-emerald-900/30",
    heroBg: "from-emerald-50 to-white border-emerald-100 dark:from-emerald-950/40 dark:to-[#020617] dark:border-emerald-900/30",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    linkBg: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:shadow-emerald-900/50",
    borderAccent: "border-l-emerald-500 dark:border-l-emerald-400",
  },
};

export const DEFAULT_DESIGN: DesignToken = DESIGN_TOKENS.indigo;

